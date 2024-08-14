import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Home from './src/Components/Views/Home';
import Scanner from './src/Components/Views/Scanner';
import Product from './src/Components/Views/Product';
import Conditions from './src/Components/Views/Conditions';
import ModalConditions from './src/Components/Views/ModalConditions';
import configureStore from './src/Redux/Reducers';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Home} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Conditions" component={Conditions} />
      <Stack.Screen name="Mymodal" component={ModalConditions} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Escaner" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

const store = configureStore();

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
