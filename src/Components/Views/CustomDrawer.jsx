import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import packageJson from '../../../package.json';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          alignItems: 'center', // Centrar la imagen horizontalmente
        }}
      >
        <Image
          source={require('../.././../assets/logo-ronda.png')}
          style={{ width: 190, height: 60, resizeMode: 'contain' }} // Ajustar el tamaño de la imagen
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Conditions')}>
          <Text style={{ fontSize: 16, color: '#afafaf', textAlign: 'center' }}>{packageJson.version}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Conditions')}>
          <Text style={{ fontSize: 16, color: '#0645AD', textAlign: 'center' }}>Términos y Condiciones</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
