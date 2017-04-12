import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View, 
  Navigator, 
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class ListComponent extends Component{
	constructor(props) {
	  	super(props);
	  	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      dataSource: ds.cloneWithRows([{title:'今日谈：落实是最好的答复'}, {title:'今日谈：“带回去研究”得有下文'}]),
	    };
	  }
	  _renderRow(rowData, sectionID, rowID, highlightRow){
	  	  var _navigator = this.props.navigator
	  	  return (<TouchableOpacity onPress={ () => _navigator.push({title:'Http',id:'content'}) }  style={ styles.button }>
					  <Text>{rowData.title}</Text>
					</TouchableOpacity>)
	  }
	  render() {
	    return (
	      <ListView
	        dataSource={this.state.dataSource}
	        renderRow={this._renderRow.bind(this)}
	      />
	    );
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
});