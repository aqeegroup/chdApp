'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,

} from 'react-native';
import { connect } from 'react-redux';

// import BindList from './BindList';
import UserDetail from './UserDetail';


var rightIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACY0lEQVR4Xu2ZQU7CQBSG3wtEYCU30BvIDaQbkrLSDbATTiCeQG+gnkDcARtYtQkb8ATiEbwBrkACjpmGJiTSyiTTNy/tsJ7Q/t/7/5n3pggZ/2HG9YMFYB2QcQI2Ahk3gN0EbQRsBDJOgDQCQ99vQy43b9Rqcy7cyQAMPO8KEEcgxALzeYcLBBIAw8mkIjabKSCWg8ozgpA4gD/iQ+8zgZA8AN9vC4CXqMwjQKfhuj1Te0LiAKSwwAXb7QwATg8JNQmBBABnCGQAuEIgBRBC+Nlsxoh4digOAqDXct0O1Z5ADkAKG02n5e/VaoYAF6YhGAHACYIxAMdCKBSLd9eOs0gqEkYBhBDWy+UYEC8PihRiflIqOUlBMA4gFD3wfdkM3VBDYANACjcBgRWAYyBgPt/ROUmyA7CD8AAA9xFx0DpOswQQNExxQ5TGSZItACoIrAFICH3fn0d1jDqmSNYA4k4FHeIlYLYAKMSzBdD3vCdEvI1of1+brtvW1Rqzc0Ds7g+gVTw7B1CLZwXgn3P/rVmvV3XZfv9/WEQg8upcfkIA+CgUi9XUToMmxRuPQKx4IT4LpVIlqcqHMTAWgd294DsCnB/I9hfmclWdU1/U/mEEgBS/Xi7lt8KKSfFGIsBJvBEAA8+bRd3/6ervVY5L0ghQ9fcsAXAUTxaBuC5PCPHcqte7KlXTuZYsAhEO0D7cqMIhAxDc7nheFxEfdy9pXDxZBParEsRBiHZSww1rB6i+HMV60ghQCFJ9hgWgSixt660D0lZRVT3WAarE0rbeOiBtFVXVYx2gSixt660D0lZRVT2/HgUvUOK5KAsAAAAASUVORK5CYII=';

class CurrentUser extends Component {
  /*constructor(props){
    super(props);
  }*/
  /*componentDidMount() {
    const { actions } = this.props;
    actions.setCurrentUser()
  }*/

  render() {
    const { currentUser } = this.props;
    console.log('currentUser', currentUser);
    return (
      <TouchableOpacity 
        style={[styles.currentUser, styles.row]}
        onPress={currentUser ? this.detail.bind(this) : this._showBindModal.bind(this)}>
        <View style={styles.currentUserLeft}>
          <View>
            {
              currentUser
              ? <Text>{currentUser.name} - {currentUser.xuehao}</Text>
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

  detail() {
    const { route, navigator, actions } = this.props;
    route.title = '个人信息';
    route.component = UserDetail;
    route.passProps = {
      actions: actions
    };
    navigator.push(route);
  }

  // 多学号绑定 暂缓
  _bindList() {
    // console.log(this.props);
    const { route, navigator, actions } = this.props;
    route.title = '绑定列表';
    route.component = BindList;
    route.rightButtonTitle = '添加';
    route.onRightButtonPress = () => {
      this._showBindModal();
    };
    route.passProps = {
      actions: actions
    };
    // console.log(route);
    navigator.push(route);
  }

  callSetState(state) {
    this.setState(state);
  }

  _showBindModal() {
    const { actions } = this.props;
    actions.showModal();
  }

  _bind() {
    let user = {
      name: '哈哈',
      xuehao: Math.random(),
      mima: '123456',
    };
    storage.save({
      key: 'bindUsers',  // 注意:请不要在key中使用_下划线符号!
      id: user.xuehao,
      rawData: user,
      expires: null
    });
    if (! this.state.currentUser) {
      storage.save({
        key: 'currentUser',  // 注意:请不要在key中使用_下划线符号!
        rawData: user,
        expires: null   
      });
    }
  }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    currentUser: state.app.currentUser
  };
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps)(CurrentUser)

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
});