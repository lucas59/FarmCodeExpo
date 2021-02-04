import React from "react";
import { Image, Text, View } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Home from "./src/Components/Views/Home";
import Scanner from "./src/Components/Views/Scanner";
import Product from "./src/Components/Views/Product";
import Conditions from "./src/Components/Views/Conditions";
import ModalConditions from "./src/Components/Views/ModalConditions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { notifyConditionsShow } from "./src/Utils/UtilsGenerals";

import { Provider } from 'react-redux';
import configureStore from "./src/Redux/Reducers";


const MainNavigator = createStackNavigator({
  Inicio: { screen: Home },
  Scanner: { screen: Scanner },
  Product: { screen: Product },
  Conditions: { screen: Conditions },
  Mymodal: { screen: ModalConditions }

});


function CustomDrawerContent({ navigation }) {


  const modalConditionsShow = () => {
    notifyConditionsShow().then(() => {
      navigation.navigate('Mymodal');
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <Image source={require("./assets/logo-ronda.png")} style={{ width: 200, height: 60, marginRight: 'auto', marginLeft: 'auto', marginVertical: 50 }} />
      </View>
      <TouchableOpacity style={{ height: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => modalConditionsShow()}>
        <Text style={{ color: '#0e2a47', fontWeight: 'bold' }}>Términos y condiciones</Text>
      </TouchableOpacity >
    </View >
  )
};

const Drawer = createDrawerNavigator({
  Escaner: { screen: MainNavigator }
}, {
  contentComponent: CustomDrawerContent
});

const Navigator = createSwitchNavigator({ Main: Drawer });

const App = createAppContainer(Navigator)

const store = configureStore();

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
);
