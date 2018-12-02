import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-paper';

import PlanetsListView from './PlanetsListView'

const win = Dimensions.get('window');

//Mains screen component with header, header image, and PlanetListView
export default class MainScreen extends React.Component {

  //Constructor, binds handler for higher component method
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  //Handler for higher component method
  //Goes to Details screen with parameter planetSelected
  handler(planet) {
    this.props.navigation.navigate('Details', {
      planetSelected: planet
    });
  }

  //Render a header, header image, and the PlanetListView
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            EASIEST TARGETS
          </Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheaderText}>
            Sorted for convenience
          </Text> 
        </View>
        <Image style={styles.deathStar} source={require('../assets/death-star.png')} />
        <Card style={styles.listViewContainer}>
          <PlanetsListView handler = {this.handler}/>
        </Card>
      </View>
    );
  }
}

//CSS for App.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#808080',
    padding: 8,
  },
  headerContainer: {
    backgroundColor: '#D3D3D3'
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheaderContainer: {
    backgroundColor: '#D3D3D3',
    paddingBottom: 8,
  },
  subheaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deathStar: {
    width: win.width - 16,
    height: 442/1306 * win.width - 16,
  },
  listViewContainer: {
    height: 0.63 * win.height,
  }
});
