import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  SafeAreaView,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Home from "./src/Components/Views/Home";
import Scanner from "./src/Components/Views/Scanner";
import Product from "./src/Components/Views/Product";
import Conditions from "./src/Components/Views/Conditions";
import ModalConditions from "./src/Components/Views/ModalConditions";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { notifyConditionsShow } from "./src/Utils/UtilsGenerals";


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

export default App;
