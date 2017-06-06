import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View, 
  Navigator, 
  TouchableHighlight,
  TouchableOpacity,
  BackAndroid
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import SQLite from './sqlite_tools'; 

var sqLite = new SQLite();  
var db;  


export default class ListComponent extends Component{
	constructor(props) {
	  	super(props);
            this.handleBack = this.handleBack.bind(this);

	  	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	      this.state = {
	        dataSource: ds.cloneWithRows([])
	      };
	  }
        compennetDidUnmount(){  
          sqLite.close();  

          BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
        }
        componentWillMount(){
          //开启数据库  
          if(!db){  
            db = sqLite.open();  
          } 
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
          var list  = []
          db.transaction((tx)=>{  
          tx.executeSql("select id,title from content where type_id = ?", [this.props.route.list_id],(tx,results)=>{  
                      var len = results.rows.length;  
                      for(let i=0; i<len; i++){  
                        var t = results.rows.item(i);  
                        list.push({
                          id:t.id,
                          title:t.title
                        })
                      } 
                      this.setState({
                        dataSource: ds.cloneWithRows(list)
                      }) 
                    }); 
              },(error)=>{//打印异常信息  
                alert('xxx')
                console.log(error);  
              });  

          BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
        }  

	  _renderRow(rowData, sectionID, rowID, highlightRow){
	  	  var _navigator = this.props.navigator
	  	  return (<TouchableOpacity onPress={ () => _navigator.push({content_id:rowData.id,content_title:rowData.title,id:'content'}) }  style={ styles.button }>
                                <View style={styles.innerViewStyle}>
                                    <Text style={styles.textStyle}>{rowData.title}</Text>
                                </View>
					</TouchableOpacity>)
	  }
	  render() {
	    return (
                        <View>
                           <NavigationBar
                              title={{title:this.props.route.title}}
                              />
                           <ListView
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}
                            />
                        </View>
	    );
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textStyle:{
    lineHeight:45,
    fontSize:18
  },
  innerViewStyle:{  
    borderColor:'#666',
    borderWidth:0.2,
    // 文字内容居中对齐 
    alignItems:'flex-start' ,
    justifyContent: 'center'
  },  
});