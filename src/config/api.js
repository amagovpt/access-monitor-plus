import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.55.37.16:/api/amp",
});
