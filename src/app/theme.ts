export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    /*"--foreground-default": "#08090A",
    "--foreground-secondary": "#41474D",
    "--foreground-tertiary": "#797C80",
    "--foreground-quaternary": "#F4FAFF",
    "--foreground-light": "#41474D",*/

    "--background-default": "#e4e4e4",
    "--background-secondary": "#efefee",
    "--background-tertiary": "#ffffff",
    //"--background-light": "#FFFFFF",

    "--text-primary": "#333399",
    "--text-secondary": "#212529",
    "--text-tertiary": "#333399",
    "--text-quaternary": "#ffffff",

    "--logo-primary": "#333333",

    /*"--primary-default": "#5DFDCB",
    "--primary-dark": "#24B286",
    "--primary-light": "#B2FFE7",

    "--error-default": "#EF3E36",
    "--error-dark": "#800600",
    "--error-light": "#FFCECC",

    "--background-tertiary-shadow": "0 1px 3px 0 rgba(92, 125, 153, 0.5)"*/
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    //"--foreground-default": "#ebf2f6",
    //"--foreground-secondary": "#A3B9CC",
    //"--foreground-tertiary": "#F4FAFF",
    //"--foreground-quaternary": "#E5E5E5",
    //"--foreground-light": "#FFFFFF",

    "--background-default": "#20242c",
    "--background-secondary": "#333399",
    "--background-tertiary": "#2c3241",
    //"--background-light": "#41474D",

    "--text-primary": "#ebf2f6",
    "--text-secondary": "#ebf2f6",
    "--text-tertiary": "#b6dcf6",
    "--text-quaternary": "#2c3241",

    "--logo-primary": "#ebf2f6",

    //"--primary-default": "#5DFDCB",
    //"--primary-dark": "#24B286",
    //"--primary-light": "#B2FFE7",

    //"--error-default": "#EF3E36",
    //"--error-dark": "#800600",
    //"--error-light": "#FFCECC",

    //"--background-tertiary-shadow": "0 1px 3px 0 rgba(8, 9, 10, 0.5)"
  }
};