import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

const user = "yamistar0892@gmail.com:9165414e3154bd10374b";

//convirtiendo a base64
const creadentials = btoa(`${user}`);

const axiosAlegra = axios.create({
  baseURL: "https://api.alegra.com/api/v1",
  headers: {
    Authorization: `Basic ${creadentials}`,
  },
});

const axiosUnplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    "Accept-Version": "v1",
    Authorization: "Client-ID 2VbG1n_CjzPOiY5VaPrhw-Og-FGXwfUEv5ugro5yR28",
  },
});

export { axiosAlegra, axiosUnplash };
