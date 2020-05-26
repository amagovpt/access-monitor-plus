import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import clone from 'lodash.clone';

import { ConfigService } from '../config.service';
import { MessageService } from '../message.service';

import tests from './lib/tests';
import xpath from './lib/xpath';
import tests_colors from './lib/tests_colors';
import scs from './lib/scs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private url: string;
  private evaluation: any;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly message: MessageService,
    private readonly config: ConfigService,
    private readonly translate: TranslateService
  ) {}

  evaluateUrl(url: string, force: boolean = false): Observable<any> {
    if (this.url && this.url === url && this.evaluation && !force) {
      return of(this.evaluation.processed);
    } else {
      const _url = sessionStorage.getItem('url');
      if (_url && _url === url && !force) {
        this.url = _url;
        this.evaluation = JSON.parse(sessionStorage.getItem('evaluation'));
        return of(this.evaluation.processed);
      } else {
        return this.http.get<any>(this.config.getServer('/amp/eval/' + encodeURIComponent(url)), {observe: 'response'}).pipe(
          map(res => {
            const response = res.body;

            if (!res.body || res.status !== 200 || response.success !== 1) {
              throw new Error();
            }

            this.url = url;
            this.evaluation = response.result;
            this.evaluation.processed = this.processData();
            this.preLoadImages(this.fixImgSrc(url, this.evaluation.pagecode));

            try {
              sessionStorage.setItem('url', url);
              sessionStorage.setItem('evaluation', JSON.stringify(this.evaluation));
            } catch (err) {
              console.log(err);
            }

            return this.evaluation.processed;
          }),
          catchError(err => {
            console.log(err);
            if (err.code === -2) {
              this.message.show('HOME_PAGE.messages.invalid_url');
              this.router.navigateByUrl('/');
            } else {
              this.message.show('MISC.unexpected_error');
            }
            return of(null);
          })
        );
      }
    }
  }

  evaluateHtml(html: string): Observable<any> {
    return this.http.post<any>(this.config.getServer('/amp/eval/html'), {html}, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = res.body;

        if (!res.body || res.status !== 200 || response.success !== 1) {
              throw new Error();
            }
        this.evaluation = response.result;
        this.evaluation.processed = this.processData();

        try {
          sessionStorage.setItem('evaluation', JSON.stringify(this.evaluation));
        } catch(err) {
          console.log(err);
        }

        return this.evaluation.processed;
      }),
      catchError(err => {
        console.log(err);
        this.message.show('MISC.unexpected_error');
        return of(null);
      })
    );
  }

  private preLoadImages(webpage: string): void {
    const parser = new DOMParser();

    const imgDoc = parser.parseFromString(webpage, 'text/html');
    const imgNodes = imgDoc.evaluate('//img', imgDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let i = 0;
    let n = imgNodes.snapshotItem(i);

    while (n) {
      if (n['attributes']['src']) {
        const img = new Image();
        img.onload = function () {
          return true;
        };
        img.src = n['attributes']['src'].value;
      }

      if (n['attributes']['srcset']) {
        const img = new Image();
        img.onload = function () {
          return true;
        };
        img.srcset = n['attributes']['srcset'].value;
      }

      i++;
      n = imgNodes.snapshotItem(i);
    }
  }

  getTestResults(test: string): any {
    if (!this.url || !this.evaluation) {
      this.url = sessionStorage.getItem('url');
      this.evaluation = JSON.parse(sessionStorage.getItem('evaluation'));
    }

    const data = this.evaluation.data;
    const tot = data.tot;
    const allNodes = data.nodes;
    const webpage = this.evaluation.pagecode;
    const url = this.url;
    const ele = test;

    const testSee = {
      'css': ['colorContrast', 'colorFgBgNo', 'cssBlink', 'fontAbsVal', 'fontValues',
        'justifiedCss', 'layoutFixed', 'lineHeightNo', 'valueAbsCss', 'valueRelCss'
      ],
      'div': ['aGroupNo', 'applet', 'appletAltNo', 'blink', 'brSec', 'ehandBoth', 'ehandBothNo',
        'ehandMouse', 'ehandTagNo', 'ehandler', 'charSpacing', 'embed', 'embedAltNo',
        'fieldLegNo', 'fieldNoForm', 'form', 'formSubmitNo', 'hx', 'hxSkip', 'id', 'idRep',
        'iframe', 'iframeTitleNo', 'justifiedTxt', 'liNoList', 'marquee', 'object', 'objectAltNo',
        'table', 'tableCaptionSummary', 'tableComplex', 'tableComplexError', 'tableData',
        'tableDataCaption', 'tableLayout', 'tableLayoutCaption', 'tableNested', 'valueAbsHtml',
        'valueRelHtml'
      ],
      'span': ['a', 'abbrNo', 'aJs', 'aSameText', 'aAdjacent', 'aAdjacentSame', 'aImgAltNo',
        'aSkip', 'aSkipFirst', 'aTitleMatch', 'deprecElem', 'fontHtml', 'img', 'imgAltLong',
        'imgAltNo', 'imgAltNot', 'imgAltNull', 'inpImg', 'inpImgAltNo', 'inputAltNo',
        'inputIdTitleNo', 'inputLabel', 'inputLabelNo', 'label', 'labelForNo', 'labelPosNo',
        'labelTextNo', 'layoutElem', 'longDImg', 'longDNo'
      ]
    };

    let results = {};
    if (testSee['css'].includes(ele)) {
      results = this.getCSS(webpage, ele);
    } else {
      results = this.getElements(url, webpage, allNodes, ele, testSee['div'].includes(ele) || testSee['span'].includes(ele));
    }

    return results;
  }

  downloadCSV(): void {
    const data = [];

    let error, level, sc, desc, num;
    const descs = ['CSV.errorType', 'CSV.level', 'CSV.criteria', 'CSV.desc', 'CSV.count'];
    const numTable = [];

    const _eval = this.evaluation.processed;

    for (const row in _eval['results']) {
      if (_eval['results'][row]) {
        const rowData = [];
        error = 'CSV.' + (_eval['results'][row]['prio'] === 3 ? 'scoreok' : _eval['results'][row]['prio'] === 2 ? 'scorewar' : 'scorerror');
        level = _eval['results'][row]['lvl'];
        //sc = _eval['scoreBoard'][row]['sc'];
        num = _eval['results'][row]['value'];
        desc = 'TESTS_RESULTS.' + _eval['results'][row]['msg'] + ((num === 1) ? '.s' : '.p');

        descs.push(desc, error);
        rowData.push(error, level, /*sc,*/ desc, num);
        data.push(rowData);
      }
    }

    this.translate.get(descs).subscribe(res => {
      const labels = new Array <string>();

      for (const row in data) {
        if (data[row]) {
          data[row][2] = res[data[row][2]].replace('{{value}}', data[row][3]);
          data[row][2] = data[row][2].replace(new RegExp('<mark>', 'g'), '');
          data[row][2] = data[row][2].replace(new RegExp('</mark>', 'g'), '');
          data[row][2] = data[row][2].replace(new RegExp('<code>', 'g'), '');
          data[row][2] = data[row][2].replace(new RegExp('</code>', 'g'), '');
          data[row][0] = res[data[row][0]];
        }
      }
      labels.push(res['CSV.errorType']);
      labels.push(res['CSV.level']);
      //labels.push(res['CSV.criteria']);
      labels.push(res['CSV.desc']);
      labels.push(res['CSV.count']);

      let csvContent = labels.join(',') + '\r\n';
      for (const row of data || []) {
        csvContent += row.join(',') + '\r\n';
      }

      const blob = new Blob([csvContent], { type: 'text/csv' });
      saveAs(blob, 'eval.csv');
    });
  }

  //EMBEBED
  private highLightCss(styles: any, ele: string): any {
    const begin = '<em style=\'background-color: yellow;border: 0.3em solid Yellow;font-weight: bold;\'>';
    const end = '}</em>\n';
    let lines = '';

    for (const s in styles) {
      if (!isNaN(parseInt(s, 0))) {
        const node = styles[s].firstChild.nodeValue;
        const nodes = node.split('}');

        if (ele === 'valueRelCss') {
          for (const line in nodes) {
            if (nodes[line].match(/width:[0-9]+(%|em|ex)/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'valueAbsCss') {
          for (const line in nodes) {
            if (nodes[line].match(/width:[0-9]+(cm|mm|in|pt|pc)/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'layoutFixed') {
          for (const line in nodes || {}) {
            if (nodes[line]) {
              const w = nodes[line].split(';');
              let t = false;
              for (const i in w) {
                if (w[i].match(/width:/) || w[i].match(/min-width/)) {
                  const px = w[i].split(':')[1].replace('px', '');
                  if (Number(px) > 120) {
                    t = true;
                    lines += begin + nodes[line] + end;
                  }
                }
              }
              if (!t) {
                lines += nodes[line] + '}\n';
              }
            }
          }
        } else if (ele === 'justifiedCss') {
          for (const line in nodes) {
            if (nodes[line].match(/text-align:justify/) != null) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'cssBlink') {
          for (const line in nodes) {
            if (nodes[line].match(/text-decoration:blink/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'fontValues') {
          for (const line in nodes) {
            if (nodes[line].match(/font:/) || nodes[line].match(/font-size:/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }

        } else if (ele === 'fontAbsVal') {
          for (const line in nodes) {
            if (nodes[line].match(/font:[0-9]+(cm|mm|in|pt|pc|px)/) || nodes[line].match(/font-size:[0-9]+(cm|mm|in|pt|pc|px)/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }

        } else if (ele === 'lineHeightNo') {
          for (const line in nodes) {
            if (nodes[line].match(/line-height:([0-9]+)(%|em|ex)+/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'colorFgBgNo') {
          for (const line in nodes || {}) {
            if (nodes[line]) {
              let color = false;
              let bg = false;
              let ok = false;
              if (nodes[line].match(/[;{\s]color/)) {
                color = true;
                ok = true;
              }

              if (nodes[line].match(/[;{\s]background:/) || nodes[line].match(/[;{\s]background-color:/)) {
                bg = true;
                ok = true;
              }
              if (ok && bg && color) {
                lines += nodes[line] + '}\n';

              } else if (!ok) {
                lines += nodes[line] + '}\n';
              } else {
                lines += begin + nodes[line] + end;
              }
            }
          }
        } else if (ele === 'colorContrast') {
          for (const line in nodes) {
            if (nodes[line]) {
              let color = false;
              let bg = false;
              let ok = false;
              if (nodes[line].trim().match(/[;{\s]color:/)) {
                const colorElem = nodes[line].trim().split(/[;{\s]color:/)[1].split(/[;}]/)[0];

                const color_array = this.evaluation.data.tot['elems']['color_array'];
                for (const c in color_array) {
                  if (color_array[c]['c'].split(':')[1].trim() === colorElem) {
                    color = true;
                    ok = true;

                    break;
                  }
                }
              }
              if (nodes[line].trim().match(/[;{\s]background-color:/) || nodes[line].match(/[;{\s]background:/)) {
                let b = nodes[line].trim().split(/[;{\s]background-color:/);
                if (!b[1]) {
                  b = nodes[line].trim().split(/[;{\s]background:/);
                }
                const colorElem = b[1].trim().split(/[;}]/)[0];
                const color_array = this.evaluation.data.tot['elems']['color_array'];
                for (const c in color_array) {
                  if (color_array[c]['b'].split(':')[1].trim() === colorElem) {
                    bg = true;
                    ok = true;

                    break;
                  }
                }
              }
              if (ok && bg && color) {
                lines += begin + nodes[line] + end;

              } else if (ok) {
                lines += nodes[line] + '}\n';
              } else {
                lines += nodes[line] + '}\n';
              }
            }
          }
        }

      }
    }

    return lines;
  }

  // INLINE
  private highLightCss2(styles: any, ele: string): any {
    const begin = '<em style=\'background-color: yellow;border: 0.3em solid Yellow;font-weight: bold;\'>';
    const end = '}</em>\n';
    let inline = '';

    for (const s in styles) {
      if (ele === 'fontValues' && (styles[s].match(/font:/) || styles[s].match(/font-size:/))) {
        inline += begin + styles[s] + end;

      } else if (ele === 'fontAbsVal' && (styles[s].match(/font:[0-9]+(cm|mm|in|pt|pc|px)/) || styles[s].match(/font-size:[0-9]+(cm|mm|in|pt|pc|px)/))) {
        inline += begin + styles[s] + end;
      } else if (ele === 'cssBlink' && styles[s].match(/text-decoration:blink/)) {
        inline += begin + styles[s] + end;
      } else if (ele === 'justifiedCss' && styles[s].match(/text-align:justify/) != null) {
        inline += begin + styles[s] + end;
      } else if (ele === 'valueRelCss' && styles[s].match(/width:[0-9]+(%|em|ex)/)) {
        inline += begin + styles[s] + end;
      } else if (ele === 'valueAbsCss' && styles[s].match(/width:[0-9]+(cm|mm|in|pt|pc)/)) {
        inline += begin + styles[s] + end;

      } else if (ele === 'layoutFixed') {
        if (styles[s].match(/[;{\s]width:[0-9]+(px)/)) {
          const matches = styles[s].match(/[;{\s]width:[0-9]+(px)/);
          const px = matches[0].split(':')[1].replace('px', '').replace(' ', '');
          if (Number(px) > 120) {
            inline += begin + styles[s] + end;
          } else {
            inline += styles[s] + '\n';
          }
        } else if (styles[s].match(/min-width:[0-9]+(px)/)) {
          const matches = styles[s].match(/min-width:[0-9]+(px)/);
          const px = matches[0].split(':')[1].replace('px', '').replace(' ', '');
          if (Number(px) > 120) {
            inline += begin + styles[s] + end;
          } else {
            inline += styles[s] + '\n';
          }
        } else {
          inline += styles[s] + '\n';
        }
      } else if (ele === 'lineHeightNo' && (styles[s].match(/line-height:([0-9]+)(%|em|ex)+/))) {
        inline += begin + styles[s] + end;
      } else if (ele === 'colorFgBgNo') {
        let color = false;
        let bg = false;
        let ok = false;
        if (styles[s].match(/[;{\s]color/)) {
          color = true;
          ok = true;
        }
        if (styles[s].match(/[;{\s]background:/) || styles[s].match(/[;{\s]background-color:/)) {
          bg = true;
          ok = true;
        }
        if (ok && bg && color) {
          inline += styles[s] + '\n';
        } else if (!ok) {
          inline += styles[s] + '\n';
        } else {
          inline += begin + styles[s] + end;
        }
      } else if (ele === 'colorContrast') {
        let color = false;
        const bg = false;
        let ok = false;
        if (styles[s].match(/[;{\s]color/)) {

          const _color = styles[s].split(/[;{\s]color:/)[1].split(/[;}]/)[0];
          const color_array = this.evaluation.data.tot['elems']['color_array'];
          for (const c in color_array) {
            if (color_array[c]['c'].split(':')[1].trim() === _color) {
              color = true;
              ok = true;
              break;
            }
          }

        }
        if (styles[s].match(/[;{\s]background:/) || styles[s].match(/[;{\s]background-color:/)) {
          const _color = styles[s].split(/[;{\s]background:/);
          if (!color[1]) {
            color = styles[s].split(/[;{\s]background-color:/);
          }
          color = color[1].split(/[;}]/)[0];
          const color_array = this.evaluation.data.tot['elems']['color_array'];
          for (const c in color_array) {
            if (color_array[c]['b'].split(':')[1].trim() === _color) {
              color = true;
              ok = true;
              break;
            }
          }
        }
      } else {
        inline += styles[s] + '\n';
      }
    }
    return inline;
  }

  private getCSS(pagecode: string, ele: string): any {
    if (!this.url || !this.evaluation) {
      this.url = sessionStorage.getItem('url');
      this.evaluation = JSON.parse(sessionStorage.getItem('evaluation'));
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(pagecode, 'text/html');
    // INLINE
    const n = doc.evaluate('//*[@style][normalize-space(@style)!=\'\']', doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    let val = n.iterateNext();
    let inline = '';
    const classes = [];
    while (val) {
      inline = ' ' + val['tagName'].toLowerCase() + '{';
      let i = 0;
      while (i < val['style'].length) {
        inline += val['style'][i] + ':' + val['style'][val['style'][i]] + ';';
        i += 1;
      }
      classes.push(inline);
      val = n.iterateNext();

    }

    const styles = doc.getElementsByTagName('style');
    return {
      'embedded_css': this.highLightCss(styles, ele),
      'inline_css': this.highLightCss2(classes, ele)
    };
  }

  private getElements(url: string, webpage: string, allNodes: Array < string > , ele: string, inpage: boolean): any {
    let path: string;

    if (ele !== 'aSkipFirst' && allNodes[ele]) {
      path = allNodes[ele];
    } else {
      path = xpath[ele];
    }

    webpage = this.fixImgSrc(url, webpage);

    const elements = this.getElementsList(ele, path, webpage);

    return {
      elements,
      size: elements.length,
      page: inpage ? this.showElementsHighlightedInPage(path, webpage, inpage, ele) : undefined,
      finalUrl: clone(this.evaluation.processed.metadata.url)
    };
  }

  private fixImgSrc(url: string, webpage: string): string {
    const parser = new DOMParser();
    const imgDoc = parser.parseFromString(webpage, 'text/html');

    const protocol = this.evaluation.processed.metadata.url.startsWith('https://') ? 'https://' : 'http://';
    const www = this.evaluation.processed.metadata.url.includes('www.') ? 'www.' : '';

    const imgNodes = imgDoc.evaluate('//*[@src]', imgDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let i = 0;
    let n = imgNodes.snapshotItem(i);

    let fixSrcUrl = clone(this.evaluation.processed.metadata.url.replace('http://', '').replace('https://', '').replace('www.', '').split('/')[0]);
    if (fixSrcUrl[fixSrcUrl.length - 1] === '/') {
      fixSrcUrl = fixSrcUrl.substring(0, fixSrcUrl.length - 2);
    }

    while (n) {
      if (n['attributes']['src'] && !n['attributes']['src'].value.startsWith('http') && !n['attributes']['src'].value.startsWith('https')) {
        if (n['attributes']['src'].value.startsWith('/')) {
          n['attributes']['src'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['src'].value}`;
        } else {
          n['attributes']['src'].value = `${protocol}${www}${fixSrcUrl}/${n['attributes']['src'].value}`;
        }
      }

      if (n['attributes']['srcset']) {
        const split = n['attributes']['srcset'].value.split(', ');
        if (split.length > 0) {
          let value = '';
          for (const u of split) {
            if (!u.startsWith('http') && !u.startsWith('https')) {
              if (u.startsWith('/')) {
                value += `${protocol}${www}${fixSrcUrl}${u}, `;
              } else {
                value += `${protocol}${www}${fixSrcUrl}/${u}, `;
              }
            }
          }
          n['attributes']['srcset'].value = clone(value.substring(0, value.length - 2));
        } else {
          n['attributes']['srcset'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['srcset'].value}`;
        }
      }

      i++;
      n = imgNodes.snapshotItem(i);
    }

    return imgDoc.getElementsByTagName('html')[0]['outerHTML'];
  }

  private showElementsHighlightedInPage(path: string, webpage: string, inpage: boolean, ele: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(webpage, 'text/html');
    const nodes = doc.evaluate(path, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    let i = 0;
    let n = nodes.snapshotItem(i);

    while (n) {
      if (inpage) {
        n['style'] = 'background:#ff0 !important;border:2px dotted #900 !important;padding:2px !important;visibility:visible !important;display:inherit !important;';
      }

      if (ele === 'aSkipFirst') {
        break;
      }

      i++;
      n = nodes.snapshotItem(i);
    }

    return doc.getElementsByTagName('html')[0]['outerHTML'];
  }

  private getElementsList(test: string, path: string, webpage: string): Array < any > {
    const parser = new DOMParser();

    const imgDoc = parser.parseFromString(webpage, 'text/html');
    const imgNodes = imgDoc.evaluate('//img', imgDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let i = 0;
    let n = imgNodes.snapshotItem(i);

    const doc = parser.parseFromString(imgDoc.getElementsByTagName('html')[0]['outerHTML'], 'text/html');
    const elements = new Array();
    const paths = path.split('|') || [path];

    for (const p of paths) {
      if (p.includes('template')) {
        const tPath = p.split('/').slice(0, p.split('/').indexOf('template') + 1).join('/');
        const tNodes = doc.evaluate(tPath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        const tNode = tNodes.snapshotItem(0);
        if (tNode) {
          const newDoc = parser.parseFromString(tNode['innerHTML'], 'text/html');
          const newPath = '//' + p.split('/').slice(p.split('/').indexOf('template') + 1).join('/');
          const fNodes = newDoc.evaluate(newPath, newDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          const newNode = fNodes.snapshotItem(0);
          if (newNode) {
            let attrs = '';
            const fixed = newNode['attributes']['fixed'];
            for (const key of Object.keys(newNode['attributes']) || []) {
              const attr = <Attr> newNode['attributes'][key];
              if ((attr.name === 'width' || attr.name === 'height' || attr.name === 'fixed') && fixed) {
                continue;
              }
              if (attr.value) {
                attrs += attr.name + '="' + attr.value + '" ';
              } else {
                attrs += attr.name + ' ';
              }
            }

            const eleOuterHtml = clone(newNode['outerHTML']);

            if (newNode.nodeName.toLowerCase() === 'img') {
              if (newNode['attributes']['src']) {
                const img = new Image();
                img.onload = function () {
                  return true;
                };
                img.src = newNode['attributes']['src'].value;

                if (img.width > 500 || img.height > 200) {
                  if (img.width > img.height) {
                    newNode['width'] = '500';
                  } else {
                    newNode['height'] = '200';
                  }
                }
              }

              if (newNode['attributes']['srcset']) {
                const img = new Image();
                img.onload = function () {
                  return true;
                };
                img.src = newNode['attributes']['srcset'].value;

                if (img.width > 500 || img.height > 200) {
                  if (img.width > img.height) {
                    newNode['width'] = '500';
                  } else {
                    newNode['height'] = '200';
                  }
                }
              }
            }

            elements.push({
              ele: newNode.nodeName.toLowerCase(),
              attr: attrs,
              code: newNode['outerHTML'],
              showCode: eleOuterHtml
            });
          }
        }
      } else {
        const nodes = doc.evaluate(p, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        i = 0;
        n = nodes.snapshotItem(i);

        while (n) {
          let attrs = '';
          const fixed = n['attributes']['fixed'];
          for (const key of Object.keys(n['attributes']) || []) {
            const attr = < Attr > n['attributes'][key];
            if ((attr.name === 'width' || attr.name === 'height' || attr.name === 'fixed') && fixed) {
              continue;
            }
            if (attr.value) {
              attrs += attr.name + '="' + attr.value + '" ';
            } else {
              attrs += attr.name + ' ';
            }
          }

          let eleOuterHtml = clone(n['outerHTML']);
          let code = null;
          if (n.nodeName.toLowerCase() === 'img') {
            if (n['attributes']['src']) {
              const img = new Image();
              img.onload = function () {
                return true;
              };
              img.src = n['attributes']['src'].value;

              if (img.width > 500 || img.height > 200) {
                if (img.width > img.height) {
                  n['width'] = '500';
                } else {
                  n['height'] = '200';
                }
              }

            }

            if (n['attributes']['srcset']) {
              const img = new Image();
              img.onload = function () {
                return true;
              };
              img.src = n['attributes']['srcset'].value;

              if (img.width > 500 || img.height > 200) {
                if (img.width > img.height) {
                  n['width'] = '500';
                } else {
                  n['height'] = '200';
                }
              }
            }
            code = n['outerHTML'];
          } else if (n.nodeName.toLowerCase() === 'title') {
            code = n.firstChild.nodeValue;
          } else if (n.nodeName.toLowerCase() === 'html') {
            code = n['attributes']['lang'].nodeValue;
            n['innerHTML'] = '';
            eleOuterHtml = n['outerHTML'];
          } else {
            code = n['outerHTML'];
          }

          elements.push({
            ele: n.nodeName.toLowerCase(),
            attr: attrs,
            code: code,
            showCode: eleOuterHtml
          });

          if (test === 'aSkipFirst') {
            break;
          }

          i++;
          n = nodes.snapshotItem(i);
        }
      }
    }

    return elements;
  }

  private processData() {
    const tot = this.evaluation.data.tot;

    const data = {};
    data['metadata'] = {};
    data['metadata']['url'] = tot['info']['url'];
    data['metadata']['title'] = tot['info']['title'];
    data['metadata']['n_elements'] = tot['info']['htmlTags'];
    data['metadata']['score'] = tot['info']['score'];
    data['metadata']['size'] = this.convertBytes(tot['info']['size']);
    data['metadata']['last_update'] = tot['info']['date'];
    data['metadata']['count_results'] = tot['results'].length;

    data['results'] = [];

    const infotot = {
      'ok': 0,
      'err': 0,
      'war': 0,
      'tot': 0
    };

    const infoak = {
      'A': {
        'ok': 0,
        'err': 0,
        'war': 0,
      },
      'AA': {
        'ok': 0,
        'err': 0,
        'war': 0,
      },
      'AAA': {
        'ok': 0,
        'err': 0,
        'war': 0,
      }
    };

    for (const test in tests) {
      if (test) {
        if (tot.results[test]) {
          const tes = tests[test]['test'];
          const lev = tests[test]['level'];
          const ref = tests[test]['ref'];
          const ele = tests[test]['elem'];

          let color;

          if (tests_colors[test] === 'R') {
            color = 'err';
          } else if (tests_colors[test] === 'Y') {
            color = 'war';
          } else if (tests_colors[test] === 'G') {
            color = 'ok';
          }

          const level = lev.toUpperCase();

          infoak[level][color]++;

          let tnum;

          if (tot.elems[tes]) {
            if (tes === 'titleOk') {
              tnum = tot.info.title;
            } else if (tes === 'lang') {
              tnum = tot.info.lang;
            } else {
              tnum = tot['elems'][tes];
            }
          } else {
            tnum = tot['elems'][ele];
          }

          const result = {};
          result['ico'] = 'assets/images/ico' + color + '.png';
          result['color'] = color;
          result['lvl'] = level;
          result['msg'] = test;
          result['ref'] = ref;
          result['ref_website'] = 'http://www.acessibilidade.gov.pt/w3/TR/WCAG20-TECHS/' + ref + '.html';
          result['relation'] = tests[test]['ref'] === 'F' ? 'relationF' : 'relationT';
          result['ref_related_sc'] = new Array();
          result['value'] = tnum;
          result['prio'] = color === 'ok' ? 3 : color === 'err' ? 1 : 2;

          const scstmp = tests[test]['scs'].split(',');
          const li = {};
          for (let s in scstmp) {
            if (s) {
              s = scstmp[s].trim();
              if (s !== '') {
                li['sc'] = s;
                li['lvl'] = scs[s]['1'];
                li['link'] = 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/' + scs[s]['0'] + '.html';

                result['ref_related_sc'].push(clone(li));
              }
            }
          }

          if (color === 'ok' && ele !== 'all') {
            result['tech_list'] = this.testView(ele, ele, tes, color, tnum);
          } else {
            result['tech_list'] = this.testView(tes, tes, tes, color, tnum);
          }

          data['results'].push(result);
        }
      }
    }

    data['infoak'] = infoak;

    return data;
  }

  private testView(ele: string, txt: string, test: string, color: string, tot: number): any {
    const item = {};

    item['txt'] = txt;
    item['tot'] = tot ? tot : 0;

    if (ele === 'dtdOld') {
      return item;
    }

    if (ele === 'w3cValidatorErrors') {
      item['html_validator'] = true;
      item['ele'] = 'http://validador-html.fccn.pt/check?uri=' + encodeURIComponent(this.url);
    } else if (tot || tot > 0) {
      item['ele'] = ele;
      
      if ((/*test === 'aSkipFirst' ||*/ test === 'aSkip' || test === 'langNo' || test === 'h1' || test === 'titleNo') && color === 'err') {
        delete item['ele'];
      }
    } else if (test === 'aSkipFirst') {
      item['ele'] = ele;
    }

    return item;
  }

  private convertBytes(length: number): string {
    if (length < 1024) {
      return length + ' bytes';
    } else if (length < 1024000) {
      return Math.round((length / 1024)) + ' KB <em>(' + length + ' bytes)</em>';
    } else {
      return Math.round((length / 1048576)) + ' MB <em>(' + length + ' bytes)</em>';
    }
  }
}
