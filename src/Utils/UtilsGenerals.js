import {arre} from './jsonPruebas';
import * as Speech from 'expo-speech';

export function searchProduct(code, type) {
  return new Promise((res, rej) => {
    var json = arre[Math.floor(Math.random() * arre.length)];
    res(json);
  });
}

export function readProduct(json) {
  
  Speech.speak('Nombre comercial: ' + json.Descripcion,{language:'es-419'});
  Speech.speak('Presentación: ' + json.FormaFarmaceutica,{language:'es-419'});
  Speech.speak(
      'Contenido neto: ' + json.ContenidoNeto[0] + '  ' + json.ContenidoNeto[1],{language:'es-419'}
    );
    Speech.speak('Vía de administración: ' + json.ViaAdministracion,{language:'es-419'});

    Speech.speak('Principio activo:  ' + json.PrincipioActivo[0].Nombre,{language:'es-419'});
    Speech.speak(
      'Concentración: ' +
        json.PrincipioActivo[0].Concentracion[0] +
        ' ' +
        json.PrincipioActivo[0].Concentracion[1] +
        ' En ' +
        json.PrincipioActivo[0].CantidadSolvente[0] +
        '  ' +
        json.PrincipioActivo[0].CantidadSolvente[1],{language:'es-419'}
    );

    Speech.speak('Información adicional',{language:'es-419'});
   
    if (json.ContieneAzucar==true) {
      Speech.speak('Contiene azucar',{language:'es-419'});
    }

    if (json.ContieneLactosa==true) {
      Speech.speak('Contiene lactosa',{language:'es-419'});
    }

  }

