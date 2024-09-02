import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function ModalCodeManual(props) {
  const [code, setCode] = useState(null);

  const onSearch = function () {
    if (code) {
      console.log(code.length);
      let params = {
        data: code,
      };
      console.log(params);
      Keyboard.dismiss();
      props.onSearch(params);
    }
  };

  const handleOutsidePress = () => {
    props.onClose(); // función que cierra el modal
  };

  if (props.visible) {
    return (

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              width: '90%',
            }}
          >
            <Input
              placeholder="Código"
              style={{ width: '90%' }}
              keyboardType="numeric"
              value={code}
              onChangeText={(value) => setCode(value)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 10 }}>
              <Button title="Cerrar" onPress={props.onClose} color="error" type="outline" />
              <Button title="Buscar" onPress={onSearch} />
            </View>
          </View>
        </View>
      </View>

    );
  } else {
    return <View />;
  }
}
