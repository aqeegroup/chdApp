'use strict';

import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions';

// 信息门户登录url
var xxmhLoginUrl = 'http://ids.chd.edu.cn/authserver/login?service=http%3A%2F%2Fportal.chd.edu.cn%2F';
// 教务系统登陆接口
var jwxtLoginUrl = 'http://bksjw.chd.edu.cn/idslogin.jsp'; 

var xuehao = '';
var password = '';

var userInfo = {

};

function setAccount(x, p) {
  xuehao = x;
  password = p;
}

function jwxtLogin(callback) {
  // console.log(jwxtLoginUrl);
  console.log('登录教务系统');
  fetch(jwxtLoginUrl)
    .then((response) => {
      // console.log(response);
      return response.text();
    })
    .then(data => {
      console.log(data);
      let isLogin = false;
      let index = 'http://bksjw.chd.edu.cn/index.jsp';
      if (data.indexOf(index) > 0 || data.indexOf('错误') < 0) {
        isLogin = true;
      }
      if (callback) {
        callback(isLogin);
      }
    });
}

// 本学期成绩
/*function getScore(callback) {
  let url = 'http://bksjw.chd.edu.cn/bxqcjcxAction.do?totalrows=15&page=1&pageSize=100';

  // CookieManager.
  console.log('尝试获取成绩');
  fetch(url)
  .then(response => response.text())
  .then(html => {
    // console.log(html);
    let score = {
      error: true,
      html: '',
    };
    let re = /数据库忙请稍候再试/;
    if (! re.exec(html)) {
      score.error = false;
      score.html = html;
    } else {
    // 出现数据库忙
      console.log('数据库忙啊');
    }
    return score;
  })
  .then(score => {
    // console.log(score);
    if (score.error) {
      // 尝试教务系统登录
      console.log('尝试登录教务系统');
      jwxtLogin(isLogin => {
        console.log('是否登录成功', isLogin);
        if (isLogin) {
          console.log('尝试获取成绩');

          getScore();
        } else {
          // 教务系统登录失败
          // 尝试登录信息门户
          console.log('尝试登录信息门户');

          login(result => {
            if (result.code == '200') {
              // 信息门户登录成功
              console.log('信息门户登录成功');
              getScore();
            } else {
              console.log('信息门户登录失败');
              // console.log(result.html);
            }
          });
        }
      });
    } else {
      var scoreList = matchScore(score.html);
      callback && callback(scoreList);
    }
  });
}*/

function getScore(callback, setMsg) {
  let url = 'http://bksjw.chd.edu.cn/bxqcjcxAction.do?totalrows=15&page=1&pageSize=100';

  console.log('尝试登录信息门户');
  setMsg('尝试登录信息门户');

  login(result => {
    if (result.code == '200') {
      // 信息门户登录成功
      console.log('信息门户登录成功');
      setMsg('信息门户登录成功');
      console.log('尝试登录教务系统');
      setMsg('尝试登录教务系统');

      jwxtLogin(isLogin => {
        console.log('是否登录成功', isLogin);
        setMsg('登录教务系统' + isLogin ? '成功' : '失败');

        if (isLogin) {
          console.log('尝试获取成绩');
          setMsg('尝试获取成绩');

          fetch(url)
          .then(response => response.text())
          .then(html => {

            let re = /数据库忙请稍候再试/;
            if (re.exec(html)) {
              console.log('获取失败');
              setMsg('获取成绩失败');

            } else {
              // console.log(html);
              console.log('获取成功');
              setMsg('获取成绩成功');
              var scoreList = matchScore(html);
              callback && callback(scoreList);
            }
          });
        } 
      });
    } else {
      console.log('信息门户登录失败');
      setMsg('信息门户登录失败');

      // console.log(result.html);
    }
  });
}
function login(callback) {
  console.log(xuehao, password);
  getFromVar((data) => {
    // console.log(data);
    // 已经登录的话
    if (data.isLogin) {
      callback({code: '200', msg: 'ok', name: data.name});
      return;
    }
    // 否则执行登录操作
    let formData = {
      username: xuehao,
      password: password,
      btn: '',
      lt: data.lt,
      dllt: 'userNamePasswordLogin',
      execution: data.execution,
      _eventId: 'submit',
      rmShown: data.rmShown,
    };
    let queryString = serialize(formData);
    // console.log(queryString);
    // let cookie = buildCookie(res);
    let opt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'manual',
      body: queryString,
    };
    // console.log(opt);
    fetch(xxmhLoginUrl, opt)
    .then((response) => {
      return response.text();
    }).then(data => {
      // console.log(data);
      let name = matchName(data);
      if (name) {
        callback({code: '200', msg: 'ok', name: name});
      } else {
        callback({code: '500', msg: 'error'});
      }
    });

  });
}

// 获取登录表单所需变量
function getFromVar(callback) {
  
  fetch(xxmhLoginUrl)
    .then((response) => response.text())
    .then((html) => {
      // console.log(html);
      /*let nameRe = /<li id="welcomeMsg">(.*?),欢迎您!&nbsp;&nbsp;<\/li>/m;
      let name = nameRe.exec(data);*/
      let name = matchName(html);
      if (name) {
        callback({isLogin: true, name: name, html: html});
        return;
      }
      var result = {
        isLogin: false,
        execution: '',
        lt: '',
        rmShown: '',
        cookie: '',
      };
      // 获取 execution 字段的正则
      let executionRe = /<input\s+type="hidden"\s+name="execution"\s+value="(.*?)"\/>/;
      let execution = executionRe.exec(html);
      // console.log(execution);
      if (execution) {
        result.execution = execution[1];
      }
      // 获取 lt 字段的正则
      let ltRe = /<input\s+type="hidden"\s+name="lt"\s+value="(.*?)"\/>/;
      let lt = ltRe.exec(html);
      // console.log(lt);
      if (lt) {
        result.lt = lt[1];
      }
      // 获取 rmShown 字段的正则
      let rmShownRe = /<input\s+type="hidden"\s+name="rmShown"\s+value="(.*?)">/;
      let rmShown = rmShownRe.exec(html);
      // console.log(lt);
      if (rmShown) {
        result.rmShown = rmShown[1];
      }
      // 获取 cookie 正则
      let cookieRe = /Set-Cookie:\s+(.*);/g;

      var cookieList = [];
      do {
        let temp = cookieRe.exec(html);
        if (temp) {
          cookieList.push(temp[1]);
        }
      } while (cookieRe.lastIndex > 0);
      result.cookie = cookieList.join('; ');
      // console.log(result.cookie);
      // console.log(result);

      // Cookie: 
      callback(result);
    });
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function buildCookie(obj) {
  let str = [];
  for (let p in obj) {
    str.push(p + "=" + obj[p]);
  }
  return str.join("; ");
}

function matchName(html) {
  // console.log(html);
  let nameRe = /<li id="welcomeMsg">\s*(.*?),欢迎您!&nbsp;&nbsp;<\/li>/m;
  let name = nameRe.exec(html);
  // console.log(name);
  if (name) {
    return name[1];
  }
  return name;
}

function matchScore(html) {

  let trRe = /<tr\s*class.*?>\s*([\S\s]*?)\s*<\/tr>/g;
  let tdRe = /<td align="center">\s*([\S\s]*?)\s*<\/td>/g
  let score = [];

  do {
    let tempTr = trRe.exec(html);
    // console.log(tempTr);
    let item = [];
    if (tempTr) {
      do {
        let tempTd = tdRe.exec(tempTr[1]);
        if (tempTd) {
          item.push(tempTd[1]);
        }
      } while (tdRe.lastIndex > 0);
      score.push(item);
    }
  } while (trRe.lastIndex > 0);

  // 这个score是全部信息，只取需要的
  let result = [];
  for (let i in score) {
    let temp = {
      name: score[i][2],
      credit: score[i][4],
      score: score[i][6],
    };
    result.push(temp)
  }
  // console.log(result);
  return result;
}

const chd = {
  xuehao,
  password,
  setAccount,
  jwxtLogin,
  getScore,
  login,
  getFromVar,
  serialize,
  buildCookie,
  matchName,
};

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    scoreMsg: state.app.scoreMsg
  };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) };
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(chd)
