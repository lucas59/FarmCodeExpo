import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function CardPreview({ name, onSubmit, gtin, image }) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {image ? (
            <Image style={styles.logo} source={{ uri: image }} />
          ) : (
            <Image style={styles.logo} source={require('../../../assets/product-not-found.png')} />
          )}
        </View>
        <View style={styles.body}>
          <Text style={styles.label}>{name}</Text>
          <TouchableOpacity
            accessibilityLiveRegion="assertive"
            accessibilityTraits="button"
            accessibilityComponentType="button"
            accessibilityLabel="Ver Producto"
            onPress={() => onSubmit(gtin)}
            style={styles.buttonShow}
          >
            <Text accessibilityLabel="Ver producto" style={styles.textButton}>
              Ver Producto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: 'auto',
    backgroundColor: '#F2F2F2',
    padding: 10,
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logoContainer: {
    width: 150,
  },
  logo: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 0,
    display: 'flex',
  },
  label: {
    fontSize: 18,
    color: '#132060',
    fontWeight: 'bold',
    display: 'flex',
  },
  buttonShow: {
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    backgroundColor: '#3971C3',
    color: 'white',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 22,
  },
});
