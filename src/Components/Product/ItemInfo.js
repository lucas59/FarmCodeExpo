import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
export default class ItemInfo extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingVertical:2,
        width:'auto'
      },
    });
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
        <Text style={{color:'gray'}}>{this.props.value}</Text>
      </View>
    );
  }
}
