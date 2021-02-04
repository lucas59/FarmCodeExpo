import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../../Styles/StylesGenerals";
import Icon from "react-native-vector-icons/Ionicons";
import { mute } from "../../Utils/UtilsGenerals";
import { alertManualCode } from "../../Utils/UtilsProducts";


export default class FooterScanner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      muteIcon: false
    }
  }


  onPressCodeManual = () => {
    alertManualCode();
    this.props.codeManual();
  };

  render() {
    const { muteIcon } = this.state
    const { mute, changeMute, searching } = this.props;
    console.log("Searching ", searching);
    console.log("dsasdasdasd");
    return (
      <View importantForAccessibility={searching ? "no" : "auto"} accessible={searching ? false : true} style={styles.footer}>
        <TouchableOpacity
          importantForAccessibility={searching ? "no" : "auto"}
          accessible={searching ? false : true}
          disabled={searching ? true : false}
          onPress={this.onPressCodeManual}
          style={{
            backgroundColor: "#281E74",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Ingresar Código
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { changeMute(), this.setState({ muteIcon: !this.state.muteIcon }) }}
          style={{
            backgroundColor: "black",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          {mute ? (
            <React.Fragment>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Silenciar
          </Text>
              <Icon
                style={{ marginLeft: 10, color: "white" }}
                size={30}
                name="md-volume-off"
              />
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Activar volumen
          </Text>
                <Icon
                  style={{ marginLeft: 10, color: "white" }}
                  size={30}
                  name="md-volume-high"
                />
              </React.Fragment>
            )}

        </TouchableOpacity>
      </View>
    );
  }
}
