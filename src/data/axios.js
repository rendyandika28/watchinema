import axios from "axios";

const API_KEY = "f15d819549589d708cf177ff07116a0a";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export default instance;
