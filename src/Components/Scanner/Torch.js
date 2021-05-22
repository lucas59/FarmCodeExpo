import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TorchIcon(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isTorch, setIsTorch] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  });

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <View />;
  }

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={isTorch ? 'Apagar linterna' : 'Encender linterna'}
      onPress={async () => {
        console.log('prendiendo');
        try {
          Torch.switchState(true);
        } catch (err) {
          console.log('Error: ', err);
        }
      }}
    >
      <Icon
        style={{ width: 50, marginVertical: 20, marginLeft: 20 }}
        name="ios-sunny"
        color={isTorch ? 'yellow' : 'white'}
        size={50}
      ></Icon>
    </TouchableOpacity>
  );
}
