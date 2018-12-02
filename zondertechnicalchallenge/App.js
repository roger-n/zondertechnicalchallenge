import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Card } from 'react-native-paper';

import MainScreen from './components/MainScreen';
import PlanetDetails from './components/PlanetDetails';

//Top level component
/*
  App gets and all planets from SWAPI
  Planets are sorted by 'easiness of target', determined by diameter and population
  Planets are displayed in a list of touchable elements
  Tapping on an element reveals information to help decide whether or not 
    it is worth destroying the planet.
*/
export default class App extends React.Component {

  //Render the navigator
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

//Navigator with 2 screens (MainScreen and Details) 
//Disabled header and main route is MainScreen
const AppStackNavigator = createStackNavigator(
  {  
    Main: MainScreen,
    Details: PlanetDetails
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  },
  {
    initialRouteName: 'Main',
  }
);