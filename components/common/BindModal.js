'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,

} from 'react-native';

import Button from 'react-native-button';
import Modalbox from 'react-native-modalbox';

export default class BindModal extends Component {

  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      xuehao: '',
      password: '',
      code: '',
    };
  }

  render() {

    return (
      <Modalbox isOpen={false} backdrop={false} style={styles.bindModal} ref='modal'>
        <Button style={styles.bindModalClose} onPress={this.hide.bind(this)}>关闭</Button>
        <View style={styles.bindModalForm}>
          <Text style={styles.formTitle}>绑定信息门户账号</Text>
          <TextInput 
            style={styles.default}
            placeholder={'请输入学号'}
            onChangeText={(text) => this.setState({xuehao: text})}
            onSubmitEditing={() => this.focusNextField('password')}
            ref='xuehao'/>
          <TextInput 
            style={styles.default}
            placeholder={'请输入密码'}
            selectTextOnFocus={true}
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            ref='password'/>
          <Button
            style={styles.formButton}
            onPress={() => this.submit()}
            ref='submit'>
            绑定
          </Button>
        </View>
      </Modalbox>
    );
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  submit() {
    console.log(this.state.xuehao, this.state.password);
  }
  show() {
    this.refs.modal.open()
  }
  hide() {
    this.refs.modal.close()
  }
}

var styles = StyleSheet.create({

  bindModalClose: {
    marginTop: 20,
    marginRight: 20,
    flexDirection:'row',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#9B9B9B',
    padding: 6,
    fontWeight: 'normal',
    fontSize: 14,
    borderRadius: 3,
    color: '#9B9B9B',
  },

  bindModalForm: {
    flex: 1,
    padding: 50,
  },

  formTitle: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },

  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    fontSize: 14,
    marginTop: 4,
  },

  formButton: {
    marginTop: 4,
    padding:6,
    fontSize: 14,
    backgroundColor: '#5ACCB2',
    color: '#fff',
  }

});