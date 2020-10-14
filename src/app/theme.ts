interface Theme {
  name: string;
  properties: any;
}

const Colours = {
  '_1': '#e4e4e4',
  '_2': '#efefee',
  '_3': '#ffffff',
  '_4': '#339',
  '_5': '#212529',
  '_6': '#333',
  '_7': '#20242c',
  '_8': '#2c3241',
  '_9': '#ebf2f6',
  '_10': '#b6dcf6',
  '_11': '#f1f1f1',
  '_12': '#272777',
  '_13': '#b5dbf5',
  '_14': '#eaeaea',
  '_15': '#d10000',
  '_16': '#a7b1be',
  '_17': '#bce1bc',
  '_18': '#ffff99',
  '_19': '#ff9999',
  '_20': '#525865',
  '_21': '#e39d9f',
  '_22': '#db2280',
  '_23': '#4f4f4f',
  '_24': '#C4C6D4',
  '_25': '#999999',
  '_26': '#4D4D4D',
  '_27': '#5c5cad'
};

const light: Theme = {
  name: 'light',
  properties: {
    // GLOBAL
    '--background': Colours._1,
    '--go-to-top-background': Colours._4,
    '--go-to-top-icon': Colours._3,

    // TABLET DIALOG
    '--dialog-background': Colours._4,
    '--dialog-text': Colours._3,
    '--dialog-border': Colours._24,

    // TOP HEADER
    '--top-header-background': Colours._1,
    '--top-header-icon-color': Colours._4,
    '--top-header-text': Colours._6,
    '--top-header-links': Colours._4,

    // FOOTER
    '--footer-background': Colours._11,
    '--footer-text': Colours._23,
    '--footer-link-text': Colours._4,
    '--footer-img': Colours._25,

    // HOME PAGE
    '--home-header-background': Colours._2,
    '--home-header-text': Colours._4,
    '--home-header-text-2': Colours._6,

    '--home-content-background': Colours._3,
    '--home-content-sentence': Colours._6,
    '--home-content-logo': Colours._6,
    '--home-content-tabs-background': Colours._14,
    '--home-content-tabs-text': Colours._4,
    '--home-content-inputs_label': Colours._6,
    '--home-content-inputs-background': Colours._3,
    '--home-content-inputs-border': Colours._4,
    '--home-content-inputs-text': Colours._6,
    '--home-content-inputs-error': Colours._15,
    '--home-content-file-button-background': Colours._4,
    '--home-content-file-button-text': Colours._3,
    '--home-content-file-button-border': Colours._4,
    '--home-content-button-background-hover': Colours._4,
    '--home-content-button-text-hover': Colours._3,
    '--home-content-button-border-hover': Colours._4,

    // RESULTS PAGE
    '--results-header-background': Colours._2,
    '--results-header-text': Colours._4,
    '--results-header-button-background': Colours._4,
    '--results-header-button-border': Colours._4,
    '--results-header-button-text': Colours._11,

    '--results-breadcrumbs-link': Colours._4,
    '--results-breadcrumbs-text': Colours._7,
    '--results-breadcrumbs-header': Colours._26,
    '--results-listbox-background': Colours._1,
    '--results-listbox-background-border': Colours._2,

    '--results-info-accessMonitor-background': Colours._4,
    '--results-info-accessMonitor-text': Colours._3,
    '--results-info-url': Colours._6,
    '--results-info-title': Colours._6,
    
    '--results-action-button-background': Colours._3,
    '--results-action-button-text': Colours._4,
    '--results-action-menu-background': Colours._27,

    '--results-summary-background': Colours._3,
    '--results-summary-text': Colours._6,
    '--results-summary-table-background': Colours._2,
    '--results-summary-table-text': Colours._6,
    '--results-summary-table-border': Colours._3,
    '--results-summary-table-border2': Colours._6,
    '--results-summary-table-border3': Colours._25,

    '--results-evaluation-background': Colours._3,
    '--results-evaluation-title': Colours._6,
    '--results-evaluation-table-border': Colours._6,
    '--results-evaluation-table-head-background': Colours._6,
    '--results-evaluation-table-head-text': Colours._3,
    '--results-evaluation-table-body-background': Colours._3,
    '--results-evaluation-table-body-collapsible-background': Colours._11,
    '--results-evaluation-table-body-text': Colours._6,
    '--results-evaluation-table-body-icon': Colours._4,
    '--results-evaluation-table-arrow': Colours._4,

    // ELEMENTS RESULTS
    '--elements-test-description-background': Colours._3,
    '--elements-test-description-text': Colours._6,
    '--elements-test-description-border': Colours._1,
    '--elements-tabs-text': Colours._4,
    '--elements-list-background': Colours._3,
    '--elements-list-border': Colours._6,
    '--elements-list-text': Colours._6,
    '--elements-list-label-background': Colours._11,
    '--elements-list-code': Colours._22,

    // WEBPAGE CODE
    '--webpage-code-background': Colours._3,
    '--webpage-code-text': Colours._6,

    // LOADING STATE
    '--loading-background': Colours._3,
    '--loading-text': Colours._6,
    '--loading-icons': Colours._4,

    // ERROR STATE
    '--error-text': Colours._6,

    // 404 NOT FOUND PAGE
    '--404-page-text': Colours._6,
  }
};

const dark: Theme = {
  name: 'dark',
  properties: {
    // GLOBAL
    '--background': Colours._7,
    '--go-to-top-background': Colours._10,
    '--go-to-top-icon': Colours._7,

    // TABLET DIALOG
    '--dialog-background': Colours._7,
    '--dialog-text': Colours._10,
    '--dialog-border': Colours._23,

    // TOP HEADER
    '--top-header-background': Colours._12,
    '--top-header-icon-color': Colours._13,
    '--top-header-text': Colours._10,
    '--top-header-links': Colours._10,

    // FOOTER
    '--footer-background': Colours._12,
    '--footer-text': Colours._24,
    '--footer-link-text': Colours._10,
    '--footer-img': Colours._3,

    // HOME PAGE
    '--home-header-background': Colours._4,
    '--home-header-text': Colours._13,
    '--home-header-text-2': Colours._9,

    '--home-content-background': Colours._8,
    '--home-content-sentence': Colours._9,
    '--home-content-logo': Colours._9,
    '--home-content-tabs-background': Colours._7,
    '--home-content-tabs-text': Colours._10,
    '--home-content-inputs_label': Colours._10,
    '--home-content-inputs-background': Colours._8,
    '--home-content-inputs-border': Colours._10,
    '--home-content-inputs-text': Colours._10,
    '--home-content-inputs-error': Colours._15,
    '--home-content-file-button-background': Colours._10,
    '--home-content-file-button-text': Colours._7,
    '--home-content-file-button-border': Colours._10,
    '--home-content-button-background-hover': Colours._10,
    '--home-content-button-text-hover': Colours._8,
    '--home-content-button-border-hover': Colours._10,

    // RESULTS PAGE
    '--results-header-background': Colours._4,
    '--results-header-text': Colours._13,
    '--results-header-button-background': Colours._10,
    '--results-header-button-border': Colours._10,
    '--results-header-button-text': Colours._6,

    '--results-breadcrumbs-link': Colours._10,
    '--results-breadcrumbs-text': Colours._10,
    '--results-breadcrumbs-header': Colours._1,
    '--results-listbox-background': Colours._7,
    '--results-listbox-background-border': Colours._4,

    '--results-info-accessMonitor-background': Colours._10,
    '--results-info-accessMonitor-text': Colours._7,
    '--results-info-url': Colours._9,
    '--results-info-title': Colours._9,

    '--results-action-button-background': Colours._8,
    '--results-action-button-text': Colours._10,
    '--results-action-menu-background': Colours._27,

    '--results-summary-background': Colours._8,
    '--results-summary-text': Colours._9,
    '--results-summary-table-background': Colours._16,
    '--results-summary-table-text': Colours._7,
    '--results-summary-table-border': Colours._7,
    '--results-summary-table-border2': Colours._20,

    '--results-evaluation-background': Colours._8,
    '--results-evaluation-title': Colours._9,
    '--results-evaluation-table-border': Colours._20,
    '--results-evaluation-table-head-background': Colours._7,
    '--results-evaluation-table-head-text': Colours._9,
    '--results-evaluation-table-body-background': Colours._8,
    '--results-evaluation-table-body-collapsible-background': Colours._7,
    '--results-evaluation-table-body-text': Colours._9,
    '--results-evaluation-table-body-icon': Colours._10,
    '--results-evaluation-table-arrow': Colours._10,

    // ELEMENTS RESULTS
    '--elements-test-description-background': Colours._8,
    '--elements-test-description-text': Colours._9,
    '--elements-test-description-border': Colours._20,
    '--elements-tabs-text': Colours._10,
    '--elements-list-background': Colours._8,
    '--elements-list-border': Colours._20,
    '--elements-list-text': Colours._9,
    '--elements-list-label-background': Colours._7,
    '--elements-list-code': Colours._21,

    // WEBPAGE CODE
    '--webpage-code-background': Colours._8,
    '--webpage-code-text': Colours._9,

    // LOADING STATE
    '--loading-background': Colours._8,
    '--loading-text': Colours._9,
    '--loading-icons': Colours._10,

    // ERROR STATE
    '--error-text': Colours._9,

    // 404 NOT FOUND PAGE
    '--404-page-text': Colours._9,
  }
};

export {
  Theme,
  Colours,
  light,
  dark
};