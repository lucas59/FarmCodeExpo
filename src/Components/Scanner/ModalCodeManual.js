import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, Text, Keyboard } from "react-native";
import { Input, Button } from "react-native-elements";

export default function ModalCodeManual(props) {
  const [code, setCode] = useState(null);

  const onSearch = function () {
    if (code) {
      console.log(code.length);
      let params = {
        data: code,
      };
      
      //props.codeManual();
      Keyboard.dismiss();
      props.onSearch(params);
    }
  };
  console.log(props.visible);
  return (
    <Modal
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
      isVisible={props.visible}
      onBackdropPress={() => {
        props.codeManual();
      }}
      onBackButtonPress={() => {
        props.codeManual();
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 5,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: "90%",
          }}
        >
          <Input
            placeholder="Código"
            style={{ width: "90%" }}
            value={code}
            onChangeText={(value) => setCode(value)}
            
          />
          <Button
            title="Buscar"
            onPress={onSearch}
            style={{ width: 150 }}
            type="outline"
          />
        </View>
      </View>
    </Modal>
  );
}
