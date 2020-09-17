import { arre } from "./jsonPruebas";
import * as Speech from "expo-speech";
import { AsyncStorage, Alert, Vibration } from "react-native";
import { Audio } from 'expo-av';

export async function searchProduct(code, type) {
  return new Promise(async (res, rej) => {
    var position = await AsyncStorage.getItem("position");
    console.log(position);

    if (position == null) {
      await AsyncStorage.setItem("position", "0");
      console.log("sale: ", 0);
      res(arre[0]);
    } else if (position == "0") {
      console.log("sale: ", 1);
      await AsyncStorage.setItem("position", "1");
      res(arre[1]);
    } else if (position == "1") {
      console.log("sale: ", 2);
      await AsyncStorage.setItem("position", "2");
      res(arre[2]);
    } else if (position == "2") {
      console.log("sale: ", 0);
      await AsyncStorage.setItem("position", "0");
      res(arre[0]);
    }
  });
}

export function readProduct(json) {
  Speech.speak(json.atributosBasicos.descripcion.toLowerCase(), {
    // nombre comercial
    language: "es-419",
  });
  Speech.speak("Presentación: " + json.formaFarmaceutica, {
    language: "es-419",
  });
  Speech.speak(
    "Contenido: " +
    json.atributosBasicos.contenidoNeto.valor +
    "  " +
    json.atributosBasicos.contenidoNeto.unidad,
    { language: "es-419" }
  );
  Speech.speak("Vía de administración: " + json.viaAdministracion, {
    language: "es-419",
  });

  Speech.speak("Principio activo:  ", {
    language: "es-419",
  });

  json.principioActivo.map((val, i) => {
    Speech.speak(val.nombre.toLowerCase(), {
      language: "es-419",
    });

    Speech.speak(
      "Concentración: " +
      val.concentracion.valor +
      " " +
      val.concentracion.unidad +
      " En " +
      val.enMedio.valor +
      "  " +
      val.enMedio.unidad,
      { language: "es-419" }
    );
  });

  if (json.alertasyAvisos.length > 0) {
    Speech.speak("Información adicional", { language: "es-419" });
    json.alertasyAvisos.forEach((element) => {
      Speech.speak(element.alerta, { language: "es-419" });
    }); 
  }
}

export function mute() {

    Speech.isSpeakingAsync().then((boolean) => {
      console.log(boolean);
      if (boolean) {
        Speech.stop();
      }
    })
}

export function AskPermissionAudio() {
  Audio.requestPermissionsAsync().then((val => {
    if (val.status == "granted") {
      return;
    } else {
      Alert.alert("Alerta", "Usted no cuenta con los permisos activo para el volumen.");
    }
  }))
}

export function notifyOnCamera() {
  return new Promise(async (res,rej)=>{
     await Speech.speak("Cámara activada ", { language: "es-419" });
     Vibration.vibrate(500,false);
    res();
  })
}

export function notifiTorchOn() {
  return new Promise(async (res,rej)=>{
    await Speech.speak("Linterna activada ", { language: "es-419" });
   res();
 })
}

export function notifiTorchOff() {
  return new Promise(async (res,rej)=>{
    await Speech.speak("Linterna desactivada ", { language: "es-419" });
   res();
 })
}
  