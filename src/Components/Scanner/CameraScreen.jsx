// import { Constants, requestPermissionsAsync } from 'expo-barcode-scanner';
import { CameraView } from 'expo-camera';

import { FlashMode } from 'expo-camera/build/legacy/Camera.types';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { notifyError, notifyErrorServerConect } from '../../Utils/UtilsProducts';
import { findProduct } from '../../Utils/UtilsSession';
import ModalCodeManual from './ModalCodeManual';
import { set_manual_code } from '../../Redux/Actions/ScannerActions';
import { Constants, requestPermissionsAsync } from 'expo-barcode-scanner';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState('');
  const [scanned, setScanned] = useState(false);
  const [modalNotProduct, setModalNotProduct] = useState(false);
  const manualCode = useSelector((state) => state.scanner.manualCode);
  const navigation = useRoute();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestPermissionsAsync();
        const hasPermission = status === 'granted';
        console.log('hasPermission: ', hasPermission);

        setHasPermission(hasPermission);
      } catch (error) {
        console.error(error);
      }
    })();
    props.props.navigation.addListener('willFocus', handleScanner, true);
  }, []);
  console.log('SCANNED: ', scanned);
  const handleScanner = async () => {
    await setScanned(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('FOCUSS');
      setScanned(false);
    }, []),
  );

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) {
      return;
    }

    setScanned(true);
    if (data) {
      findProduct(data)
        .then((response) => {
          if (response !== null) {
            const product = response.data;
            if (product.tipo) {
              props.props.navigation.push('Product', {
                product: product,
                scan: setScanned,
                mute: props.mute,
              });
            } else {
              if (!modalNotProduct) {
                setModalNotProduct(true);
                notifyError();
                Speech.speak('Error, el producto escaneado no esta disponible. Intente nuevamente.', {
                  language: 'es-419',
                  onDone: () => {
                    setModalNotProduct(false);
                    setScanned(false);
                  },
                });
              }
            }
          }
          Promise.resolve();
        })
        .catch((err) => {
          console.log('Error: ', err);
          notifyErrorServerConect().then(() => {
            setScanned(false);
          });
          Promise.reject();
        });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onCloseManualCodeModal = () => {
    this.props.dispatch(set_manual_code(false));
  };

  console.log(props.torchOn == true ? 'on' : 'off');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={handleBarCodeScanned}
        autoFocus={'on'}
        enableTorch={props.torchOn}
        flash={props.torchOn == true ? 'on' : 'off'}
        flashMode={props.torchOn == true ? 'on' : 'off'}
        barCodeScannerSettings={{
          barcodeTypes: [
            Constants.Type.ean8,
            Constants.Type.ean13,
            Constants.Type.ean14,
            Constants.Type.upc12,
            Constants.Type.upc7,
          ],
        }}
      />
      <Modal
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        isVisible={modalNotProduct}
        onBackdropPress={() => {
          setModalNotProduct(false);
          setScanned(false);
        }}
        onBackButtonPress={() => {
          setModalNotProduct(false);
          setScanned(false);
        }}
      >
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
              width: '80%',
            }}
          >
            <Icon
              style={{
                width: 'auto',
                color: '#dc3545',
                marginVertical: 20,
              }}
              name="close"
              color="white"
              size={100}
            ></Icon>
            <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#343a40' }}>Oops...</Text>
            <Text style={{ textAlign: 'center', marginTop: 10, width: '100%', fontSize: 18, color: '#343a40' }}>
              Información no provista por el laboratorio
            </Text>
          </View>
        </View>
      </Modal>

      <ModalCodeManual
        onClose={props.codeManual}
        visible={manualCode}
        onSearch={handleBarCodeScanned}
        codeManual={props.codeManual}
      />
    </View>
  );
}
