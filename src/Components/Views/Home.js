import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
//import {newSession} from '../../Utils/UtilsSession';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class Home extends React.Component {
  componentDidMount(props) {
    /*newSession().then((session) => {
      this.props.navigation.replace('Scanner', {session: session});
    });*/
    var cont = 0;
    this._interval = setInterval(() => {
      cont++;
      if (cont == 3) {
        this.props.navigation.replace('Scanner');
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          backgroundColor: '#277FFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SkypeIndicator
          style={{width: 1, maxHeight: 150, marginVertical: 30}}
          size={150}
          color="white"
        />
        <Text style={{color: 'white', letterSpacing: 5}} h2>
          ETIQUETA
        </Text>
        <Text style={{color: 'white', letterSpacing: 3}} h2>
          VIRTUAL
        </Text>
      </View>
    );
  }
}
