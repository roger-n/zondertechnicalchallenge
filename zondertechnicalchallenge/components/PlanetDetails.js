import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

//Component for more details of a planet
export default class PlanetDetails extends React.Component {

  //Render a header, information about the planet, an image, and a back button
  render() {

    //Get information frmo the MainScene row that callwed it
    const { navigation } = this.props;
    const planetSelected = navigation.getParam('planetSelected');
    
    //Setting up details screen
    //Making case consistent, adding styling
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.headQuestion}>
            Target practice or vacation home?
          </Text>        
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.detailTitleLabels}>Climate:  </Text>
          <Text style={styles.detailLabels}>
            {planetSelected.climate.charAt(0).toUpperCase() + planetSelected.climate.slice(1)}
          </Text>
          <Text style={styles.detailTitleLabels}>Population:  </Text>
          <Text style={styles.detailLabels}>
            {planetSelected.population.charAt(0).toUpperCase() + planetSelected.population.slice(1)}
          </Text>
          <Text style={styles.detailTitleLabels}>Terrain:  </Text>
          <Text style={styles.detailLabels}>
            {planetSelected.terrain.charAt(0).toUpperCase() + planetSelected.terrain.slice(1)}
          </Text>
          {planetSelected.terrain.toUpperCase().includes("DESSERT") || planetSelected.terrain.toUpperCase().includes("DESERT") ? 
            <Text style={styles.paragraph}>
              "I don't like sand. It's coarse and rough and irritating and it gets everywhere."
            </Text>
          : <></> }
        </View>
        <View style={styles.subContainer}>
          <Image style={styles.logo} source={require('../assets/death-star-clip.png')} />
        </View>
        <View style={styles.subContainer}>
          <Button 
            style= {styles.goBack} 
            onPress={this.goBack.bind(this)}
            title = 'Return to Home'
          />
        </View>
      </View>
    );
  }

  //Navigate back to MainScreen page
  goBack() {
    this.props.navigation.navigate('Main');
  }

}

//CSS for PlanetDetails.js
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  headQuestion: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paragraph: {

    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailTitleLabels: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  detailLabels: {
    fontSize: 18
  },
  logo: {
    height: 128,
    width: 128,
  },
  goBack: {
    backgroundColor: '#fd700'
  }
});
