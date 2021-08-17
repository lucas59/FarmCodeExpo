import Axios from 'axios';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { AccessibilityInfo } from 'react-native';
import { url_product } from '../Config/Config';

export function searchProduct(token, gtin) {
  return new Promise((res, rej) => {
    try {
      Axios.get(url_product + gtin, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          res(response);
        })
        .catch((err) => {
          console.log('ERROR: ', err);
          rej();
        });
    } catch (err) {
      console.log(err);
      rej();
    }
  });
}

export async function errorProduct() {
  return new Promise(async (res, rej) => {
    await Speech.speak('Error, el producto escaneado no esta disponible.', {
      language: 'es-419',
      onDone: () => {
        res();
      },
    });
  });
}

export function notifySound(value) {
  if (value) {
    Speech.speak('Sonido activado', { language: 'es-419' });
  } else {
    Speech.speak('Sonido desactivado', { language: 'es-419' });
  }
}

export async function notifyWelcome() {
  const talkback = await AccessibilityInfo.isScreenReaderEnabled();
  if (talkback) {
    Speech.speak('Bienvenido', { language: 'es-419' });
  }
}

export function notifyWelcomeConditions() {
  Speech.speak('Términos y condiciónes', { language: 'es-419' });
}

export function alertManualCode() {
  Speech.speak('Ingrese el código del producto', { language: 'es-419' });
}

export async function notifySuccess() {
  return new Promise((res, rej) => {
    try {
      Audio.Sound.createAsync(
        require('../../assets/success.mp3'),
        {
          shouldPlay: true,
        },
        (status) => {
          console.log('didJustFinish', status.didJustFinish);
          if (status.didJustFinish) {
            res();
          }
        },
      );
    } catch (error) {
      console.log('Success error: ', error);
      rej();
    }
  });
}

export async function notifyError() {
  return new Promise((res, rej) => {
    try {
      Audio.Sound.createAsync(
        require('../../assets/error.mp3'),
        {
          shouldPlay: true,
        },
        (status) => {
          if (status.didJustFinish) {
            res();
          }
        },
      );
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.log('Notify error: ', error);
      rej();
    }
  });
}

export async function notifyMessage(message) {
  return new Promise(async (res, rej) => {
    Speech.speak(message, {
      language: 'es-419',
      _voiceIndex: 100,
      onDone: () => res(),
    });
  });
}

export function notifyErrorServerConect() {
  return new Promise(async (res, rej) => {
    await Speech.speak('Error de conexión con el servidor ', {
      language: 'es-419',
      onDone: () => {
        res();
      },
    });
  });
}
