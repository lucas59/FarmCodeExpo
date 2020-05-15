import React from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "../../Styles/StylesGenerals";
import { searchProduct } from "../../Utils/UtilsGenerals";
import Icon from "react-native-vector-icons/Ionicons";
import { log } from "react-native-reanimated";
import FooterScanner from "../Scanner/FooterScanner";
import ConfirmScan from "../Scanner/ConfirmScan";
import Camera from "../Scanner/Camera";
import { Audio } from "expo-av";

export default class Scanner extends React.Component {
  constructor(props) {
    super(props);
    // this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
      loading: false,
      scan: false,
      step: 0,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: styles.headerStyle,
      headerLeft: (
        <View
          style={{
            width: 80,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            style={{ width: 50, marginLeft: "auto", marginRight: "auto" }}
            name="ios-menu"
            color="white"
            size={50}
          ></Icon>
        </View>
      ),
    };
  };

  onBarCodeRead = (e) => {
    if (e.data) {
      //si encuentro el codigo entonces
      searchProduct(e.data, e.type).then((response) => {
        this.props.navigation.navigate("Product", { product: response });
      });
    }
  };

  ConfirmScan = () => {
    this.setState({ step: 1 });
  };

  render() {
    const { step } = this.state;

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

        {step == 1 && <Camera props={this.props} />}

        <FooterScanner />
      </View>
    );
  }
}
