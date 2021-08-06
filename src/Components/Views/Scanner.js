import * as Speech from 'expo-speech'
import React from 'react';
import { Alert, AppState, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import LogoRonda from '../../../assets/logo-ronda.svg';
import { set_token } from '../../Redux/Actions/AuthActions';
import { set_manual_code } from '../../Redux/Actions/ScannerActions';
import { styles } from '../../Styles/StylesGenerals';
import { notifiTorchOff, notifiTorchOn, notifyOnCamera } from '../../Utils/UtilsGenerals';
import { alertManualCode, notifySound, notifySuccess, notifyWelcome } from '../../Utils/UtilsProducts';
import { newSession } from '../../Utils/UtilsSession';
import Camera from '../Scanner/Camera';
import ConfirmScan from '../Scanner/ConfirmScan';
import FooterScanner from '../Scanner/FooterScanner';

class Scanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      torchOn: false,
      loading: false,
      scan: false,
      step: 0,
      codeManual: false,
      mute: true,
    };
  }

  backAction = () => {
    const { step } = this.state;
    if (this.props.scanner.manualCode) {
      this.props.dispatch(set_manual_code(false));
    } else if (step === 1) {
      this.setState({ step: 0 });
    } else {
      Alert.alert('¡Espera!', '¿Seguro de que quieres salir de la aplicación?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sí', onPress: () => BackHandler.exitApp() },
      ]);
    }
    return true;
  };

  componentDidMount() {
    Speech.stop()

    if (!this.props.auth.token) {
      newSession()
        .then((response) => {
          if (response.data.code == 200) {
            const token = response.data.data.token;
            this.props.dispatch(set_token(token));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    this.props.navigation.setParams({
      handleTorch: this.handleTorch,
    });
    notifySuccess().then(() => {
      notifyWelcome();
    });

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);

    AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentWillUnmount() {
    this.backHandler.remove();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (action) => {
    if (action === 'background') {
      this.setState({ step: 0 });
      // this.props.dispatch(set_manual_code(false));
    }
  };

  handleTorch = () => {
    const { step } = this.state;
    if (step == 0) {
      this.ConfirmScan();
    }

    this.setState({ torchOn: !this.state.torchOn });

    if (!this.state.torchOn) {
      notifiTorchOn();
    } else {
      notifiTorchOff();
    }
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: styles.headerStyle,
      headerLeft: (
        <React.Fragment>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
              style={{
                width: 80,
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              accessible={true}
              accessibilityLabel="Menu lateral"
            >
              <Icon
                style={{ width: 50, marginLeft: 10, marginRight: 30 }}
                name="menu"
                color="white"
                size={50}
              ></Icon>
            </TouchableOpacity>
          </View>

          <View style={{ display: 'flex' }}>
            <TouchableOpacity
              style={{
                width: 80,
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <Icon
                onPress={() => {
                  params.handleTorch();
                }}
                accessible={true}
                accessibilityLabel="Linterna"
                style={{ width: 50, marginLeft: 'auto', marginRight: 'auto' }}
                name="white-balance-sunny"
                color="white"
                size={40}
              ></Icon>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      ),
      headerRight: (
        <View
          style={{
            alignContent: 'flex-end',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginHorizontal: 10,
          }}
        >
          <LogoRonda width={90} height={90} />
        </View>
      ),
    };
  };

  ConfirmScan = () => {
    notifyOnCamera().then(() => {});
    this.setState({ step: 1 });
  };

  changeCodeManual = () => {
    const { step } = this.state;
    if (step === 0) {
      this.props.dispatch(set_manual_code(true));
      this.setState({ step: 1 });
      alertManualCode();
    } else {
      this.props.dispatch(set_manual_code(!this.props.scanner.manualCode));
      if (!this.props.scanner.manualCode == true) {
        alertManualCode();
      }
    }
  };
  changeMute = () => {
    this.setState({ mute: !this.state.mute });
    notifySound(!this.state.mute);
  };

  render() {
    const { step, torchOn } = this.state;
    const stylesCamera = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
    });

    return (
      <View style={stylesCamera.container}>
        {step == 0 && <ConfirmScan ConfirmScan={this.ConfirmScan} />}

        {step == 1 && (
          <Camera
            token={this.props.auth.token}
            torchOn={torchOn}
            codeManual={this.changeCodeManual}
            props={this.props}
            mute={this.state.mute}
          />
        )}

        <FooterScanner changeMute={this.changeMute} mute={this.state.mute} codeManual={this.changeCodeManual} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
