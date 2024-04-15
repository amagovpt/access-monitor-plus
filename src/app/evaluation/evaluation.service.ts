import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { saveAs } from "file-saver";
import clone from "lodash.clone";
import { Parser } from "htmlparser2";
import DomHandler from "domhandler";
import * as DomUtils from "domutils";
import * as CSSselect from "css-select";

import { ConfigService } from "../config.service";

import tests from "./lib/tests";
import xpath from "./lib/xpath";
import tests_colors from "./lib/tests_colors";
import scs from "./lib/scs";

@Injectable({
  providedIn: "root",
})
export class EvaluationService {
  private url: string;
  private evaluation: any;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly config: ConfigService,
    private readonly translate: TranslateService
  ) { }

  evaluateUrl(url: string, force: boolean = false): Observable<any> {
    if (this.url && this.url === url && this.evaluation && !force) {
      return of(this.evaluation.processed);
    } else {
      const _url = sessionStorage.getItem("url");
      if (_url && _url === url && !force) {
        this.url = _url;
        this.evaluation = JSON.parse(sessionStorage.getItem("evaluation"));
        return of(this.evaluation.processed);
      } else {
        return this.http
          .get<any>(
            this.config.getServer("/amp/eval/" + encodeURIComponent(url)),
            { observe: "response" }
          )
          .pipe(
            map((res) => {
              const response = res.body;

              if (!res.body || res.status !== 200 || response.success !== 1) {
                throw new Error();
              }

              this.url = url;
              this.evaluation = response.result;
              this.evaluation.processed = this.processData();
              try {
                sessionStorage.setItem("url", url);
                sessionStorage.setItem(
                  "evaluation",
                  JSON.stringify(this.evaluation)
                );
              } catch (err) {
                console.log(err);
              }

              return this.evaluation.processed;
            }),
            catchError((err) => {
              console.log(err);
              return of(null);
            })
          );
      }
    }
  }

  evaluateHtml(html: string): Observable<any> {
    return this.http
      .post<any>(
        this.config.getServer("/amp/eval/html"),
        { html },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = res.body;

          if (
            !res.body ||
            (res.status !== 200 && res.status !== 201) ||
            response.success !== 1
          ) {
            throw new Error();
          }

          this.evaluation = response.result;
          this.evaluation.processed = this.processData();

          try {
            sessionStorage.removeItem("url");
            sessionStorage.setItem(
              "evaluation",
              JSON.stringify(this.evaluation)
            );
          } catch (err) {
            console.log(err);
          }

          return this.evaluation.processed;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  getTestResults(test: string): any {
    if (!this.url || !this.evaluation) {
      this.url = sessionStorage.getItem("url");
      this.evaluation = JSON.parse(sessionStorage.getItem("evaluation"));
    }

    const data = this.evaluation.data;
    const allNodes = data.nodes;
    const ele = test;

    /*let results = {};
    if (ele !== 'colorFgBgNo' && ele !== 'justifiedCss' && ele !== 'lineHeightNo' && ele !== 'colorContrast' && testSee['css'].includes(ele)) {
      results = this.getCSSList(ele, allNodes[ele]);
    } else {
      results = this.getElements(allNodes, ele);
    }

    return results;*/

    return this.getElements(allNodes, ele);
  }

  private getCSSList(ele: string, paths: any): any {
    /*const handler = new DomHandler(() => {}, { withStartIndices: true, withEndIndices: true });
    const parser = new Parser(handler);

    parser.write(this.evaluation.pagecode.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    const elements = new Array();
    let result = 'G';
    let i = 0;
    const dom = handler.dom;
    for (const path of paths.split(',') || []) {
      const nodes = CSSselect.selectAll(path, dom);

      let key = '';
      const results = this.evaluation.processed.results.map(r => r.msg);
      for (const test in tests || {}) {
        const _test = tests[test];
        if (_test.test === ele && results.includes(test)) {
          result = tests_colors[test];
          key = test;
          break;
        }
      }

      for (const node of nodes || []) {
        let attrs = undefined;
        if (node['tagName'].toLowerCase() !== 'style') {
          for (const attr of Object.keys(node['attribs']) || []) {
            const value = node['attribs'][attr];
            
            if (value && attr === 'style') {
              attrs = attr + '="' + value + '" ';
            }
          }
        }

        elements.push({
          ele: node['tagName'].toLowerCase(),
          attr: attrs,
          showCode: this.evaluation.data.tot.results[key][i],
        });
        i++;
      }
    }*/
    const elements = new Array();

    return {
      type: "css",
      elements,
      result: "ola",
      size: elements.length,
      finalUrl: clone(this.evaluation.processed.metadata.url),
    };
  }

  downloadCSV(): void {
    const data = [];

    let error, level, sc, desc, num;
    const descs = [
      "CSV.date",
      "CSV.errorType",
      "CSV.level",
      "CSV.criteria",
      "CSV.desc",
      "CSV.count",
      "CSV.value",
      "RESULTS.summary.score",
    ];

    const _eval = this.evaluation.processed;

    for (const row in _eval["results"]) {
      if (_eval["results"][row]) {
        const rowData = [];
        error =
          "CSV." +
          (_eval["results"][row]["prio"] === 3
            ? "scoreok"
            : _eval["results"][row]["prio"] === 2
              ? "scorewar"
              : "scorerror");
        level = _eval["results"][row]["lvl"];
        num = _eval["results"][row]["value"];
        desc =
          "TESTS_RESULTS." +
          _eval["results"][row]["msg"] +
          (num === 1 ? ".s" : ".p");
        sc = tests[_eval["results"][row]["msg"]]["scs"];
        sc = sc.replace(/,/g, " ");

        descs.push(desc, error);
        rowData.push(
          this.evaluation.data.rawUrl,
          this.evaluation.data.date,
          _eval["results"][row]["msg"],
          error,
          level,
          sc,
          desc,
          num === undefined ? 0 : isNaN(parseInt(num)) ? 1 : num,
          !isNaN(parseInt(num)) ? "" : num,
          _eval.metadata.score.replace(".", ",")
        );
        data.push(rowData);
      }
    }

    this.translate.get(descs).subscribe((res) => {
      const labels = new Array<string>();

      for (const row in data) {
        if (data[row]) {
          data[row][6] = res[data[row][6]].replace(
            "{{value}}",
            data[row][8] ? data[row][8] : data[row][7]
          );
          data[row][6] = data[row][6].replace(new RegExp("<mark>", "g"), "");
          data[row][6] = data[row][6].replace(new RegExp("</mark>", "g"), "");
          data[row][6] = data[row][6].replace(new RegExp("<code>", "g"), "");
          data[row][6] = data[row][6].replace(new RegExp("</code>", "g"), "");
          data[row][6] = data[row][6].replace(new RegExp("&lt;", "g"), "");
          data[row][6] = data[row][6].replace(new RegExp("&gt;", "g"), "");
          data[row][3] = res[data[row][3]];
        }
      }
      labels.push("URI");
      labels.push(res["CSV.date"]);
      labels.push("ID");
      labels.push(res["CSV.errorType"]);
      labels.push(res["CSV.level"]);
      labels.push(res["CSV.criteria"]);
      labels.push(res["CSV.desc"]);
      labels.push(res["CSV.count"]);
      labels.push(res["CSV.value"]);
      labels.push(res["RESULTS.summary.score"]);

      /*let csvContent = this.evaluation.data.rawUrl + '\r\n';
      csvContent += this.evaluation.data.date + '\r\n';*/
      let csvContent = labels.join(";") + "\r\n";
      for (const row of data || []) {
        csvContent += row.join(";") + "\r\n";
      }

      const blob = new Blob([csvContent], { type: "text/csv" });
      saveAs(blob, "eval.csv");
    });
  }

  downloadEARL(): void {
    const data = {
      "@context": "https://act-rules.github.io/earl-context.json",
      "@graph": new Array<any>(),
    };

    const assertor = {
      "@id": "Access Monitor",
      "@type": "Software",
      homepage: "http://accessmonitor.acessibilidade.gov.pt/amp/",
    };

    const testSubject = {
      "@type": "TestSubject",
      source: this.url,
      assertor,
      assertions: new Array<any>(),
    };

    for (const test in this.evaluation.data.tot.results || {}) {
      const value = this.evaluation.processed.results.filter(
        (r) => r.msg === test
      )[0].tech_list.tot;

      const sources = new Array<any>();

      let pointers = new Array<any>();

      if (test === "img_01a") {
        pointers = this.evaluation.data.nodes["img"].map((e) => {
          if (e.elements !== undefined) {
            return e.elements.map((e2) => e2.pointer);
          } else {
            return [e.pointer];
          }
        });
      } else if (test === "input_02b") {
        pointers = this.evaluation.data.nodes["inputLabel"].map((e) => {
          if (e.elements !== undefined) {
            return e.elements.map((e2) => e2.pointer);
          } else {
            return [e.pointer];
          }
        });
      } else if (this.evaluation.data.nodes[tests[test].test]) {
        pointers = this.evaluation.data.nodes[tests[test].test].map((e) => {
          if (e.elements !== undefined) {
            return e.elements.map((e2) => e2.pointer);
          } else {
            return [e.pointer];
          }
        });
      }

      for (const ele of pointers || []) {
        for (const pointer of ele || []) {
          const source = {
            result: {
              pointer: pointer?.trim(),
              outcome:
                "earl:" +
                (tests_colors[test] !== "Y"
                  ? tests_colors[test] === "G"
                    ? "passed"
                    : "failed"
                  : "cantTell"),
            },
          };

          sources.push(source);
        }
      }

      const result = {
        "@type": "TestResult",
        outcome:
          "earl:" +
          (tests_colors[test] !== "Y"
            ? tests_colors[test] === "G"
              ? "passed"
              : "failed"
            : "cantTell"),
        source: sources,
        description: this.translate
          .instant("TESTS_RESULTS." + test + (value === 1 ? ".s" : ".p"), {
            value,
          })
          .replace("<mark>", "")
          .replace("</mark>", "")
          .replace("<code>", "")
          .replace("</code>", ""),
        date: this.evaluation.data.date,
      };

      const assertion = {
        "@type": "Assertion",
        test: {
          "@id": test,
          "@type": "TestCase",
          title: this.translate.instant("TECHS." + tests[test].ref),
          description: this.translate
            .instant("TXT_TECHNIQUES." + tests[test].ref)
            .replace("<p>", "")
            .replace("</p>", "")
            .replace("<code>", "")
            .replace("</code>", "")
            .replace("&lt;", "")
            .replace("&gt;", ""),
        },
        mode: "earl:automatic",
        result,
      };

      testSubject.assertions.push(assertion);
    }

    data["@graph"].push(testSubject);

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "text/json",
    });
    saveAs(blob, "eval.json");
  }

  private getElements(allNodes: Array<string>, ele: string): any {
    if (ele === "form") {
      ele = "formSubmitNo";
    }

    const elements = this.getElementsList(allNodes[ele]);

    let result = "G";
    const results = this.evaluation.processed.results.map((r) => r.msg);
    for (const test in tests || {}) {
      const _test = tests[test];
      if (_test.test === ele && results.includes(test)) {
        result = tests_colors[test];
        break;
      }
    }

    return {
      type: "html",
      result,
      elements,
      size: elements.length,
      finalUrl: clone(this.evaluation.processed.metadata.url),
    };
  }

  private getElementsList(nodes: any): Array<any> {
    const elements = new Array();
    for (const node of nodes || []) {
      console.log(node);
      if (node.elements) {
        console.log("node.elements")
        for (const element of node.elements || []) {
          const ele = this.getTagName(element);
          elements.push({
            ele,
            code:
              ele === "style"
                ? element.attributes
                : ele === "title"
                  ? this.evaluation.processed.metadata.title
                  : this.fixCode(element.htmlCode),
            showCode:
              ele === "style" ? undefined : this.fixCode(element.htmlCode),
            pointer: element.pointer,
          });
        }
      } else {
        console.log("node")
        const ele = this.getTagName(node);
        elements.push({
          ele,
          code: ele === "style" ? node.attributes : this.fixCode(node.htmlCode),
          showCode: ele === "style" ? undefined : this.fixCode(node.htmlCode),
          pointer: node.pointer,
        });
      }
    }

    return elements;
  }

  private getTagName(element: any): string {
    console.log(element);
    let name = element.htmlCode.slice(1);

    let k = 0;
    for (let i = 0; i < name.length; i++, k++) {
      if (name[i] === " " || name[i] === ">") {
        break;
      }
    }

    name = name.substring(0, k);

    return name;
  }

  private fixCode(code: string): string {
    code = code.replace(/_cssrules="true"/g, "");
    code = code.replace(/_documentselector="undefined"/g, "");

    let index = code.indexOf('_selector="');
    while (index !== -1) {
      let foundEnd = false;
      let foundStart = false;
      let k = index;
      while (!foundEnd) {
        k++;
        if (code[k] === '"') {
          if (!foundStart) {
            foundStart = true;
          } else {
            foundEnd = true;
          }
        }
      }

      code = code.replace(code.substring(index, k), "");
      index = code.indexOf('_selector="');
    }

    return this.fixeSrcAttribute(code);
  }

  private fixeSrcAttribute(code: string): string {
    if (code.startsWith("<img")) {
      const protocol = this.evaluation.processed.metadata.url.startsWith(
        "https://"
      )
        ? "https://"
        : "http://";
      const www = this.evaluation.processed.metadata.url.includes("www.")
        ? "www."
        : "";

      let fixSrcUrl = clone(
        this.evaluation.processed.metadata.url
          .replace("http://", "")
          .replace("https://", "")
          .replace("www.", "")
          .split("/")[0]
      );
      if (fixSrcUrl[fixSrcUrl.length - 1] === "/") {
        fixSrcUrl = fixSrcUrl.substring(0, fixSrcUrl.length - 2);
      }

      let srcAttribute = "";
      const index = code.indexOf('src="');
      if (index !== -1) {
        let foundEnd = false;
        let foundStart = false;
        let k = index;
        let startIndex = -1;
        while (!foundEnd) {
          k++;
          if (code[k] === '"') {
            if (!foundStart) {
              foundStart = true;
              startIndex = k;
            } else {
              foundEnd = true;
            }
          }
        }
        srcAttribute = code.substring(startIndex + 1, k);

        if (
          srcAttribute &&
          !srcAttribute.startsWith("http") &&
          !srcAttribute.startsWith("https")
        ) {
          if (srcAttribute.startsWith("/")) {
            srcAttribute = `"${protocol}${www}${fixSrcUrl}${srcAttribute}`;
          } else {
            srcAttribute = `"${protocol}${www}${fixSrcUrl}/${srcAttribute}`;
          }

          code = this.splice(code, startIndex, 0, srcAttribute);
        }
      }
    }

    return code;
  }

  private splice(code: string, idx: number, rem: number, str: string): string {
    return code.slice(0, idx) + str + code.slice(idx + Math.abs(rem));
  }

  private processData() {
    const tot = this.evaluation.data.tot;

    const data = {};
    data["metadata"] = {};
    data["metadata"]["url"] = tot["info"]["url"];
    data["metadata"]["title"] = tot["info"]["title"];
    data["metadata"]["n_elements"] = tot["info"]["htmlTags"];
    data["metadata"]["score"] = tot["info"]["score"];
    data["metadata"]["size"] = this.convertBytes(tot["info"]["size"]);
    data["metadata"]["last_update"] = tot["info"]["date"];
    data["metadata"]["count_results"] = tot["results"].length;
    data["metadata"]["validator"] = tot.elems["w3cValidator"] === "true";

    data["results"] = [];

    const infoak = {
      A: {
        ok: 0,
        err: 0,
        war: 0,
      },
      AA: {
        ok: 0,
        err: 0,
        war: 0,
      },
      AAA: {
        ok: 0,
        err: 0,
        war: 0,
      },
    };

    for (const test in tests) {
      if (test) {
        if (tot.results[test]) {
          let tes = tests[test]["test"];
          const lev = tests[test]["level"];
          const ref = tests[test]["ref"];
          const ele = tests[test]["elem"];

          let color;

          if (tests_colors[test] === "R") {
            color = "err";
          } else if (tests_colors[test] === "Y") {
            color = "war";
          } else if (tests_colors[test] === "G") {
            color = "ok";
          }

          const level = lev.toUpperCase();

          infoak[level][color]++;

          let tnum;

          if (tot.elems[tes] !== undefined) {
            if (tes === "titleOk") {
              tnum = tot.info.title;
            } else if (tes === "lang") {
              tnum = tot.info.lang;
            } else if (tes === "langNo") {
              tnum = "lang";
            } else if (tes === "titleLong") {
              tnum = tot.info.title.length;
            } else {
              tnum = tot["elems"][tes];
            }
          } else if (tes === "imgAltNo") {
            tnum = tot.elems["img"];
            tes = "img";
          } else if (tes === "inputLabelNo") {
            tnum = tot.elems["label"];
          } else {
            tnum = tot["elems"][ele];
          }

          const result = {};
          result["ico"] = "assets/images/ico" + color + ".png";
          result["color"] = color;
          result["lvl"] = level;
          result["msg"] = test;
          result["ref"] = ref;

          result["ref_website"] = this.refWebsite(ref)
          result["relation"] =
            tests[test]["ref"].length > 4 ? "relationACT" : "relationT";
          result["ref_related_sc"] = new Array();
          result["value"] = tnum;
          result["prio"] = color === "ok" ? 3 : color === "err" ? 1 : 2;

          const scstmp = tests[test]["scs"].split(",");
          const li = {};
          for (let s in scstmp) {
            if (s) {
              s = scstmp[s].trim();
              if (s !== "") {
                li["sc"] = s;
                li["lvl"] = scs[s]["1"];
                li["link"] =
                  "https://www.w3.org/WAI/WCAG21/Understanding/" +
                  scs[s]["0"] +
                  ".html";

                result["ref_related_sc"].push(clone(li));
              }
            }
          }

          /*if (color === "ok" && ele !== "all") {
            result["tech_list"] = this.testView(ele, ele, tes, color, tnum);
          } else {
            result["tech_list"] = this.testView(tes, tes, tes, color, tnum);
          }*/

          result["tech_list"] = this.testView(tes, tes, tes, color, tnum);

          data["results"].push(result);
        }
      }
    }

    data["infoak"] = infoak;

    return data;
  }

  private testView(
    ele: string,
    txt: string,
    test: string,
    color: string,
    tot: number
  ): any {
    const item = {};

    item["txt"] = txt;
    item["tot"] = tot ? tot : 0;

    if (ele === "dtdOld") {
      return item;
    }

    if (ele === "w3cValidatorErrors") {
      item["html_validator"] = true;
      item["ele"] =
        "https://validator.w3.org/nu/?doc=" + encodeURIComponent(this.url);
    } else if (tot || tot > 0) {
      item["ele"] = ele;

      if (
        (test === "aSkip" ||
          test === "langNo" ||
          test === "h1" ||
          test === "titleNo") &&
        color === "err"
      ) {
        delete item["ele"];
      }
    } else if (test === "aSkipFirst") {
      item["ele"] = ele;
    }

    if (test === "ehandBoth" || test === "ehandler") {
      item["ele"] = "ehandBoth";
    }

    return item;
  }
  private refWebsite(ref: string):string {
    let result;
    if(ref.length>3){
      result = this.refWebsiteACT(ref);
    }else{
      result = this.refWebsiteTecnique(ref);
    }
    return result;
  }
  private refWebsiteACT(ref: string) {
    return "https://www.w3.org/WAI/standards-guidelines/act/rules/" + ref+ '/'
  }

  private refWebsiteTecnique(ref: string) {
    let path;
    if(ref.startsWith("C"))
      path = "css/";
    else if(ref.startsWith("H"))
      path = "html/";
    else if(ref.startsWith("A"))
          path = "aria/";
    else if (ref.startsWith("S"))
        path = "client-side-script/";
    else if (ref.startsWith("G"))
      path = "general/";
    else
      path = "failures/";
    return "https://www.w3.org/WAI/WCAG21/Techniques/" + path + ref + ".html";
  }

  private convertBytes(length: number): string {
    if (length < 1024) {
      return length + " bytes";
    } else if (length < 1024000) {
      return Math.round(length / 1024) + " KB";
    } else {
      return Math.round(length / 1048576) + " MB";
    }
  }
}
