import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ConfirmScan extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
            onPress={()=>{this.props.ConfirmScan()}}
          style={{
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 300,
            backgroundColor: '#325EA7',
            borderRadius: 150,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>
            ESCANEAR
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
