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

export default class ListComponent extends Component{
	constructor(props) {
	  	super(props);
            this.handleBack = this.handleBack.bind(this);

	  	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      dataSource: ds.cloneWithRows([{title:'今日谈：落实是最好的答复'}, {title:'今日谈：“带回去研究”得有下文'}]),
	    };
	  }
	  _renderRow(rowData, sectionID, rowID, highlightRow){
	  	  var _navigator = this.props.navigator
	  	  return (<TouchableOpacity onPress={ () => _navigator.push({title:'Http',id:'content'}) }  style={ styles.button }>
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
      componentWillMount() {
        // var lists = require('./data/'+this.props.route.action+'.json'); 
        // alert(lists) 
        // alert(this.props.route.action)
      }
      componentDidMount () {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
      }
      componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
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