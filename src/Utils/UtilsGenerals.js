import { arre } from "./jsonPruebas";
import * as Speech from "expo-speech";
import { AsyncStorage } from "react-native";

export async function searchProduct(code, type) {
  return new Promise(async (res, rej) => {

    var position = await AsyncStorage.getItem('position');console.log(position);

    
    if (position==null) {
      await AsyncStorage.setItem('position', "0");
      console.log("sale: ", 0);
      res(arre[0]);
    } else if(position=="0"){
      console.log("sale: ", 1);
      await AsyncStorage.setItem('position', "1");
      res(arre[1]);
    }else if(position=="1"){
      console.log("sale: ", 2);
      await AsyncStorage.setItem('position', "2");
      res(arre[2])
    }else if(position=="2"){
      console.log("sale: ", 0);
      await AsyncStorage.setItem('position', "0");
      res(arre[0])
    }

  });
}

export function readProduct(json) {
  Speech.speak(json.atributosBasicos.descripcion.toLowerCase(), { // nombre comercial
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

  json.principioActivo.map((val,i)=>{
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

  })

  

  if (json.alertasyAvisos.length > 0) {
    Speech.speak("Información adicional", { language: "es-419" });
    json.alertasyAvisos.forEach((element) => {
      Speech.speak(element.alerta, { language: "es-419" });
    });
  }


}
