import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import {log} from 'react-native-reanimated';
import {styles} from '../../Styles/StylesGenerals';
import {readProduct} from '../../Utils/UtilsGenerals';
import ItemInfo from '../Product/ItemInfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.getParam('product'),
    };
  }

  componentDidMount() {
    const {product} = this.state;
    readProduct(product);
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerStyle: styles.headerStyle,
      headerLeft: (
        <View
          style={{width: 80, alignContent: 'center', justifyContent: 'center'}}>
          <Icon
            style={{width: 50, marginLeft: 'auto', marginRight: 'auto'}}
            name="menu"
            color="white"
            size={50}></Icon>
        </View>
      ),
    };
  };

  goBack = () => {
    this.props.navigation.navigate('Scanner');
  };

  render() {
    const {product} = this.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{alignContent: 'center'}}>
            <Image
              style={{
                width: 200,
                height: 250,
                borderWidth: 1,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
              source={{
                uri: product.Foto,
              }}></Image>
          </View>

          <View style={{marginRight: 10, marginLeft: 50, marginTop: 10}}>
            <ItemInfo
              value={product.Descripcion}
              title={'Nombre comencial: '}
            />
            <ItemInfo
              value={product.FormaFarmaceutica}
              title={'Presentación: '}
            />
            <ItemInfo
              value={product.ContenidoNeto[0] + ' ' + product.ContenidoNeto[1]}
              title={'Contenido neto: '}
            />
            <ItemInfo
              value={product.ViaAdministracion}
              title={'Via de administración: '}
            />
            <ItemInfo
              value={product.Descripcion}
              title={'Nombre comencial: '}
            />
          </View>

          <Divider
            style={{
              backgroundColor: 'gray',
              marginVertical: 15,
              marginRight: 'auto',
              marginLeft: 'auto',
              height: 2,
              width: 200,
            }}
          />

          <View style={{marginRight: 10, marginLeft: 50, marginTop: 10}}>
            <ItemInfo
              value={product.PrincipioActivo[0].Nombre}
              title={'Principio Activo: '}
            />
            <ItemInfo
              value={
                product.PrincipioActivo[0].Concentracion[0] +
                ' ' +
                product.PrincipioActivo[0].Concentracion[1] +
                ' En ' +
                product.PrincipioActivo[0].CantidadSolvente[0] +
                ' ' +
                product.PrincipioActivo[0].CantidadSolvente[1]
              }
              title={'Concentración: '}
            />
          </View>

          <View style={{marginRight: 10, marginLeft: 50, marginVertical: 10}}>
            <Text style={styles.itemInfo}>INFORMACIÓN ADICIONAL</Text>
            {product.ContieneAzucar == true && (
              <Text style={styles.itemInfo}>Contiene Azucar</Text>
            )}
            {product.ContieneLactosa == true && (
              <Text style={styles.itemInfo}>Contiene Lactosa</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.goBack}
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Icon
              style={{alignSelf: 'center', color: 'gray'}}
              size={60}
              name="barcode-scan"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Icon
              style={{alignSelf: 'center', color: '#0571c3'}}
              size={60}
              name="file-document-box-multiple-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Icon
              style={{alignSelf: 'center', color: 'gray'}}
              size={60}
              name="pill"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
