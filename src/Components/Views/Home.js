import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-elements';
import { SkypeIndicator } from 'react-native-indicators';
import LogoRonda from '../../../assets/logo-ronda.svg';
import { notifyConditionsShow } from '../../Utils/UtilsGenerals';

export default class Home extends React.Component {
  componentDidMount() {
    let cont = 0;
    this._interval = setInterval(async () => {
      try {
        let condition = await AsyncStorage.getItem('conditions');
        console.log("########");
        console.log("condition: ", condition);
        cont++;
        if (cont === 3) {
          clearInterval(this._interval); // Detiene el intervalo después de 3 ejecuciones
          if (condition) {
            this.props.navigation.navigate('Escaner', {
              screen: 'Scanner',
            });
          } else {
            notifyConditionsShow().then(() => {
              this.props.navigation.replace('Conditions');
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this._interval); // Asegura que el intervalo se detiene cuando el componente se desmonta
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#277FFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SkypeIndicator style={{ width: 1, maxHeight: 150, marginVertical: 30 }} size={150} color="white" />
        <Text style={{ color: 'white', letterSpacing: 5 }} h2>
          ETIQUETA
        </Text>
        <Text style={{ color: 'white', letterSpacing: 3 }} h2>
          VIRTUAL
        </Text>

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Powered by </Text>
          <LogoRonda width={120} height={120} />
        </View>
      </View>
    );
  }
}
