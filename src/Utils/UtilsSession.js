import { url_session } from '../Config/Config';
import * as Speech from 'expo-speech';
import { AccessibilityInfo, Vibration } from 'react-native';
import Axios from 'axios';
import { notifyErrorServerConect, searchProduct } from './UtilsProducts';

export function newSession() {
  return new Promise((res, rej) => {
    Axios.post(url_session, {
      usuario: 'fbrasesco@gs1uy.org',
      contrasena: '12345678',
    })
      .then((response) => {
        res(response);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function notifyConditionsFail() {
  return new Promise(async (res, rej) => {
    const talkback = await AccessibilityInfo.isScreenReaderEnabled();
    if (talkback) {
      await Speech.speak('Terminos y condiciónes rechazados. Cerrando aplicación ', {
        language: 'es-419',
        onDone: () => {
          Vibration.vibrate(500, false);
          res();
        },
      });
    } else {
      res();
    }
  });
}

export function findProduct(token, gtin) {
  return new Promise(async (res, rej) => {
    if (token) {
      searchProduct(token, gtin)
        .then((response) => {
          if (response.data != undefined && response.data.code == 200) {
            res(response.data);
          } else {
            rej();
          }
        })
        .catch((err) => {
          alert('Error al buscar el producto', JSON.stringify(err));
          rej();
          notifyErrorServerConect().then(() => {
            setScanned(false); //vuelvo a setear el escanner
          });
        });
    } else {
      newSession()
        .then((response) => {
          if (response.data.code == 200) {
            const token = response.data.data.token;
            searchProduct(token, gtin)
              .then((response) => {
                if (response.data != undefined && response.data.code == 200) {
                  res(response.data);
                } else {
                  rej();
                }
              })
              .catch((err) => {
                alert('Error al buscar el producto', JSON.stringify(err));
                rej();
                notifyErrorServerConect().then(() => {
                  setScanned(false); //vuelvo a setear el escanner
                });
              });
          }
        })
        .catch((err) => {
          notifyErrorServerConect().then(() => {
            setScanned(false);
          });
          console.log('Error: ', err);
        });
    }
  });
}

export async function findProductFromKit(product) {
  return new Promise(async (res, rej) => {
    let kit = [];
    if (product && product.kitPromocional.length > 0) {
      for (let index = 0; index < product.kitPromocional.length; index++) {
        const element = product.kitPromocional[index];
        findProduct(element.gtin)
          .then((response) => {
            if (response) {
              const newproduct = response.data;
              kit.push(newproduct);
            }

            if (product.kitPromocional.length === kit.length) {
              res(kit);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
}
