import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View, 
  Navigator, 
  TouchableHighlight,
  WebView 
} from 'react-native';

export default class ContentComponent extends Component{
	render() {
	    return (
	      <WebView
	        source={{html: '<div class="w980 p2j_list clearfix"><h3>&nbsp;&nbsp;</h3><h2>今日谈：落实是最好的答复</h2><h4></h4><p class="tc">张志锋</p><h5>2015年03月21日08:51&nbsp;&nbsp;&nbsp;来源：<a href="http://paper.people.com.cn/rmrb/html/2015-03/21/nw.D110000renmrb_20150321_9-01.htm" target="_blank">人民网－人民日报</a></h5><div class="text_show"><p class="tc"></p><p></p><p>　　近日，有一位老人反映，由于当年是合同工，企业破产后养老待遇没着落，多次到有关部门反映情况。接访的干部态度挺好，但只是停留在解释上。这让老人很是失望。</p><p>　　处理群众反映的问题，最考验干部作风和履职能力。一些接访单位和工作人员由于长期面对棘手问题，慢慢变“油”了，常常拿惯用的“三板斧”打发群众：政策是什么；我们做了什么；问题目前不能解决、条件成熟可以考虑。说的都不是假话，但程式化的回复背后是敷衍的态度、浮漂的作风，难免让面对面的群众“很受伤”。</p><p>　　其实，有些问题解决起来比较复杂，群众也并非不能理解。但有关部门至少要到实地把一把脉，和群众一起想办法，一时解决不了的，也尽量给出解决的时间表，或者指出解决问题的方向，让群众心里有数、看到希望。说到底，落实才是最好的答复。</p><br><p><span id="paper_num">　　《 人民日报 》（ 2015年03月21日 01 版）</span></p></div></div>'}}
	        style={{marginTop: 20}}
	      />
	    );
	  }
}