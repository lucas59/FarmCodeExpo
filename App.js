import Constants from 'expo-constants';
import React from 'react';
import { Image, Text, View, LogBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import Conditions from './src/Components/Views/Conditions';
import Home from './src/Components/Views/Home';
import ModalConditions from './src/Components/Views/ModalConditions';
import Product from './src/Components/Views/Product';
import Scanner from './src/Components/Views/Scanner';
import { mode } from './src/Config/Config';
import configureStore from './src/Redux/Reducers';
import { notifyConditionsShow } from './src/Utils/UtilsGenerals';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const MainNavigator = createStackNavigator({
  Inicio: { screen: Home },
  Scanner: { screen: Scanner },
  Product: { screen: Product },
  Conditions: { screen: Conditions },
  Mymodal: { screen: ModalConditions },
});

function CustomDrawerContent({ navigation }) {
  const modalConditionsShow = () => {
    notifyConditionsShow().then(() => {
      navigation.navigate('Mymodal');
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Image
          source={require('./assets/logo-ronda.png')}
          style={{ width: 200, height: 60, marginRight: 'auto', marginLeft: 'auto', marginVertical: 50 }}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'gray' }}>{Constants.manifest.version}</Text>
        <Text style={{ color: 'gray' }}>{mode == !'production' && mode.toUpperCase()}</Text>
      </View>
      <TouchableOpacity
        style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => modalConditionsShow()}
      >
        <Text style={{ color: '#0e2a47', fontWeight: 'bold' }}>Términos y condiciones</Text>
      </TouchableOpacity>
    </View>
  );
}

const Drawer = createDrawerNavigator(
  {
    Escaner: { screen: MainNavigator },
  },
  {
    contentComponent: CustomDrawerContent,
  },
);

const Navigator = createSwitchNavigator({ Main: Drawer });

const App = createAppContainer(Navigator);

const store = configureStore();

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppWrapper.displayName = 'AppWrapper';

export default AppWrapper;