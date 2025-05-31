import axios from "axios";

export const api = axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "12c93c7188msh11278ff7317726dp1db33ejsn33b862650c9b",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
