import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera as Cam } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import SpeechSingleton from '../../Utils/SpeechSingleton';
import { notifyError, notifyErrorServerConect, notifyMessage, notifySuccess } from '../../Utils/UtilsProducts';
import { findProduct } from '../../Utils/UtilsSession';
import ModalCodeManual from './ModalCodeManual';

export default function Camera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalNotProduct, setModalNotProduct] = useState(false);
  const manualCode = useSelector((state) => state.scanner.manualCode);
  const [messageError, setMessageError] = useState('');
  const [loading, setloading] = useState(false);

  const { height, width } = Dimensions.get('window');
  const maskRowHeight = Math.round((height - 300) / 20);
  const maskColWidth = (width - 300) / 2;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    props.props.navigation.addListener('willFocus', handleScanner, true);
  }, []);

  const handleScanner = async () => {
    await setScanned(false);
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log('scanned: ', data);
    setloading(true);
    notifySuccess()
      .then(() => {
        if (data) {
          findProduct(props.token, data)
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
                    let text = 'Información no provista por el laboratorio.';
                    setMessageError(text);
                    notifyError().then(() => {
                      notifyMessage(text);
                    });
                    setModalNotProduct(true);
                    // setScanned(false);
                  }
                }
              }
              setloading(false);
            })
            .catch((err) => {
              console.log('Not found product :', err);
              notifyErrorServerConect();
              setScanned(false);
              setloading(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setScanned(false);
      });
    console.log('scannedout');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No acc0p9ot5ess to camera</Text>;
  }

  const closeModalNotProduct = () => {
    setModalNotProduct(false);
    setScanned(false);
  };
  console.log(scanned);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <Cam
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        onTouchStart={true}
        autoFocus={'on'}
        flashMode={props.torchOn == true ? Cam.Constants.FlashMode.torch : Cam.Constants.FlashMode.off}
        barCodeScannerSettings={{
          barcodeTypes: [
            BarCodeScanner.Constants.Type.ean8,
            BarCodeScanner.Constants.Type.ean13,
            BarCodeScanner.Constants.Type.ean14,
            BarCodeScanner.Constants.Type.upc12,
            BarCodeScanner.Constants.Type.upc7,
          ],
        }}
      >
        <View style={styles.maskOutter}>
          <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
          <View style={[{ flex: 30 }, styles.maskCenter]}>
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            <View style={styles.maskInner} />
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          </View>
          <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
        </View>
      </Cam>
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
              name="ios-close-circle-outline"
              color="white"
              size={100}
            ></Icon>
            <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#343a40' }}>Oops...</Text>
            <Text style={{ textAlign: 'center', marginTop: 10, width: '100%', fontSize: 18, color: '#343a40' }}>
              Información no provista por el laboratorio
            </Text>
            <Button
              onPress={closeModalNotProduct}
              buttonStyle={{ backgroundColor: '#dc3545', marginTop: 20 }}
              title="Cerrar"
            />
          </View>
        </View>
      </Modal>
      <ModalCodeManual loading={loading} visible={manualCode} onSearch={handleBarCodeScanned} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});
