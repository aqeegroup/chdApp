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
      <Modalbox isOpen={false} backdrop={true} style={styles.bindModal} ref='modal'>
        <View style={styles.content}>
          <View style={styles.bindModalForm}>
            <Text style={styles.formTitle}>绑定信息门户账号</Text>
            <TextInput 
              style={styles.input}
              placeholder={'请输入学号'}
              onChangeText={(text) => this.setState({xuehao: text})}
              onSubmitEditing={() => this.focusNextField('password')}
              ref='xuehao'/>
            <TextInput 
              style={styles.input}
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
  bindModal: {
    marginTop: 300,
  },

  content: {
    backgroundColor: '#5ACCB2',
    flex: 1,
  },

  bindModalForm: {
    paddingLeft: 50,
    paddingRight: 50,
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
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#5ACCB2',
    flex: 1,
  }

});