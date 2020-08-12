import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../../Styles/StylesGenerals";
import Icon from "react-native-vector-icons/Ionicons";
import { mute } from "../../Utils/UtilsGenerals";

export default class FooterScanner extends React.Component {
  onPressCodeManual = () => {
    this.props.codeManual();
  };

  render() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
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
          onPress={() => {mute()}}
          style={{
            backgroundColor: "#60A2F0",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        </TouchableOpacity>
      </View>
    );
  }
}
