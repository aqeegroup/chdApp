'use strict';

import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions';

import sign from './sign';

var baseUrl = 'http://218.195.56.182:8080/';
var token = '';
var xuehao = '';
var password = '';
var tokenCache = false;

function setAccount(x, p) {
  xuehao = x;
  password = p;
}

// 登录信息门户
function login(callback) {
  console.log('登录信息门户');
  // let path = 'jwCampus/score/getScore.do';
  let url = baseUrl + 'baseCampus/login/login.do';
  let params = {
    userName: xuehao,//'201541020201',
    password: password,//'cc2015',
    isRemember: true,
    uuId: 'THANK_YOU',
    schoolId: 138,
  };
  postJson(url, params, json => {
    let result = {};
    if (json.msg == '登录成功') {
      result.code = '200';
      result.loginInfo = json;
    } else {
      result.code = '500';
    }
    result.msg = json.msg;
    callback(result);
  });
}

function getScore(token, option, callback) {
  console.log('获取成绩');
  let path = 'jwCampus/score/getScore.do';
  let params = {
    year: '2015-2016',
    xq: 2,
    offset: 1,
    limit: 100,
  };
  let body = sign(params);
  let opt = {
    method: 'POST',
    headers: {
      'Host': '218.195.56.182:8080',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'file://',
      'Connection': 'keep-alive',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 (5600981296)',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
      'Token': token,
      'Accept-Encoding': 'gzip, deflate',
      'Content-Length': body.length.toString(),
    },
    body: body,
  };

  fetch(baseUrl + path, opt)
  .then((response) => {
    return response.json();
  })
  .then(json => {
    // console.log(json);
    /*if (json.totalPages > 1) {
      for (let i = 2; i <= json.totalPages; i++) {
        option.offset = i;
        getScore(token, option, callback);
      }
    }*/
    callback(json);
  });
  
}

function fetchScore(token) {
  let path = 'jwCampus/score/getScore.do';
  let params = {
    year: '2015-2016',
    xq: 2,
    offset: 1,
    limit: 100,
  };
  let body = sign(params);
  let opt = {
    method: 'POST',
    headers: {
      'Host': '218.195.56.182:8080',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'file://',
      'Connection': 'keep-alive',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 (5600981296)',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
      'Token': token,
      'Accept-Encoding': 'gzip, deflate',
      'Content-Length': body.length.toString(),
    },
    body: body,
  };

  fetch(baseUrl + path, opt)
  .then((response) => {
    return response.json();
  })
  .then(json => {
    console.log(json);
    // callback(result);
  });
}

function postJson(url, params, callback, token = '') {
  let body = sign(params);
  let opt = {
    method: 'POST',
    headers: {
      'Host': '218.195.56.182:8080',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'file://',
      'Connection': 'keep-alive',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 (5600981296)',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
      'Token': token,
      'Accept-Encoding': 'gzip, deflate',
      'Content-Length': body.length.toString(),
    },
    body: body,
  };

  fetch(url, opt)
  .then((response) => {
    return response.json();
  })
  .then(json => {
    callback(json);
  });
}

var chd = {
  xuehao,
  password,
  setAccount,
  getScore,
  login,
};
export default chd;