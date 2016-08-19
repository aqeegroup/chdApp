'use strict';

import storage from './components/Storage';

export function findCurrentUser(callback) {
  storage.load({
    key: 'currentUser',
  }).then(
  currentUser => {
    callback(currentUser);
  }).catch(err => {
    console.log(err);
    callback(undefined);
  });
}

export function findToken(xuehao, callback) {
  storage.load({
    key: 'token' + xuehao,
  }).then(
  token => {
    callback(token);
  }).catch(err => {
    console.log(err);
    callback(undefined);
  });
}

export function findBindUsers(callback) {
  storage.getAllDataForKey('bindUsers').then(ret => {
    console.log(ret);
    callback(ret);
  });
}