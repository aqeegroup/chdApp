'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  ScrollView,

} from 'react-native';

export default class Schedule extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>课表</Text>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor:'#e7e8eb',
    flex: 1,
    
  },
  navigator: {
    flex: 1,
  },
  item:{
    backgroundColor:'#fff',
    borderColor:'#ccc',
    borderBottomWidth: 1,
    flex: 1,
    height: 40,
  },
  row:{
    flexDirection:'row',
    flex: 1,
  },
  'currentUser': {
    backgroundColor:'#fff',
    borderColor:'#e7e7eb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    height: 50,
  },
});
