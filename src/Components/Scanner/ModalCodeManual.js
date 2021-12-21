import React, { useState } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import { Keyboard, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { set_manual_code } from '../../Redux/Actions/ScannerActions';

export default function ModalCodeManual(props) {
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();

  const onSearch = function () {
    if (code) {
      let params = {
        data: code,
      };
      Keyboard.dismiss();
      props.onSearch(params);
    }
  };

  if (props.visible) {
    return (
      <View on style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
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
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              onPress={() => dispatch(set_manual_code(false))}
            >
              <Icon style={{ width: 35 }} name="ios-close" color={'#2089dc'} size={40}></Icon>
            </TouchableOpacity>
            <Input
              placeholder="Código"
              style={{ width: '90%' }}
              keyboardType="numeric"
              value={code}
              onChangeText={(value) => setCode(value)}
            />

            <Button
              loading={props.loading}
              title="Buscar"
              onPress={onSearch}
              style={{ width: 100 }}
              type="outline"
            />
          </View>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
}
