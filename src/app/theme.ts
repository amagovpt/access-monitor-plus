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
  '_14': '#eaeaea'
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
    '--home-content-inputs-text': Colours._4,
    '--home-content-file-button-background': Colours._4,
    '--home-content-file-button-text': Colours._3,
    '--home-content-file-button-border': Colours._4,
    '--home-content-button-background-hover': Colours._4,
    '--home-content-button-text-hover': Colours._3,
    '--home-content-button-border-hover': Colours._4,

    // RESULTS PAGE
    '--header-results-button-background': Colours._4,
    '--header-results-button-text': Colours._11
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
    '--header-results-button-background': Colours._10,
    '--header-results-button-text': Colours._6
  }
};

export {
  Theme,
  Colours,
  light,
  dark
};