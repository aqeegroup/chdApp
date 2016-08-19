'use strict';
module.exports = function(state, action) {
  console.log(state, action);
  // 初始化值
  state = state || {
    type: 'INITIAL_LIST',
  }

  switch(action.type) {
    case 'INITIAL_LIST': {
      return {
        ...state,
        ...action,
      };
    }

    case 'LOAD_CURRENT_USER': {
      return {
        ...state,
        ...action,
      };
    }

    case 'LOAD_BIND_LIST': {
      // console.log(state, 'list');
      return {
        ...state,
        ...action,
      };
    }
    case 'APPEND_USER': {
      return {
        ...state,
        ...action,
      };
    }

    // 设置当前用户
    case 'SET_CURRENT_USER': {
      // console.log(action, 'TEST');
      return {
        ...state,
        ...action,
      };
    }

    // 切换tab
    case 'SELECT_TAB': {
      return {
        ...state,
        ...action,
      };
    }

    // 摸态框打开关闭
    case 'SHOW_MODAL': {
      // console.log(action, 'SHOW_MODAL');
      return {
        ...state,
        ...action,
      };
    }
    case 'HIDE_MODAL': {
      return {
        ...state,
        ...action,
      };
    }
    // 加载动画
    case 'LOADING': {
      return {
        ...state,
        ...action,
      };
    }
    // 获取成绩的消息
    case 'SCORE_MSG': {
      // state.score
      return {
        ...state,
        ...action,
      }; 
    }

    default:{
      // console.log(state, 'default');
      return state;
    }
  }
  return state;
}