import axios from "axios";

const urlAxios = axios.create({
  baseURL: "http://localhost:5000",
});

export default urlAxios;
