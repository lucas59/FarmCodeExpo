import { URL_SESSION } from "../Config/Config";
import * as Speech from "expo-speech";
import { AccessibilityInfo, Vibration } from "react-native";
import Axios from "axios";
import { notifyErrorServerConect, searchProduct } from "./UtilsProducts";

function newSession() {
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
    const talkback = await AccessibilityInfo.isScreenReaderEnabled()
    if (talkback) {
      await Speech.speak("Terminos y condiciónes rechazados. Cerrando aplicación ", {
        language: "es-419", onDone: () => {
          Vibration.vibrate(500, false);
          res();
        }
      });
    } else {
      res();
    }
  })
}


export function findProduct(gtin) {
  return new Promise((res, rej) => {
    newSession().then((response) => {// abro una session
      if (response.data.code == 200) {
        const token = response.data.data.token;
        searchProduct(token, gtin).then((response) => {
          console.log("Response: ", response.data);
          if (response.data != undefined && response.data.code == 200) {
            res(response.data);
          } else {
            rej()
          }
        }).catch((err) => {
          console.log("ErrorP: ", err);
          rej();
          notifyErrorServerConect().then(() => {
            setScanned(false); //vuelvo a setear el escanner
          })
        })
      }
    }).catch((err) => {
      notifyErrorServerConect().then(() => {
        setScanned(false);
      })
      console.log("Error: ", err);
    });
  })
}