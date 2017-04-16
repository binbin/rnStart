/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  Image,
  View, 
  Navigator, 
  TouchableHighlight ,
  TouchableOpacity,
  BackAndroid,
  AlertIOS
} from 'react-native';




import InitialView from './components/InitialView'







export default class rnStart extends Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (<Navigator
                            style={styles.navigator}
                            renderScene={this.renderScene.bind(this)}
                            initialRoute={{ title: 'Main', id:'list'}}
                          />
                        );
	}
	renderScene(route, navigator) {    
        return (<InitialView navigator={navigator} route={route} />)
      }
}
const styles = StyleSheet.create({
  navigator:{}
})


AppRegistry.registerComponent('rnStart', () => rnStart);






