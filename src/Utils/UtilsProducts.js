import { URL_PPRODUCTO } from "../Config/Config";
import Axios from "axios";
import * as Speech from "expo-speech";

export function searchProduct(token, gtin) {
  return new Promise((res, rej) => {
    console.log(URL_PPRODUCTO + gtin);
    try {
      Axios.get(URL_PPRODUCTO + gtin, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          res(response);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    } catch (err) {
      console.log(err);
    }
  });
}

export async function errorProduct() {
  return new Promise(async (res, rej) => {
    Speech.speak("Error, el producto escaneado no esta disponible. Intente nuevamente.", {
      language: "es-419",
    });
    res();
  });
}
