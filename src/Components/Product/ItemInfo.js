import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-elements";
export default class ItemInfo extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexWrap: "wrap",
        alignItems: "flex-end",
        flexDirection: "row"
      },
    });
    return (
      <View style={styles.container}>
        <Text style={{ color: "gray" }}>
          {this.props.title}{" "}
          <Text style={{ fontWeight: "bold", fontSize: 16,color:'black' }}>
            {this.props.value}
          </Text>
        </Text>
      </View>
    );
  }
}
