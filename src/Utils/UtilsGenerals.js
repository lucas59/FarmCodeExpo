import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { AccessibilityInfo, Alert, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { arre } from './jsonPruebas';

export async function searchProduct(code, type) {
  return new Promise(async (res, rej) => {
    var position = await AsyncStorage.getItem('position');
    console.log(position);

    if (position == null) {
      await AsyncStorage.setItem('position', '0');
      console.log('sale: ', 0);
      res(arre[0]);
    } else if (position == '0') {
      console.log('sale: ', 1);
      await AsyncStorage.setItem('position', '1');
      res(arre[1]);
    } else if (position == '1') {
      console.log('sale: ', 2);
      await AsyncStorage.setItem('position', '2');
      res(arre[2]);
    } else if (position == '2') {
      console.log('sale: ', 0);
      await AsyncStorage.setItem('position', '0');
      res(arre[0]);
    }
  });
}

export async function readProduct(parent, json) {
  return new Promise(async (res, rej) => {
    // Speech.sleep(500);
    setTimeout(async function () {
      Speech.speak(json.atributosBasicos.descripcion.toLowerCase(), {
        // nombre comercial
        language: 'es-419',
        _voiceIndex: 100,
      });

      if (json.kitPromocional.length > 0) {
        Speech.speak('Productos contenidos en este KIT : ' + json.kitPromocional.length, {
          language: 'es-419',
          _voiceIndex: 100,
        });
      }

      if (json.kitPromocional.length === 0 || parent) {
        Speech.speak('Presentación: ' + json.formaFarmaceutica, {
          language: 'es-419',
          _voiceIndex: 100,
        });

        Speech.speak(
          'Contenido neto: ' +
          json.atributosBasicos.contenidoNeto.valor +
          '  ' +
          json.atributosBasicos.contenidoNeto.unidad,
          {
            language: 'es-419',
            _voiceIndex: 100,
            onStopped: () => {
              console.log('stop');
            },
          },
        );

        if (json.contenidoPorUso.valor !== '') {
          Speech.speak('Contenido por uso: ' + json.contenidoPorUso.valor + '  ' + json.contenidoPorUso.unidad, {
            language: 'es-419',
            _voiceIndex: 100,
            onStopped: () => {
              console.log('stop');
            },
          });
        }

        Speech.speak('Vía de administración: ' + json.viaAdministracion, {
          language: 'es-419',
          _voiceIndex: 100,
        });
      }

      if (json.principioActivo.length > 0) {
        Speech.speak('Principio activo:  ', {
          language: 'es-419',
          _voiceIndex: 100,
        });

        json.principioActivo.map((val, i) => {
          Speech.speak(val.nombre.toLowerCase(), {
            language: 'es-419',
            _voiceIndex: 100,
          });

          Speech.speak(
            'Concentración: ' +
            val.concentracion.valor +
            ' ' +
            val.concentracion.unidad +
            ' En ' +
            val.enMedio.valor +
            '  ' +
            val.enMedio.unidad,
            {
              language: 'es-419',
              _voiceIndex: 100,
              onStopped: () => {
                res();
              },
            },
          );
        });
      }

      if (json.alertasyAvisos) {
        let size = await sizeAlertsTrue(json.alertasyAvisos);
        if (size > 0) {
          Speech.speak('Información adicional', { language: 'es-419' });
        }

        {
          json.alertasyAvisos.contieneAzucar &&
            Speech.speak('Contiene azucar', { language: 'es-419', _voiceIndex: 100 });
        }
        {
          json.alertasyAvisos.contieneLactosa &&
            Speech.speak('Contiene lactosa', { language: 'es-419', _voiceIndex: 100 });
        }
      }

      if (json.empresa) {
        Speech.speak('Empresa: ' + json.empresa, {
          language: 'es-419',
          _voiceIndex: 100,
          onDone: () => {
            console.log('finish speak');
            res();
          },
        });
      }
    }, 1000);
  });
}

export function sizeAlertsTrue(obj) {
  console.log(obj);
  return new Promise((res, rej) => {
    let size = 0;
    for (const key in obj) {
      console.log('Key: ', obj[key]);
      if (obj[key] === true) {
        size++;
      }
    }
    res(size);
  });
}

export function mute() {
  Speech.stop();
}

export function AskPermissionAudio() {
  Audio.requestPermissionsAsync().then((val) => {
    if (val.status == 'granted') {
      return;
    } else {
      Alert.alert('Alerta', 'Usted no cuenta con los permisos activo para el volumen.');
    }
  });
}

export function notifyOnCamera() {
  return new Promise(async (res, rej) => {
    await Speech.speak('Cámara activada ', { language: 'es-419' });
    Vibration.vibrate(500, false);
    res();
  });
}

export function notifiTorchOn() {
  return new Promise(async (res, rej) => {
    await Speech.speak('Linterna activada ', { language: 'es-419' });
    res();
  });
}

export function notifiTorchOff() {
  return new Promise(async (res, rej) => {
    await Speech.speak('Linterna desactivada ', { language: 'es-419' });
    res();
  });
}

export function notifyConditionsShow() {
  return new Promise(async (res, rej) => {
    const talkback = await AccessibilityInfo.isScreenReaderEnabled();
    if (talkback) {
      await Speech.speak('Terminos y condiciónes abiertos ', { language: 'es-419' });
      Vibration.vibrate(500, false);
    }
    res();
  });
}

export function notifyConditionsHidden() {
  return new Promise(async (res, rej) => {
    const talkback = await AccessibilityInfo.isScreenReaderEnabled();
    if (talkback) {
      await Speech.speak('Terminos y condiciónes cerrados ', { language: 'es-419' });
      Vibration.vibrate(500, false);
    }
    res();
  });
}
