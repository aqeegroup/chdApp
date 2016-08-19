'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  Animated,
  AlertIOS,
  Dimensions,

} from 'react-native';

import Button from 'apsl-react-native-button';
import Modalbox from 'react-native-modalbox';
import { connect } from 'react-redux';

import { findBindUsers } from '../helper';
import Chd from '../lib/ChdApp';

const MAX_BIND = 100;

class BindModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      xuehao: '201526020202',
      password: '94.verycool',
      buttonText: '绑定',
      isDisabled: false,
      isLoading: false,
    }
  }

  render() {
    const { isOpen } = this.props;
    // console.log(isOpen, 'renderModal');
    return (
      <Modalbox isOpen={isOpen} backdrop={true} style={styles.bindModal} onClosed={this.hide.bind(this)} ref='modal'>
          <View style={styles.content}>
            <View style={styles.bindModalForm} keyboardShouldPersistTaps={false}>
              <Text style={styles.formTitle}>绑定信息门户账号</Text>
              <TextInput 
                style={styles.input}
                placeholder={'请输入学号'}
                // autoFocus={true}
                keyboardType='numeric'
                maxLength={12}
                onChangeText={(text) => this.setState({xuehao: text})}
                onSubmitEditing={() => this.focusNextField('password')}
                value={this.state.xuehao}
                ref='xuehao'/>
              <TextInput 
                style={styles.input}
                placeholder={'请输入密码'}
                selectTextOnFocus={true}
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
                value={this.state.password}
                ref='password'/>
              <Button
                style={styles.formButton}
                textStyle={styles.buttonText}
                onPress={() => this.submit()}
                isDisabled={this.state.isDisabled}
                isLoading={this.state.isLoading}
                ref='submit'>
                {this.state.buttonText}
              </Button>
              <Text style={styles.notice}>↓下拉可关闭↓</Text>

            </View>
          </View>

      </Modalbox>
    );
  }
  
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  submit() {
    let re = /20\d{10}/;
    if (! re.test(this.state.xuehao)) {
      AlertIOS.alert(
        '绑定',
        '学号 ' + this.state.xuehao + ' 格式有误',
        [
          {text: '确认'}
        ]
      );
      return;
    }
    const { actions } = this.props;
    // actions.loading(true);
    this.setState({buttonText: '绑定中...', isDisabled: true});
    // 设置账号密码
    Chd.setAccount(this.state.xuehao, this.state.password);

    let login = Chd.login(data => {
      console.log(data);
      if (data.code == '200') {
        this.setState({buttonText: '绑定成功', isDisabled: false});
        // let temp = parseInt(1000000 * Math.random()).toString();
        let user = {
          xuehao: this.state.xuehao,
          password: this.state.password,
          name: data.name,
        };
        actions.appendUser(user);
        actions.hideModal();
        // actions.loading(false);
      } else {
        AlertIOS.alert(
          '绑定',
          '账号或密码错误',
          [
            {text: '确认'}
          ]
        );
        this.setState({buttonText: '绑定', isDisabled: false});
      }
      
    });
    /*this.checkUser((result) => {
      // 先检查绑定个数 - 先不做这个了 - 仅支持绑定一个学号
      findBindUsers((ret) => {
        if (ret.length > MAX_BIND) {
          AlertIOS.alert(
            '绑定',
            '已绑定'+ MAX_BIND +'个账号',
            [
              {text: '确认'}
            ]
          );
          this.setState({buttonText: '绑定', isDisabled: false});
          actions.hideModal();
          return;
        }
        let chd = new Chd(this.state.xuehao, this.state.password);
        // 做账号密码验证，获取部分用户数据
        let login = chd.login(data => {
          console.log(data);
          if (data.code == '200') {
            this.setState({buttonText: '绑定成功', isDisabled: false});
            // let temp = parseInt(1000000 * Math.random()).toString();
            let user = {
              xuehao: this.state.xuehao,
              password: this.state.password,
              name: data.name,
            };
            actions.appendUser(user);
            actions.hideModal();
            // actions.loading(false);
            return ;
          } else {
            AlertIOS.alert(
              '绑定',
              '账号或密码错误',
              [
                {text: '确认'}
              ]
            );
            this.setState({buttonText: '绑定', isDisabled: false});
            return;
          }
          
        });
        
      });
    });*/

  }

  show() {
    const { actions } = this.props;
    actions.showModal();
  }
  hide() {
    const { actions } = this.props;
    actions.hideModal();
  }

}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    isOpen: state.app.isOpen
  };
}
export default connect(mapStateToProps)(BindModal);

var styles = StyleSheet.create({
  bindModal: {
    // marginTop: 300,
  },

  content: {
    backgroundColor: '#5ACCB2',
    flex: 1,
  },

  bindModalForm: {
    paddingLeft: 50,
    paddingRight: 50,
    flex: 1,
  },
  formTitle: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 50,
    marginBottom: 50,
    color: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    color: '#fff',
  },
  formButton: {
    height: 40,
    marginTop: 4,
    padding:12,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 0,
  },
  buttonText: {
    color: '#5ACCB2',
    fontSize: 16,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 6,
    fontSize: 14,
    marginTop: 30,
    color: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 4,
  },
  notice: {
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 30,
    color: '#fff',
  },

});