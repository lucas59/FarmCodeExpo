import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/Components/Views/Home'
import Scanner from './src/Components/Views/Scanner';
import Product from './src/Components/Views/Product';

const MainNavigator = createStackNavigator({
  Inicio: {screen: Home},
  Scanner: {screen: Scanner},
  Product: {screen: Product},
});

const App = createAppContainer(MainNavigator);

export default App;
