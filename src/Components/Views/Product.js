import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Divider } from "react-native-elements";
import { log } from "react-native-reanimated";
import { styles } from "../../Styles/StylesGenerals";
import { readProduct, mute, notifyOnCamera } from "../../Utils/UtilsGenerals";
import ItemInfo from "../Product/ItemInfo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Speech from "expo-speech";

import LogoRonda from "../../../assets/logo-ronda.svg";
import CardPreview from "../Product/CardPreview";
import { findProduct, findProductFromKit } from "../../Utils/UtilsSession";
import { notifyErrorServerConect } from "../../Utils/UtilsProducts";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.getParam("product"),
      scanner: props.navigation.getParam("scan"),
      parent: props.navigation.getParam("parent"),
      mute: props.navigation.getParam('mute'),
      loading: false,
      kitProducts: []
    };
  }

  uploadKit = () => {
    const { product } = this.state
    findProductFromKit(product).then(async (arr) => {
      this.setState({ kitProducts: arr })
    })
  }

  componentDidMount() {
    const { product, mute } = this.state;
    if (mute) {
      readProduct(product);
    }

    this.uploadKit();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: styles.headerStyle,
      headerLeft: (
        <View
          style={{
            width: 80,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            style={{ width: 50, marginLeft: "auto", marginRight: "auto" }}
            name="menu"
            color="white"
            size={50}
          ></Icon>
        </View>
      ),
      headerRight: (
        <View
          style={{
            alignContent: "flex-end",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            marginHorizontal: 10,
          }}
        >
          <LogoRonda width={90} height={90} />
        </View>
      ),
    };
  };

  goBack = () => {
    const { scanner, parent } = this.state;
    mute();
    notifyOnCamera().then(() => {
      if (parent) {
        this.props.navigation.replace("Scanner");
      } else {
        this.props.navigation.goBack();
      }

    })
  };

  goToParent = () => {
    this.props.navigation.goBack();
  }


  toProductDetails = (product) => {
    Speech.stop();
    this.props.navigation.push("Product", {
      product: product,
      parent: true,
      mute: mute
    });
  }

  findProduct = (gtin) => {
    console.log("Buscando: ", gtin);
    const { mute } = this.state;
    this.setState({ loading: true })
    findProduct(gtin).then(response => {
      if (response !== null) {
        const product = response.data;
        console.log("PRODUCTO: ", product);
        Speech.stop();
        if (product.tipo) {
          this.props.navigation.push("Product", {
            product: product,
            parent: true,
            mute: mute
          });
          this.setState({ loading: false })
        }
      }
    })
      .catch(err => {
        console.log(err);
        notifyErrorServerConect();
        this.setState({ loading: false })
      })
  }

  render() {
    const { product, parent, loading, kitProducts } = this.state;
    console.log(kitProducts);
    let block = loading ? "none" : "auto";
    return (
      <View pointerEvents={block} style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ alignContent: "center" }}>
            {product.atributosBasicos.foto === null ? (
              <Image
                style={{
                  width: 200,
                  height: 250,
                  flex: 1,
                  resizeMode: "contain",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                source={require("../../../assets/product-not-found.png")}
              ></Image>

            ) : (
                <Image
                  style={{
                    width: 200,
                    height: 250,
                    flex: 1,
                    resizeMode: "contain",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                  source={{
                    uri: product.atributosBasicos.foto,
                  }}
                ></Image>
              )}
          </View>

          <View
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "flex-start",
              alignContent: "space-around",
            }}
          >
            <View style={{ marginLeft: 20, marginVertical: 20, width: "100%" }}>
              <MaterialCommunityIcons size={40} color="#0e2a47" name="medical-bag" />
              <ItemInfo value={product.atributosBasicos.descripcion} />

              <ItemInfo
                value={product.formaFarmaceutica}
                title={"Presentación: "}
              />
              <ItemInfo
                value={
                  product.atributosBasicos.contenidoNeto.valor +
                  " " +
                  product.atributosBasicos.contenidoNeto.unidad
                }
                title={"Contenido: "}
              />
              <ItemInfo
                value={product.viaAdministracion}
                title={"Via de administración: "}
              />
              {product.kitPromocional.length > 0 && (
                <ItemInfo
                  value={product.kitPromocional.length}
                  title={"Productos contenidos en este KIT: "}
                />
              )}
            </View>
            <Divider
              style={{
                backgroundColor: "gray",
                marginVertical: 10,
                marginRight: "auto",
                marginLeft: "auto",
                height: 2,
                width: 200,
              }}
            />

            <View style={{ marginLeft: 20, marginVertical: 20 }}>

              <IconFontisto size={40} color="#0e2a47" name="laboratory" />
              <View>

                <Text style={styles.itemInfo}>Principio Activo:</Text>

                {product.principioActivo.map((val, i) => {
                  return (
                    <View style={{ marginVertical: 10 }} key={i}>
                      <Text
                        style={{
                          color: "gray",
                          textAlign: "left",
                          width: Dimensions.get("window").width / 2,
                        }}
                      >
                        {val.nombre}
                      </Text>
                      <ItemInfo
                        value={
                          val.concentracion.valor +
                          " " +
                          val.concentracion.unidad +
                          " En " +
                          val.enMedio.valor +
                          " " +
                          val.enMedio.unidad
                        }
                        title={"Concentración: "}
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            {/*--------------*/}
            <Divider
              style={{
                backgroundColor: "gray",
                marginVertical: 10,
                marginRight: "auto",
                marginLeft: "auto",
                height: 2,
                width: 200,
              }}
            />
            <View style={{ marginLeft: 20, marginVertical: 20 }}>

              <Icon name="office-building" size={40} color="#0e2a47" />

              <View>
                <ItemInfo
                  value={product.empresa
                  }
                  title={"Empresa: "}
                />
              </View>
            </View>

            {/*--------------*/}


            {product.alertasyAvisos && product.alertasyAvisos.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.itemInfo}>INFORMACIÓN ADICIONAL</Text>
                {product.alertasyAvisos.map((val, i) => {
                  return (
                    <ItemInfo key={i} style={styles.itemInfo} value={val.alerta} />
                  );
                })}
              </View>
            )}
          </View>




          <View style={styles.kitContainer}>

            {kitProducts.map((value, index) => (
              <>
                <Text style={styles.kitTitleProduc}>Producto N {index + 1}</Text>
                <CardPreview gtin={value.atributosBasicos.gtin} image={value.atributosBasicos.foto} onSubmit={() => this.toProductDetails(value)} name={value.atributosBasicos.descripcion} />
              </>

            ))
            }
          </View>

        </ScrollView>






        <View style={styles.footer}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Volver a escanear producto"
            accessibilityLiveRegion="assertive"
            onPress={this.goBack}

            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Icon
              style={{ alignSelf: "center", color: "gray" }}
              size={60}
              name="barcode-scan"
            />
          </TouchableOpacity>

          {parent && (

            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Detalles del producto"
              onPress={this.goToParent}
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Icon
                style={{ alignSelf: "center", color: "#0e2a47" }}
                size={60}
                name="arrow-left"
              />
            </TouchableOpacity>

          )}

          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Detalles del producto"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Icon
              style={{ alignSelf: "center", color: "#0571c3" }}
              size={60}
              name="pill"
            />
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

