import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../Styles/StylesGenerals';
import { alertManualCode } from '../../Utils/UtilsProducts';

export default class FooterScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muteIcon: false,
    };
  }

  onPressCodeManual = () => {
    alertManualCode();
    this.props.codeManual();
  };

  render() {
    const { mute, changeMute } = this.props;
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={this.onPressCodeManual}
          style={{
            backgroundColor: '#281E74',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Ingresar Código</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeMute(), this.setState({ muteIcon: !this.state.muteIcon });
          }}
          style={{
            backgroundColor: 'black',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mute ? (
            <React.Fragment>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Silenciar
              </Text>
              <Icon style={{ marginLeft: 10, color: 'white' }} size={30} name="volume-mute" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Activar volumen
              </Text>
              <Icon style={{ marginLeft: 10, color: 'white' }} size={30} name="volume-high" />
            </React.Fragment>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
