import axios from "axios";

const urlAxios = axios.create({
  baseURL: "https://api-turing.onrender.com",
});

export default urlAxios;
