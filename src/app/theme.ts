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
  '_11': '#333',
  '_12': '#f1f1f1',
  '_13': '#272777',
};

const light: Theme = {
  name: 'light',
  properties: {
    // TOP HEADER
    '--top-header-background': Colours._1,

    // FOOTER
    '--footer-background': Colours._12,

    // HOME PAGE
    '--home-header-background': Colours._2,
    '--home-header-text': Colours._4,
    '--home-header-text-2': Colours._5,

    '--background-default': Colours._1,
    '--background-tertiary': Colours._3,

    '--text-tertiary': Colours._4,
    '--text-quaternary': Colours._3,

    '--logo-primary': Colours._6,

    '--header-results-button-background': Colours._4,
    '--header-results-button-text': Colours._12
  }
};

const dark: Theme = {
  name: 'dark',
  properties: {
    // TOP HEADER
    '--top-header-background': Colours._13,

    // FOOTER
    '--footer-background': Colours._13,

    // HOME PAGE
    '--home-header-background': Colours._4,
    '--home-header-text': Colours._9,
    '--home-header-text-2': Colours._9,

    '--background-default': Colours._7,
    '--background-tertiary': Colours._8,

    '--text-tertiary': Colours._10,
    '--text-quaternary': Colours._8,

    '--logo-primary': Colours._9,

    '--header-results-button-background': Colours._10,
    '--header-results-button-text': Colours._11
  }
};

export {
  Theme,
  Colours,
  light,
  dark
};