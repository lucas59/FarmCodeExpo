import { URL_SESSION } from "../Config/Config";
import Axios from "axios";

export function newSession() {
  return new Promise((res, rej) => {
    Axios.post(URL_SESSION, {
      usuario: "fbrasesco@gs1uy.org",
      contrasena: "12345678",
    }).then((response) => {
      res(response);
    });
  });
}
