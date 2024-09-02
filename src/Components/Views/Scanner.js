import React from 'react';
import { Alert, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import LogoRonda from '../../../assets/logo-ronda.png';
import { set_manual_code, set_scanned } from '../../Redux/Actions/ScannerActions';
import { styles } from '../../Styles/StylesGenerals';
import { notifiTorchOff, notifiTorchOn, notifyOnCamera } from '../../Utils/UtilsGenerals';
import { notifySound, notifySuccess, notifyWelcome } from '../../Utils/UtilsProducts';
import CameraScreen from '../Scanner/CameraScreen';
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
      scanned: false,
    };
  }

  backAction = () => {
    if (this.props.scanner.codeManual) {
      this.props.dispatch(set_manual_code(false));
    } else {
      Alert.alert('¡Espera!', '¿Seguro de que quieres salir de la aplicación?', [
        {
          text: 'Cancelar',
          onPress: () => null,
        },
        { text: 'Sí', onPress: () => BackHandler.exitApp() },
      ]);
    }
    return true;
  };

  componentDidMount() {
    notifySuccess().then(() => {
      notifyWelcome();
    });

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    this.backHandler.remove();
    BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }

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
    notifyOnCamera().then(() => {
      console.log("this.props.scanner.manualCode: ");
      this.setState({ step: 1 });
    }).catch((err) => {

      console.error("ERROR notifyOnCamera: ", err);
    });
  };

  changeCodeManual = () => {
    this.setState({ step: 1 });
    this.props.dispatch(set_manual_code(!this.props.scanner.manualCode));
  };

  changeMute = () => {
    this.setState({ mute: !this.state.mute });
    notifySound(!this.state.mute);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.scanner.torch != this.props.scanner.torch) {

      if (this.props.scanner.torch) {

        if (this.state.step == 0) {
          this.setState({ step: 1 });
        }
        setTimeout(() => {
          this.setState({ torchOn: this.props.scanner.torch });
        }, 1000);

        notifiTorchOn();

      } else {
        notifiTorchOff();
        this.setState({ torchOn: this.props.scanner.torch });
      }
    }
  }

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
          <CameraScreen
            torchOn={torchOn}
            codeManual={this.changeCodeManual}
            visibleCodeManual={this.props.scanner.manualCode}
            props={this.props}
            mute={this.state.mute}
            scanned={this.state.scanned}
            setScanned={(scanned) => {
              this.props.dispatch(set_scanned(scanned));
            }}
          />
        )}

        <FooterScanner
          changeMute={this.changeMute}
          mute={this.state.mute}
          codeManualVisible={this.props.scanner.manualCode}
          codeManual={this.changeCodeManual}
        />
      </View>
    );
  }
}

// Mapeando el estado de Redux a las props del DrawerNavigator
const mapStateToProps = (state) => ({
  state: state,
});

// Conectando el DrawerNavigator con Redux
export default connect(mapStateToProps)(Scanner);
