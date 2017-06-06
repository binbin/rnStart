import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View, 
  Navigator, 
  TouchableHighlight,
  WebView,
  BackAndroid 
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import HTMLView from 'react-native-htmlview';

import SQLite from './sqlite_tools'; 
var sqLite = new SQLite();  
var db;  




export default class ContentComponent extends Component{
	constructor(props) {
	    super(props);
                this.handleBack = this.handleBack.bind(this);

                //开启数据库  
         	 if(!db){  
         	    db = sqLite.open();  
         	  } 
  
         	  this.state={
                	loaded:false
               }

         	  db.transaction((tx)=>{  
         		 tx.executeSql("select content from content where id = ?", [this.props.route.content_id],(tx,results)=>{  
         		 this.setState({
         		 	loaded:true,
         		 	c:results.rows.item(0).content
         		 	// c:'<p style="text-indent: 2em;">目前，国家不断深化教育、文化、医药卫生、社会保障、住房保障等领域改革，构建基本民生保障服务体系。</p>'
         		 })
         	        }); 
         	  },(error)=>{//打印异常信息  
         	    console.log(error);  
         	  });  

              
            }
            compennetDidUnmount(){  
	  sqLite.close();  
	  BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
	}
	componentWillMount(){


	  BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
	}  	
	render() {
		return this.state.loaded?(<View>
                           <NavigationBar
                              title={{title:'内容详情'}}
                              />
                           <View style={{height: '100%'}}>
                           	   <WebView
	                               javaScriptEnabled={false}
			        source={{
			        		html: this.state.c
			    	}}
			         style={styles.webView}
			      />
                           </View>
                        </View>):null
	}

	handleBack(){
	  var navigator = this.props.navigator;
	  if (navigator && navigator.getCurrentRoutes().length > 1) {
	    navigator.pop();
	    return true;
	  }else{
	    return false;
	  }
	}
}

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  webView:{
  	height: 350
  }
  
});