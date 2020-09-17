import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, useFocusEffect } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { searchProduct, errorProduct, notifyError, notifySound, notifySuccess } from "../../Utils/UtilsProducts";
import { newSession } from "../../Utils/UtilsSession";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import ModalCodeManual from "./ModalCodeManual";
import { Camera as Cam } from "expo-camera";

export default function Camera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalNotProduct, setModalNotProduct] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();


    props.props.navigation.addListener("willFocus", handleScanner, true);  
    // every time you add it, you also remove it when props.location.pathname changes
    return () => {
      props.props.navigation.removeListener("willFocus", handleScanner, true);
    }

  }, []);


  

  const handleScanner = async () => {
    await setScanned(false);
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    //   mute();
    setScanned(true);
    try {
      await notifySuccess();  
    } catch (error) {
        console.log(error);
    }
    
    if (data) {
      //si encuentro el codigo entonces
      newSession().then((res) => {
        // abro una session
        if (res.data.code == 200) {
          const token = res.data.data.token;
          searchProduct(token, data).then((response) => {
            console.log(response);
            if (response.data != undefined && response.data.code == 200) {
              if (response.data.data.tipo != null) {
                const product = response.data.data;
                console.log(product);
                props.props.navigation.navigate("Product", {
                  product: product,
                  scan: setScanned,
                  mute: props.mute
                });
              } else {
                if (!modalNotProduct) {
                  setModalNotProduct(true);
                  notifyError();
                  errorProduct();
                  setInterval(() => {
                    setModalNotProduct(false);
                    setScanned(false);
                  }, 4000);
                }
              }
            } else {

            }
          }).catch((err) => {
            console.log("Error: ", err);
            setScanned(true);
          })
        }
      });
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Cam
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        onTouchStart={true}
        autoFocus={'on'}
        flashMode={
          props.torchOn == true
            ? Cam.Constants.FlashMode.torch
            : Cam.Constants.FlashMode.off
        }
        barCodeScannerSettings={{
          barcodeTypes: [
            BarCodeScanner.Constants.Type.ean8,
            BarCodeScanner.Constants.Type.ean13,
            BarCodeScanner.Constants.Type.ean14,
            BarCodeScanner.Constants.Type.upc12,
            BarCodeScanner.Constants.Type.upc7,
          ],
        }}
      />

      <Modal
        animationIn={"bounceIn"}
        animationOut={"bounceOut"}
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
              width: "80%",
            }}
          >
            <Icon
              style={{
                width: "auto",
                color: "#dc3545",
                marginVertical: 20,
              }}
              name="ios-close-circle-outline"
              color="white"
              size={100}
            ></Icon>
            <Text
              style={{ fontSize: 35, fontWeight: "bold", color: "#343a40" }}
            >
              Oops...
            </Text>
            <Text style={{ marginTop: 20, fontSize: 20, color: "#343a40" }}>
              Producto no disponible.
            </Text>
          </View>
        </View>
      </Modal>

      <ModalCodeManual
        visible={props.visibleCodeManual}
        onSearch={handleBarCodeScanned}
        codeManual={props.codeManual}
      />
    </View>
  );
}
