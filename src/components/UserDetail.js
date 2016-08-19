'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,

} from 'react-native';
import Button from 'apsl-react-native-button';

import { connect } from 'react-redux';
import Chd from '../lib/Chd';
import CookieManager from 'react-native-cookies';

class UserDetail extends Component {

  componentWillUpdate() {
    const { currentUser, navigator } = this.props;
    if (currentUser) {
      navigator.pop();
    }
  }
  render() {
    const { currentUser } = this.props;
    return (
      currentUser 
        ? (<ScrollView style={styles.container}>
          <View style={styles.list}>
            <View style={[styles.listItem, styles.listLeft]}>
              <Text>姓名</Text>
            </View>
            <View style={[styles.listItem, styles.listRight]}>
              <Text style={styles.listRightName}>{currentUser.name}</Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={[styles.listItem, styles.listLeft]}>
              <Text>学号</Text>
            </View>
            <View style={[styles.listItem, styles.listRight]}>
              <Text style={styles.listRightName}>{currentUser.xuehao}</Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={[styles.listItem, styles.listLeft]}>
              <Text>待添加</Text>
            </View>
            <View style={[styles.listItem, styles.listRight]}>
              <Text style={styles.listRightName}>待添加</Text>
            </View>
          </View>

          <TouchableOpacity onPress={this.logout.bind(this)}>
            <View style={[styles.list, styles.logout]}>
              <View style={[styles.listItem]}>
                <Text style={styles.adding}>解除绑定</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>)
      : 
        (<ScrollView style={styles.container}>
          <Text>loading...</Text>
        </ScrollView>)
    );
  }

  logout() {
    // 清空cookie
    CookieManager.clearAll((err, res) => {
      console.log('cookies cleared!');
    });
    const { actions } = this.props;
    actions.setCurrentUser(undefined);
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor:'#e7e8eb',
    paddingTop: 14,
  },
  'list': {
    backgroundColor:'#fff',
    borderColor:'#e7e8eb',
    borderTopWidth: 1,
    flex: 1,
    height: 40,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection:'row',

  },
  listItem: {
    justifyContent: 'center',
    flex: 1,
  },
  listLeft: {
  },
  listRight: {
    alignItems: 'flex-end',
  },
  listRightName: {
    color: '#aaa',
  },

  // 待添加
  adding: {
    alignSelf: 'center',
  },

  // 接触绑定
  logout: {
    marginTop: 20,
  }
});

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    currentUser: state.app.currentUser
  };
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps)(UserDetail)