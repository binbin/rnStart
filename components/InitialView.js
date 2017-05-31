


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
var shareData = require('./shareData.json');  
  
// 常量设置  
const cols = 2;  
// const cellWH = 100;  
const cellWH = screenW / 2 -1

const vMargin = (screenW - cellWH * cols) / (cols + 1);  
const hMargin = 25;  

import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="commenting-o" size={30} color="#900" />)




export default class InitialView extends Component{
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
	this.state = {
	  dataSource: ds.cloneWithRows(shareData),
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
		return(<TouchableOpacity activeOpacity={0.8} onPress={()=>{AlertIOS.alert('点击了')}} >  
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
  title: '公考致胜法宝',
};


const styles = StyleSheet.create({  
	listViewStyle:{  
		// 主轴方向  
		flexDirection:'row',  
		// 一行显示不下,换一行  
		flexWrap:'wrap',  
		// 侧轴方向  
		alignItems:'center', // 必须设置,否则换行不起作用  
		borderWidth:1 
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

