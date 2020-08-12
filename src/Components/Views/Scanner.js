import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { styles } from "../../Styles/StylesGenerals";
//import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FooterScanner from "../Scanner/FooterScanner";
import ConfirmScan from "../Scanner/ConfirmScan";
import Camera from "../Scanner/Camera";
import LogoRonda from "../../../assets/logo-ronda.svg";
import TorchIcon from "../Scanner/Torch";
import ModalCodeManual from "../Scanner/ModalCodeManual";
import Torch from "react-native-torch";

export default class Scanner extends React.Component {
  constructor(props) {
    super(props);
    // this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
      loading: false,
      scan: false,
      step: 0,
      codeManual: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleTorch: this.handleTorch,
    });
  }

  handleTorch = () => {
    this.setState({ torchOn: !this.state.torchOn });
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: styles.headerStyle,
      headerLeft: (
        <React.Fragment>
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{
              width: 80,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Icon
              style={{ width: 50, marginLeft: 10, marginRight: 30 }}
              name="menu"
              color="white"
              size={50}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 80,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Icon
              onPress={() => {
                params.handleTorch();
              }}
              style={{ width: 50, marginLeft: "auto", marginRight: "auto" }}
              name="white-balance-sunny"
              color="white"
              size={40}
            ></Icon>
          </TouchableOpacity>
        </React.Fragment>
      ),
      headerRight: (
        <View
          style={{
            alignContent: "flex-end",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            marginHorizontal: 10,
          }}
        >
          <LogoRonda width={90} height={90} />
        </View>
      ),
    };
  };

  ConfirmScan = () => {
    this.setState({ step: 1 });
  };

  changeCodeManual = () => {
    this.setState({ codeManual: !this.state.codeManual });
  };

  render() {
    const { step, codeManual, torchOn } = this.state;
    const stylesCamera = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
      },
      preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      },
      capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
      },
    });

    return (
      <View style={stylesCamera.container}>
        {step == 0 && <ConfirmScan ConfirmScan={this.ConfirmScan} />}

        {step == 1 && (
          <Camera
            torchOn={torchOn}
            codeManual={this.changeCodeManual}
            visibleCodeManual={codeManual}
            props={this.props}
          />
        )}

        <FooterScanner codeManual={this.changeCodeManual} />
      </View>
    );
  }
}
