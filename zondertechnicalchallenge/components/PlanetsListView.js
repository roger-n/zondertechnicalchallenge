import * as React from 'react';
import { Text, View, StyleSheet, Image, ListView, TouchableHighlight, TouchableOpacity } from 'react-native';

//Dataspirce for ListView
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

//ListView component displaying information and tauchable elements
export default class PlanetsListView extends React.Component {

  //Constructor sets initial fetching link and data source/target list
  constructor(props) {
    super(props);
    this.state = {
      planetsList: [],
      planetsDataSource: ds,
      morePlanetsLink: 'https://swapi.co/api/planets/',
    }
  }

  //Method call to get planets
  componentDidMount() {
    this.fetchPlanets();
  }

  //Get all planets from API, ensure JSON format, and populate the list
  //Gets planets from one page, checks if next page is null, if not, fetch from next page
  //Passes list to data source when finished
  fetchPlanets() {
    if (this.state.morePlanetsLink === null) {
      this.addPlanetsToDS();
    } else {
      fetch(this.state.morePlanetsLink)
        .then((response) => response.json())
        .then((response) => {
          let newPlanetsList = this.state.planetsList.concat(response.results);
          this.setState({
            planetsList: newPlanetsList,
            morePlanetsLink: response.next
            }, () => {
              this.fetchPlanets();
            })
      });
    }
  }

  //Send list to data source and sort the list by easiness of a target
  //Sort method call sorts low to high, so then reverse the list
  addPlanetsToDS() {
    this.setState({
      planetsDataSource: this.state.planetsDataSource.cloneWithRows(this.state.planetsList)
    });
    this.state.planetsList.sort((elem1, elem2) => this.compare(elem1, elem2)).reverse();
    //Debugging sort
    // this.state.planetsList.forEach((planet) => {
    //   console.log(planet)
    // })
  }

  //Compare two planets in terms of "easiness" to destroy
  //Larger diameter means more easy of a target
  //If both are the same or unknown, compare by population
  compare (planet1, planet2) {
    
    if (planet1.diameter == planet2.diameter) {
      return this.compareByPopulation(planet1, planet2);
    } else if (planet1.diameter != "unknown" && planet2.diameter == "unknown") {
      return 1;
    } else if (planet1.diameter == "unknown" && planet2.diameter != "unknown") {
      return -1;
    } 
    
    if (parseInt(planet1.diameter) > parseInt(planet2.diameter)) {
      return 1;
    } else {
      return -1;
    }
  }

  //Compare by population
  //Larger population means easier target
  //If both populations are equal, planets are equal in easiness
  compareByPopulation(planet1, planet2) {
    if (planet1.population == planet2.population) {
      return 0;
    }

    if (planet1.population == "unknown") {
      return -1;
    } else if (planet2.population == "unknown") {
      return 1;
    }

    if (planet1.population > planet2.population) {
      return 1;
    } else {
      return -1;
    }
  }

  //Individual touchable rows in [ Name (Population: population) ] format
  //Calls method when tapped
  renderRow(planet) {
    return (
      <TouchableOpacity onPress={() => {this.onListElementTap(planet)}}>
        <View style={styles.listRow}>
            <Text style={styles.rowText}>
              <Text style={{fontWeight: "bold"}}>{planet.name}  </Text>
              <Text>
                (Diameter: {(planet.diameter == "unknown") ? "Unknown" : (planet.diameter) + " Kilometers"})
              </Text>
            </Text>
        </View>
      </TouchableOpacity>
    )
  }

  //Called when tapped, navigates to details
  onListElementTap(planet) {
    this.props.handler(planet)
  }

  //Return the interactable listView based on the data source
  render() {
    return (
        <ListView
          dataSource={this.state.planetsDataSource}
          renderRow={this.renderRow.bind(this)}
        />

    );
  }
}

//CSS used in PlanetsListView.js
const styles = StyleSheet.create({
    listRow: {
        flexDirection:'row',
        justifyContent:'center',
        padding:15,
        backgroundColor: '#f4f4f4',
        underlayColor: '#FF0000',
        marginBottom:3
    },
    rowText: {
        flex:1
    },
});
