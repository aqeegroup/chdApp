'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  ListView,

} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import Swipeout from 'react-native-swipeout';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class BindList extends Component {

  constructor(props){
    super(props);
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.loadBindList();
  }

  render() {
    var swipeoutBtns = [];
    var items = [];
    const { currentUser, bindUsers } = this.props;
    if (! bindUsers) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.loading}>loading...</Text>
        </ScrollView>);
    }
    // if (bindUsers && currentUser) {
    if (bindUsers) {
      for (var i = 0, len = bindUsers.length; i < len; i++) {
        var isCurrentUser = (bindUsers[i].xuehao == currentUser.xuehao);
        // var isCurrentUser = false;
        // 左划菜单
        swipeoutBtns = [
          {
            text: '删除',
            backgroundColor: '#ff5d7c',
            onPress: this.deleteUser.bind(this, bindUsers[i]),
          }
        ];
        if (isCurrentUser) {
          swipeoutBtns = undefined;
        }
        // Swipeout autoClose={true}
        items.push(
          <View style={{marginTop: 4}} key={'bindItem' + i}>
            <Swipeout right={swipeoutBtns} close={true}>
              <View style={[styles.item, styles.row]}>
                <View style={styles.bindLeft}>
                  <View>
                    <Text style={{color: '#333333'}}>{bindUsers[i].name}</Text>       
                  </View>
                  <View>
                    <Text style={{color: '#9B9B9B'}}>{bindUsers[i].xuehao}</Text>         
                  </View>
                </View>
                <View style={styles.bindRight}>
                  {
                    isCurrentUser
                    ? <Text style={styles.bindRightDefault}>默认</Text> 
                    : <Button style={styles.bindRightSetDefault}
                      onPress={this.setCurrentUser.bind(this, bindUsers[i])}>设为默认</Button>
                  }
                </View>
              </View>
            </Swipeout>
          </View>
        );
      }
    }
    return (
      <ScrollView style={styles.container}>
        {items.length > 0 ? items : <Text style={styles.none}>木有绑定任何东西哦~o(╯□╰)o</Text>}
      </ScrollView>
    );
  }

  setCurrentUser(user) {
    const { actions } = this.props;
    actions.setCurrentUser(user);
  }

  deleteUser(user) {
    AlertIOS.alert(
      '绑定列表',
      '确认删除 ' + user.name + ' 吗',
      [
        {text: '确认', onPress: () => {
          const { actions } = this.props;
          actions.deleteUser(user);
        }},
        {text: '取消', onPress: () => {}},
      ]
    );
  }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    currentUser: state.app.currentUser,
    bindUsers: state.app.bindUsers,
  };
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps)(BindList)

var styles = StyleSheet.create({
  container: {
    backgroundColor:'#e7e8eb',
  },
  row:{
    flexDirection:'row',
  },
  // 绑定列表
  item:{
    backgroundColor:'#fff',
    flex: 1,
    height: 50,
    padding: 10,
    paddingLeft: 20,
    // marginTop: 4,
  },
  bindLeft: {
    justifyContent: 'center',
  },
  bindRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  bindRightDefault: {
    color: '#5ACCB2',
  },
  bindRightSetDefault: {
    color: '#9B9B9B',
    borderColor: '#9B9B9B',
    borderWidth: 0.5,
    borderRadius: 13,
    flex: 1,
    padding: 6,
    fontWeight: 'normal',
    fontSize: 14,
    justifyContent: 'center',
  },

  loading: {
    height: 40,
    alignSelf: 'center',
    color: '#555',
    marginTop: 80,
  },
  none: {
    height: 60,
    alignSelf: 'center',
    color: '#ccc',
    marginTop: 80,
  }
});
