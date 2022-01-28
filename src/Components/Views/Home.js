import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Text } from 'react-native-elements';
import { SkypeIndicator } from 'react-native-indicators';
import LogoRonda from '../../../assets/logo-ronda.svg';
import { notifyConditionsShow } from '../../Utils/UtilsGenerals';

export default class Home extends React.Component {
  componentDidMount() {
    var cont = 0;
    this._interval = setInterval(async () => {
      cont++;
      if (cont == 3) {
        let condition = await AsyncStorage.getItem('conditions');
        if (condition) {
          this.props.navigation.replace('Scanner');
        } else {
          notifyConditionsShow().then(() => {
            this.props.navigation.replace('Conditions');
          });
        }
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    console.log(this.props);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
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
        <Text style={{ color: 'white', letterSpacing: 3 }} h2>
          FARMA
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
