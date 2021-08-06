import * as Speech from 'expo-speech';
import { sizeAlertsTrue } from './UtilsGenerals';


class SpeechSingleton {
  static instance = null;

  static getInstance() {
    if (!SpeechSingleton.instance) {
        SpeechSingleton.instance = new SpeechSingleton();
    }
    return SpeechSingleton.instance;
  }

  constructor() {
    this.speech = null;
  }


 readProduct2(parent, json) {
    return new Promise(async (res, rej) => {
      
      await Speech.stop()
      Speech.speak(json.atributosBasicos.descripcion.toLowerCase(), {
        language: 'es-419',
        _voiceIndex: 100,
      });
      const isSpeaking = await Speech.isSpeakingAsync();
      console.log(isSpeaking);    
    
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
            res();
          },
        });
      }
    });
  }


 
}

export default SpeechSingleton.getInstance();
