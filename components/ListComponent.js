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

import Icon from 'react-native-vector-icons/FontAwesome';

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
	  	  return (<Item id={rowData.id} title={rowData.title} save={rowData.save} />)
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

class Item extends Component{
  constructor(props) {
    super(props);
    this.setState({
      heart:this.props.save
    })
    this.saveItem=this.saveItem.bind(this)      
  }
  toggleSaveItem(){
    let saveValue=this.state.heart==0?1:0
    this.setState({
      heart:saveValue
    })
    db.transaction((tx)=>{  
      tx.executeSql("update content set save =  ? where id = ?", [saveValue,this.props.id],(tx,results)=>{  
              console.log('update success')
            }); 
      },(error)=>{//打印异常信息  
        alert('xxx')
        console.log(error);  
      });  
  }
  render(){
    var _navigator = this.props.navigator
    return (<TouchableOpacity onPress={ () => _navigator.push({content_id:this.props.id,content_title:this.props.title,id:'content'}) }  style={ styles.button }>
                            <View style={styles.innerViewStyle}>
                                <Text style={styles.textStyle}>{this.props.title}</Text>
                                <Icon onPress={this.toggleSaveItem} name={this.state.heart==0?'heart-o':'heart'} size={10} color="#900" />
                            </View>
      </TouchableOpacity>)
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