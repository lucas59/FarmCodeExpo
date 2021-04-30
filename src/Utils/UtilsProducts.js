import { url_product } from "../Config/Config";
import Axios from "axios";
import * as Speech from "expo-speech";
import { Audio } from 'expo-av';
import { AccessibilityInfo } from "react-native";

export function searchProduct(token, gtin) {
  return new Promise((res, rej) => {
    console.log(url_product + gtin);
    try {
      Axios.get(url_product + gtin, {
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
    await Speech.speak("Error, el producto escaneado no esta disponible. Intente nuevamente.", {
      language: "es-419", onDone: () => {
        res();
      }
    });
  });
}

export function notifySound(value) {
  if (value) {
    Speech.speak("Sonido activado", { language: "es-419" });
  } else {
    Speech.speak("Sonido desactivado", { language: "es-419" });
  }
}

export async function notifyWelcome() {
  const talkback = await AccessibilityInfo.isScreenReaderEnabled()
  if (talkback) {
    Speech.speak("Bienvenido", { language: "es-419" });
  }
}

export function notifyWelcomeConditions() {
  Speech.speak("Términos y condiciónes", { language: "es-419" });
}

export function alertManualCode() {
  Speech.speak("Ingrese el código del producto", { language: "es-419" });
}

export async function notifySuccess() {
  try {
    const { sound: soundObject, status } = await Audio.Sound.createAsync(
      require("../../assets/success.mp3"),
      { shouldPlay: true }
    );
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }

}

export async function notifyError() {
  try {
    const { sound: soundObject, status } = await Audio.Sound.createAsync(
      require("../../assets/error.mp3"),
      { shouldPlay: true }
    );
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }

}

export function notifyErrorServerConect() {
  return new Promise(async (res, rej) => {
    await Speech.speak("Error de conexión con el servidor ", { language: "es-419", onDone: () => { res() } });
  })
}