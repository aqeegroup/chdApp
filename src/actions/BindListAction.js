import storage from '../components/Storage';
import { findCurrentUser, findBindUsers, findToken } from '../helper';

const INITIAL_LIST = 'INITIAL_LIST';
const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
const LOAD_BIND_LIST = 'LOAD_BIND_LIST';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const APPEND_USER = 'APPEND_USER';

const SELECT_TAB = 'SELECT_TAB';
// 摸态框
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
// 加载动画
const LOADING = 'LOADING';

// 获取成绩消息
const SCORE_MSG = 'SCORE_MSG';

export const init = () => {
  return (dispatch) => {
    dispatch({
      type: INITIAL_LIST,
      selectedTab: 'chengji',
      isOpen: false,
      loading: false,
      bindUsers: undefined,
      scoreMsg: '',
    });
    dispatch(loadCurrentUser());
  };
}

export function loadCurrentUser() {
  return (dispatch) => {
    findCurrentUser((currentUser) => {
      // console.log(currentUser);
      dispatch({ type: LOAD_CURRENT_USER, currentUser: currentUser});
    });
  }
}

export const loadBindList = () => {
  return (dispatch) => {

    findBindUsers((ret) => {
      dispatch({ type: LOAD_BIND_LIST , bindUsers: ret});
    }); 
  }
}

export const setCurrentUser = (user) => {

  return (dispatch) => {
    storage.save({
      key: 'currentUser',
      rawData: user,
      expires: null   
    });
    dispatch({
      type: SET_CURRENT_USER,
      currentUser: user,
    });
  }
}

export const setToken = (token, xuehao) => {

  return (dispatch) => {
    storage.save({
      key: 'token' + xuehao,
      rawData: token,
      expires: null   
    });
  }
}

/*export const getToken = (xuehao, callback) => {
  findToken();
}*/

export function appendUser(user) {

  return (dispatch, getState) => {
    const currentState = getState();
    
    storage.save({
      key: 'bindUsers',  // 注意:请不要在key中使用_下划线符号!
      id: user.xuehao,
      rawData: user,
      expires: null
    });
    console.log(currentState.app.currentUser, user);
    if (! currentState.app.currentUser) {
      dispatch(setCurrentUser(user));
    }
    dispatch(loadBindList());
  };
}

export function deleteUser(user) {
  return (dispatch, getState) => {
    storage.remove({
      key: 'bindUsers',
      id: user.xuehao,
    });
    const currentState = getState();

    if (user.xuehao == currentState.app.currentUser.xuehao) {
      storage.remove({
        key: 'currentUser',
      });
      dispatch(loadCurrentUser());
    }
    dispatch(loadBindList());

  };
  
}

export function setScoreMsg(msg) {
  return {type: SCORE_MSG, scoreMsg: msg};
}

export function setCurrentScore(score) {

  return {type: SCORE_MSG, currentScore: score};
}

// 切换tab
export const selecteTab = (selectedTab = 'my') => {
  return {type: SELECT_TAB, selectedTab: selectedTab};
}


export const showModal = () => {
  return {type: SHOW_MODAL, isOpen: true};
}

export const hideModal = () => {
  return {type: HIDE_MODAL, isOpen: false};
}

// 加载动画
export function loading(animating) {
  return {type: LOADING, loading: animating}
}

/*export function findBindUsers(callback) {
  storage.getAllDataForKey('bindUsers').then(ret => {
    callback(ret);
  });
}*/


