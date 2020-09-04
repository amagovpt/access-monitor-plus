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
  '_20': '#525865'
};

const light: Theme = {
  name: 'light',
  properties: {
    // GLOBAL
    '--background': Colours._1,

    // TOP HEADER
    '--top-header-background': Colours._1,

    // FOOTER
    '--footer-background': Colours._11,

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

    '--results-breadcrumbs-text': Colours._4,

    '--results-info-accessMonitor-background': Colours._4,
    '--results-info-accessMonitor-text': Colours._3,
    '--results-info-url': Colours._6,
    '--results-info-title': Colours._6,
    
    '--results-action-button-background': Colours._3,
    '--results-action-button-text': Colours._4,

    '--results-summary-background': Colours._3,
    '--results-summary-text': Colours._6,
    '--results-summary-table-background': Colours._2,
    '--results-summary-table-text': Colours._6,
    '--results-summary-table-border': Colours._3,
    '--results-summary-table-border2': Colours._6,

    '--results-evaluation-background': Colours._3,
    '--results-evaluation-title': Colours._6,
    '--results-evaluation-table-border': Colours._6,
    '--results-evaluation-table-head-background': Colours._6,
    '--results-evaluation-table-head-text': Colours._3,
    '--results-evaluation-table-body-background': Colours._3,
    '--results-evaluation-table-body-collapsible-background': Colours._11,
    '--results-evaluation-table-body-text': Colours._6,
    '--results-evaluation-table-body-icon': Colours._4
  }
};

const dark: Theme = {
  name: 'dark',
  properties: {
    // GLOBAL
    '--background': Colours._7,

    // TOP HEADER
    '--top-header-background': Colours._12,

    // FOOTER
    '--footer-background': Colours._12,

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

    '--results-breadcrumbs-text': Colours._10,

    '--results-info-accessMonitor-background': Colours._10,
    '--results-info-accessMonitor-text': Colours._7,
    '--results-info-url': Colours._9,
    '--results-info-title': Colours._9,

    '--results-action-button-background': Colours._8,
    '--results-action-button-text': Colours._10,

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
    '--results-evaluation-table-body-icon': Colours._10
  }
};

export {
  Theme,
  Colours,
  light,
  dark
};