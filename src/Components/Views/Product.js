import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Divider } from "react-native-elements";
import { log } from "react-native-reanimated";
import { styles } from "../../Styles/StylesGenerals";
import { readProduct } from "../../Utils/UtilsGenerals";
import ItemInfo from "../Product/ItemInfo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LogoRonda from "../../../assets/logo-ronda.svg";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.getParam("product"),
      scanner: props.navigation.getParam("scan"),
    };
  }

  componentDidMount() {
    const { product } = this.state;
    readProduct(product);
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
    const { scanner } = this.state;
    scanner(false);
    this.props.navigation.goBack();
  };

  render() {
    const { product } = this.state;
    return (
      <View style={{ flex: 1 }}>
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
                source={require("../../../assets/logo_medicamento_default.png")}
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
            <View style={{marginLeft:20, marginVertical: 20,width:"100%"}}>
              
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

            <View style={{marginLeft:20, marginVertical: 20}}>

              <Image source={require("../../../assets/lab.png")} />
              <View>
                <View>

                  <Text style={styles.itemInfo}>Principio Activo:</Text>

                  {product.principioActivo.map((val, i) => {
                    return (
                      <View style={{marginVertical:10}}>
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
            </View>

            {product.alertasyAvisos.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.itemInfo}>INFORMACIÓN ADICIONAL</Text>
                {product.alertasyAvisos.map((val, i) => {
                  return (
                    <ItemInfo style={styles.itemInfo} value={val.alerta} />
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
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

          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Icon
              style={{ alignSelf: "center", color: "gray" }}
              size={60}
              name="file-document-box-multiple-outline"
            />
          </TouchableOpacity>

          <TouchableOpacity
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
      </View>
    );
  }
}
