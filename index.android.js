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
  View, 
  Navigator, 
  TouchableHighlight ,
  BackAndroid
} from 'react-native';

import ListComponent from './components/ListComponent'
import ContentComponent from './components/ContentComponent'

var _navigator;



export default class rnStart extends Component {
  constructor(props) {
  	super(props);
  }
  renderScene(route, navigator){
  	_navigator = navigator
  	if(route.id === 'list'){
	    return (
	      <ListComponent navigator={navigator} route={route} />
	     );
	}
	if(route.id==='content'){
		return (<ContentComponent/>)
	}
  }
  render() {
    return (
	     <Navigator
		  initialRoute={{ title: 'Main', id:'list'}}
		  // configureScence={{ configureScence }}
		  renderScene={this.renderScene}
		/>
    );
  }
  componentDidMount() {
 //  	BackAndroid.addEventListener('hardwareBackPress', function() {
	//   if(_navigator == null){
	//     return false;
	//   }
	//   if(_navigator.getCurrentRoutes().length === 1){
	//     return false;
	//   }
	//   _navigator.pop();
	//   return true;
	// });
  }
}






AppRegistry.registerComponent('rnStart', () => rnStart);

