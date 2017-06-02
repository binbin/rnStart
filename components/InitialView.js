


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

import NavigationBar from 'react-native-navbar';




// 获取屏幕宽度  
var Dimensions = require('Dimensions');  
const screenW = Dimensions.get('window').width;  

// 导入json数据  
var action = require('./action.json');  
  
// 常量设置  
const cols = 2;  
// const cellWH = 100;  
const cellWH = screenW / 2 -1

const vMargin = (screenW - cellWH * cols) / (cols + 1);  
const hMargin = 25;  

import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="commenting-o" size={30} color="#900" />)


import SQLite from './SQLite'; 

var sqLite = new SQLite();  
var db;  
export default class InitialView extends Component{
	compennetDidUnmount(){  
	sqLite.close();  
	}  
	componentWillMount(){  
	//开启数据库  
	if(!db){  
	  db = sqLite.open();  
	}  
	//建表  
	sqLite.createTable();  
	//删除数据  
	sqLite.deleteData();  
	//模拟一条数据  
	var userData = [];  
	var user = {};  
	user.name = "张三";  
	user.age = "28";  
	user.sex = "男";  
	user.phone = "18900001111";  
	user.email = "2343242@qq.com";  
	user.qq = "111222";  
	userData.push(user);  
	//插入数据  
	sqLite.insertUserData(userData);  
	//查询  
	db.transaction((tx)=>{  
	  tx.executeSql("select * from user", [],(tx,results)=>{  
	    var len = results.rows.length;  
	    for(let i=0; i<len; i++){  
	      var u = results.rows.item(i);  
	      //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
	      alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);  
	    }  
	  });  
	},(error)=>{//打印异常信息  
	  console.log(error);  
	});  
	}  
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
	this.state = {
	  dataSource: ds.cloneWithRows(action),
	}
	}
	render(){
		return(  
			<View>
			 <NavigationBar
					title={titleConfig}
					rightButton={rightButtonConfig}
				  />
			<ListView  
				dataSource={this.state.dataSource}  
				renderRow={this.renderRow.bind(this)}  
				contentContainerStyle={styles.listViewStyle}  
			/>  
			</View>
			
		)
	}
	renderRow(rowData){  
		var _navigator = this.props.navigator
		return(<TouchableOpacity activeOpacity={0.8} onPress={ () => _navigator.push({title:rowData.title,id:'list',action:rowData.action}) }  >  
				<View style={styles.innerViewStyle}>  
					<Icon name={rowData.icon} size={40} color="#900" />
					 
					<Text>{rowData.title}</Text>  
					
				</View>  
			</TouchableOpacity>  
		);  
	}
}

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};

const titleConfig = {
  title: '首页',
};


const styles = StyleSheet.create({  
	listViewStyle:{  
		// 主轴方向  
		flexDirection:'row',  
		// 一行显示不下,换一行  
		flexWrap:'wrap',  
		// 侧轴方向  
		alignItems:'center'// 必须设置,否则换行不起作用  
	},  
  
	innerViewStyle:{  
		width:cellWH,  
		height:cellWH,  
		// marginLeft:vMargin,  
		// marginTop:hMargin,  
		 
		
		borderColor:'#666',
		borderWidth:0.2,
		// 文字内容居中对齐 
		alignItems:'center' ,
		justifyContent: 'center'
	},  
  
	iconStyle:{  
		width:screenW-20,  
		height:80,  
	},  
  
}); 

