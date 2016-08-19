'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ListView,


} from 'react-native';
import Button from 'apsl-react-native-button';

import { connect } from 'react-redux';
import Chd from '../lib/ChdApp';
import CookieManager from 'react-native-cookies';

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.updateScore();
  }
  componentDidUpdate() {
    const { currentScore } = this.props;
    if (! currentScore) {
      this.updateScore();
    }
  }

  render() {
    const { currentUser, currentScore, scoreMsg } = this.props;

    if (! currentUser) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.bind}>
            <Text style={styles.font16}>您还未绑定信息门户账号~</Text>
            <TouchableOpacity onPress={this.doBind.bind(this)}>
              <Text style={styles.bindText}>点击绑定</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if (currentScore) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource = ds.cloneWithRows(currentScore);
      console.log(currentScore);
      return (
        <ScrollView style={styles.container}>
          <Text>
            {scoreMsg}
          </Text>

          <ListView
            style={styles.listView}
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <Text>
            {scoreMsg}
          </Text>
        </ScrollView>
      );
    }
  }

  renderRow(rowData) {
    return (
      <View style={styles.list}>
        <View style={styles.tr4}>
          <Text>{rowData.kcmc}</Text>
        </View>
        <View style={styles.tr1}>
          <Text style={styles.textRight}>{rowData.xf}</Text>
        </View>
        <View style={styles.tr1}>
          <Text style={styles.textRight}>{rowData.cj}</Text>
        </View>
      </View>
    );
  }

  updateScore() {
    const { actions, currentUser } = this.props;

    Chd.getScore(currentUser.token, {}, score => {
      console.log(score);
      actions.setCurrentScore(score.list);
    });
  }

  setMsg(msg) {
    const { actions } = this.props;
    actions.setScoreMsg(msg);
  }

  doBind() {
    const { actions } = this.props;
    actions.showModal();
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor:'#e7e8eb',
    flex: 1,
  },
  bind: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 100,
    justifyContent: 'center',

  },
  font16: {
    fontSize: 16,
    color: '#222',
  },
  bindText: {
    marginTop: 18,
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
  },
  listView: {
    flex: 1,
  },
  list: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#e7e8eb',
    borderTopWidth: 1,
    paddingLeft: 20, 
    paddingRight: 20,
  },
  tr1: {
    flex: 1,
    justifyContent: 'center',
  },
  tr2: {
    flex: 2,
    justifyContent: 'center',
  },
  tr4: {
    flex: 4,
    justifyContent: 'center',
  },

  textRight: {
    textAlign: 'right',
  }

})
//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    currentUser: state.app.currentUser,
    currentScore: state.app.currentScore,
    scoreMsg: state.app.scoreMsg,
  };
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps)(Score)