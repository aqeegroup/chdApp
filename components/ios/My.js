'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NavigatorIOS,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  AlertIOS,

} from 'react-native';

import Button from 'react-native-button';
import Swipeout from 'react-native-swipeout';

import Storage from '../common/Storage';

var rightIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACY0lEQVR4Xu2ZQU7CQBSG3wtEYCU30BvIDaQbkrLSDbATTiCeQG+gnkDcARtYtQkb8ATiEbwBrkACjpmGJiTSyiTTNy/tsJ7Q/t/7/5n3pggZ/2HG9YMFYB2QcQI2Ahk3gN0EbQRsBDJOgDQCQ99vQy43b9Rqcy7cyQAMPO8KEEcgxALzeYcLBBIAw8mkIjabKSCWg8ozgpA4gD/iQ+8zgZA8AN9vC4CXqMwjQKfhuj1Te0LiAKSwwAXb7QwATg8JNQmBBABnCGQAuEIgBRBC+Nlsxoh4digOAqDXct0O1Z5ADkAKG02n5e/VaoYAF6YhGAHACYIxAMdCKBSLd9eOs0gqEkYBhBDWy+UYEC8PihRiflIqOUlBMA4gFD3wfdkM3VBDYANACjcBgRWAYyBgPt/ROUmyA7CD8AAA9xFx0DpOswQQNExxQ5TGSZItACoIrAFICH3fn0d1jDqmSNYA4k4FHeIlYLYAKMSzBdD3vCdEvI1of1+brtvW1Rqzc0Ds7g+gVTw7B1CLZwXgn3P/rVmvV3XZfv9/WEQg8upcfkIA+CgUi9XUToMmxRuPQKx4IT4LpVIlqcqHMTAWgd294DsCnB/I9hfmclWdU1/U/mEEgBS/Xi7lt8KKSfFGIsBJvBEAA8+bRd3/6ervVY5L0ghQ9fcsAXAUTxaBuC5PCPHcqte7KlXTuZYsAhEO0D7cqMIhAxDc7nheFxEfdy9pXDxZBParEsRBiHZSww1rB6i+HMV60ghQCFJ9hgWgSixt660D0lZRVT3WAarE0rbeOiBtFVXVYx2gSixt660D0lZRVT2/HgUvUOK5KAsAAAAASUVORK5CYII=';

export default class My extends Component {
  constructor(props){
    super(props);
    this.state = {
      navigator: this.props.navigator,
      route: this.props.route,
      showBindModal: this.props.showBindModal,
    };
    // 清空测试数据
    /*Storage.remove({
      key: 'currentUser'
    });
    Storage.clearMapForKey('bindUsers');*/
  }

  render() {
    return (
      <ScrollView style={styles.containerWithMargin}>
        <Text style={styles.hideText}>被你发现了o(╯□╰)o</Text>

        <CurrentUser {...this.state} />
        <Setting {...this.state} />
        <About {...this.state} />
      </ScrollView>
    );
  }
}

class CurrentUser extends Component {
  constructor(props){
    // console.log(props);
    super(props);
    this.state = {
      currentUser: null,
    };
  }
  componentWillMount() {
    Storage.load({
      key: 'currentUser',
    }).then(ret => {
      console.log(ret);
      this.setState({
        currentUser: ret
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <TouchableOpacity 
        style={[styles.currentUser, styles.row]}
        onPress={this.state.currentUser ? this._bindList.bind(this) : this._showBindModal.bind(this)}>
        <View style={styles.currentUserLeft}>
          <View>
            {
              this.state.currentUser
              ? <Text>{this.state.currentUser.name} - {this.state.currentUser.xuehao}</Text>
              : <Text>点击绑定</Text>
            }
          </View>
        </View>
        <View style={styles.currentUserRight}>
          <Image
            style={styles.rightIcon}
            source={{uri: rightIcon}}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _bindList() {
    let route = this.props.route;
    route.title = '绑定列表';
    route.component = BindList;
    route.rightButtonTitle = '添加';
    // console.log(route);
    route.onRightButtonPress = () => {
      // console.log(this.props);
      this.props.showBindModal();
    };
    route.passProps = {callSetState: this.callSetState.bind(this)};
    this.props.navigator.push(route);
  }

  callSetState(state) {
    this.setState(state);
  }

  _showBindModal() {
    this.props.showBindModal();
  }

  _bind() {
    let user = {
      name: '哈哈',
      xuehao: Math.random(),
      mima: '123456',
    };
    Storage.save({
      key: 'bindUsers',  // 注意:请不要在key中使用_下划线符号!
      id: user.xuehao,
      rawData: user,
      expires: null
    });
    if (! this.state.currentUser) {
      Storage.save({
        key: 'currentUser',  // 注意:请不要在key中使用_下划线符号!
        rawData: user,
        expires: null   
      });
    }
  }
}

class BindList extends Component {

  constructor(props){
    // console.log(props);
    super(props);
    this.state = {};
  }
  componentWillMount() {
    Storage.getAllDataForKey('bindUsers').then(ret => {
      // console.log(ret);
      this.setState({
        bindUsers: ret,
      });
    });

    Storage.load({
      key: 'currentUser',
    }).then(ret => {
      this.setState({
        currentUser: ret
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    var swipeoutBtns = [];
    var items = [];
    if (this.state.bindUsers && this.state.currentUser) {
      for (var i = 0, len = this.state.bindUsers.length; i < len; i++) {
        var isCurrentUser = (this.state.bindUsers[i].xuehao == this.state.currentUser.xuehao);
        // 左划菜单
        swipeoutBtns = [
          {
            text: '删除',
            backgroundColor: '#ff5d7c',
            onPress: this._deleteUser.bind(this, this.state.bindUsers[i]),
          }
        ];
        if (isCurrentUser) {
          swipeoutBtns = [];
        }
        items.push(
          <View style={{marginTop: 4}} key={'bindItem' + i}>
            <Swipeout right={swipeoutBtns} autoClose={true}>
              <View style={[styles.item, styles.row]}>
                <View style={styles.bindLeft}>
                  <View>
                      <Text style={{color: '#333333'}}>{this.state.bindUsers[i].name}</Text>       
                  </View>
                  <View>
                      <Text style={{color: '#9B9B9B'}}>{this.state.bindUsers[i].xuehao}</Text>         
                  </View>
                </View>
                <View style={styles.bindRight}>
                  {
                    isCurrentUser
                    ? <Text style={styles.bindRightDefault}>默认</Text> 
                    : <Button style={styles.bindRightSetDefault}
                      onPress={this._setCurrentUser.bind(this, this.state.bindUsers[i])}>设为默认</Button>
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
        {items.length > 0 ? items : <Text>loading...</Text>}
      </ScrollView>
    );
  }

  _setCurrentUser(user) {
    Storage.save({
      key: 'currentUser',
      rawData: user,
      expires: null   
    });
    this.setState({
      currentUser: user
    });
    // 回调刷新”我的“页面的数据
    this.props.callSetState({
      currentUser: user
    });
  }

  _deleteUser(user) {
    var confirmDelete = false;
    AlertIOS.alert(
      '绑定列表',
      '确认删除 ' + user.name + ' 吗',
      [
        {text: '确认', onPress: () => {
          Storage.remove({
            key: 'bindUsers',
            id: user.xuehao,
          });
          Storage.getAllDataForKey('bindUsers').then(ret => {
            this.setState({
              bindUsers: ret,
            });
          });
        }},
        {text: '取消', onPress: () => {}},
      ]
    );
  }

}


class Setting extends Component {
  render () {
    return (
      <TouchableOpacity 
        style={[styles.setting, styles.row]}
        onPress={this._setting.bind(this)}>

        <View style={styles.currentUserLeft}>
          <View>
              <Text>设置</Text>
          </View>
        </View>
        <View style={styles.currentUserRight}>
          <Image
            style={styles.rightIcon}
            source={{uri: rightIcon}}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _setting() {
    this.props.navigator.push({
      component: Setting,
      title: '设置',
      barTintColor: '#3D3D3D',
      titleTextColor: '#fff',
      tintColor: '#fff'
    });
  }
}

class About extends Component {
  render () {
    return (
      <TouchableOpacity style={[styles.about, styles.row]}>
        <View style={styles.currentUserLeft}>
          <View>
              <Text>关于</Text>
          </View>
        </View>
        <View style={styles.currentUserRight}>
          <Image
            style={styles.rightIcon}
            source={{uri: rightIcon}}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  containerWithMargin: {
    marginTop: -60,
    backgroundColor:'#e7e8eb',
  },
  container: {
    backgroundColor:'#e7e8eb',
  },
  hideText: {
    height: 60,
    alignSelf: 'center',
    color: '#ccc',
  },
  navigator: {
    flex: 1,
  },
  
  row:{
    flexDirection:'row',
  },
  'currentUser': {
    backgroundColor:'#fff',
    borderColor:'#e7e7eb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    height: 60,
    marginTop: 18,
    padding: 10,
    paddingLeft: 20,
  },
  'currentUserLeft': {
    flex: 15,
    justifyContent: 'center',
  },
  'currentUserRight': {
    flex: 1,
    justifyContent: 'center',
  },
  'rightIcon': {
    height: 16,
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

  // 设置
  'setting': {
    backgroundColor:'#fff',
    borderColor:'#e7e7eb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    height: 40,
    padding: 10,
    paddingLeft: 20,
    marginTop: 30,
    justifyContent: 'center',
  },

  'about': {
    backgroundColor:'#fff',
    borderColor:'#e7e7eb',
    borderBottomWidth: 1,
    flex: 1,
    height: 40,
    padding: 10,
    paddingLeft: 20,
    justifyContent: 'center',
  }
});
