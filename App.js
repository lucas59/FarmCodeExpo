import React from "react";
import { StyleSheet, Text, View } from "react-native";

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

const MainNavigator = createStackNavigator({
  Inicio: { screen: Home },
  Scanner: { screen: Scanner },
  Product: { screen: Product },
});

const Drawer = createDrawerNavigator({
  Escaner:{screen:MainNavigator},
});

const Navigator = createSwitchNavigator({ Main: Drawer });

const App = createAppContainer(Navigator)

export default App;
