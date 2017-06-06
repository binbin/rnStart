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

import ListComponent from './components/ListComponent'
import ContentComponent from './components/ContentComponent'


import InitialView from './components/InitialView'





var _navigator;

var firstClick = 0;
export default class rnStart extends Component{
	constructor(props) {
		super(props);
            this.handleBack = this.handleBack.bind(this);
	}
	render(){
		return (<Navigator
                            style={styles.navigator}
                            renderScene={this.renderScene.bind(this)}
                            initialRoute={{ title: 'Main', id:'main'}}
                          />
                        );
	}
	renderScene(route, navigator) {    
            _navigator = navigator
            if(route.id === 'main'){
                return (
                  <InitialView navigator={navigator} route={route} />
                 );
            }else if(route.id === 'list'){
                return (
                  <ListComponent navigator={navigator} route={route}  />
                 );
            }else if(route.id === 'content'){
              return (
                <ContentComponent navigator={navigator} route={route}  />
              );
            }  
      }
      componentDidMount () {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
      }
      componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
      }
      handleBack(){
        var navigator = _navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
        }else{
          var timestamp = (new Date()).valueOf();
          if(timestamp-firstClick>2000){
            firstClick = timestamp;
      //       GSUtil.showToast('再按一次退出');
            return true;
          }else{
            return false;
          }
        }
      }
}
const styles = StyleSheet.create({
  navigator:{}
})


AppRegistry.registerComponent('rnStart', () => rnStart);






