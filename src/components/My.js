'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,

} from 'react-native';
import Button from 'react-native-button';

import CurrentUser from './CurrentUser';

export default class My extends Component {
  
  render() {
    return (
      <ScrollView style={styles.containerWithMargin}>
        <Text style={styles.hideText}>被你发现了o(╯□╰)o</Text>
        <CurrentUser {...this.props}/>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  containerWithMargin: {
    marginTop: -60,
    backgroundColor:'#e7e8eb',
  },

  hideText: {
    height: 60,
    alignSelf: 'center',
    color: '#ccc',
  },
});