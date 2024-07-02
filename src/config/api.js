// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://10.55.37.16:/api/amp",
// });

import axios from "axios";

const baseURLDEV = process.env.REACT_APP_AMP_DEV_SERVER;
const baseURLPROD = process.env.REACT_APP_AMP_PROD_SERVER;

export const api = axios.create({
  baseURL: baseURLDEV,
});
