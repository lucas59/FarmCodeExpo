import React from 'react';
import { connect } from 'react-redux';
import CustomDrawerContent from './src/Components/Views/CustomDrawer';


import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from './assets/logo-ronda.png';
import Conditions from './src/Components/Views/Conditions';
import Home from "./src/Components/Views/Home";
import ModalConditions from './src/Components/Views/ModalConditions';
import Product from './src/Components/Views/Product';
import ScannerWrapper from './src/Components/Views/ScannerWrapper';
import { set_torch } from './src/Redux/Actions/ScannerActions';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Inicio" component={Home} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Scanner" component={ScannerWrapper} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Product" component={Product} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Conditions" component={Conditions} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Mymodal" component={ModalConditions} />
    </Stack.Navigator>
  );
}


const Header = ({ otherProps, title, navigation }) => {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#325EA7', justifyContent: 'space-between'
    }}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#325EA7', justifyContent: 'space-between'
      }}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={{ width: 50, height: 50, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
        >
          <Icon name="menu" color={'white'} size={50} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const { state } = otherProps
            otherProps.dispatch(set_torch(!state.scanner.torch))
          }}
          style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
        >
          <Icon name="sunny" color={'white'} size={50} />
        </TouchableOpacity>

      </View>

      <View>
        <Image
          source={logo}
          style={{ width: 110, height: 60, resizeMode: 'contain' }} // Ajustar el tamaño de la imagen
        />
      </View>
    </View>
  );
};

function DrawerNavigator(props) {
  const otherProps = props; // Accediendo al estado de Redux
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: (props) => <Header otherProps={otherProps} {...props} navigation={navigation} />,
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Escaner" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

// Mapeando el estado de Redux a las props del DrawerNavigator
const mapStateToProps = (state) => ({
  state: state,
});

// Conectando el DrawerNavigator con Redux
export default connect(mapStateToProps)(DrawerNavigator);
