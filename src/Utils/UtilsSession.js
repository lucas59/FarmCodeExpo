import { URL_SESSION } from "../Config/Config";
import * as Speech from "expo-speech";
import { Vibration } from "react-native";
import Axios from "axios";

export function newSession() {
  return new Promise((res, rej) => {
    Axios.post(URL_SESSION, {
      usuario: "fbrasesco@gs1uy.org",
      contrasena: "12345678",
    }).then((response) => {
      res(response);
    }).catch((err) => {
      rej(err);
    });
  });
}


export function notifyConditionsFail() {
  return new Promise(async (res, rej) => {
    await Speech.speak("Terminos y condiciónes rechazados. Cerrando aplicación ", {
      language: "es-419", onDone: () => {
        Vibration.vibrate(500, false);
        res();
      }
    });
  })
}