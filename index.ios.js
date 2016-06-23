'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TabBarIOS,
  StatusBar,

} from 'react-native';

// 存储
import Storage from './components/common/Storage';
// 绑定学号的模态框
import BindModal from './components/common/BindModal';

import My from './components/ios/My';
import Schedule from './components/ios/Schedule';
import Score from './components/ios/Score';

// 三个图标
var wo64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADvklEQVR4Xu1aTU4bUQy2QSLDqtygcILCCZpskN5sgA0JK+AEwAmAExBOAKyYYQPdzENsAicoPQG5AXQXKiWunCYSRUzmzRs7RMrMBon4+dmff5/fQ5jyD6dcfygBKD1gTAhct1oLr6+v37HXqxLiMm+LRAv8lxBfBmK0EeB+Lgh+bNRqw/+pSqgeApfWLiLAIQLs5NGEAO4J4HjLmPs86/LSqgIQJ8kJIO7nFeotPQNRCYINLY9QAaDv7p3OSV6rpwJF9Dg3P1/TAEEFgMjaMzHlh6gogSAOQJwk64B4XcTt09YS0WkjDAuF1Hve4gBE1j4hwKIGAMyzB7C0ZUxbir8oAFfW7hDAmZRwKXwu6sbkqiij5BEFILL2BgHWNAEggHbDmCWpPUQBiJPkGRD7zY3mh7OzK5urq48Se4gBwA3PDMCThFCZPIg26mF4k0nnQCAJQHUGoOWwpwTJcd2YIwlGYgBolr8PFJ1AAKxlixxKWMWBRwnAxIXApbXTnQOmHoCpT4KRtS0EqDoksMIk3A1WgmBF4ngsUgb5/P+n03kurFkOBj2AmsS0SASAMcf/ECaRUlgCkMPrUkmv7u6Wqdv9KcHLlQcC7G4ac+5Kn0Yn4gHMPLaWx9hfigrkul5qMCIGQJQkTUTcc1WgEB3RQz0MRSqOGACDSsCjKnUvmMh5AFuUc0Gv2z1HgG+FLJy++DcQ7UjNAngbMQ8YyqyZEInooBGGTUlwxQFg4aIkaSPiV0lBmZdU4nsrlxYA4gmRAH41jOlfqkp+KgCozAcF54DqHjDoC7hJ2RaxlmDZey+PigfwJpJlUerg85Ex1ADoe4HAPaHGfeBYQmC4SWytdyhw4qsEQVXi3K9+FhgV6743Rhplb2w54O1GsbXkkwwlW95P8YBBV8iXpX63OER82drcDMMHHwBd1ognwX4PQLRHiOti7wSIXgjxhgAuJMZgKkkwur1dA6J97cEoD0QR4KhuzIWLhbNoCntAbO02ARyJWTtL4uHvRC+A2JwLgtMiVcIbAB6EIgA/hlJ7DuOExT8g9n09IjcAg4ePrLjIRMZJSQciDg0C2M2bI3IBEFvLt79+Gd1BCQkSAjivBMGBa1g4ATCpVk8DLI83ZALQv/Qguh7H2x8JD3hX4jJH5yMBGNOzN2m9/+PHIdEwZterE/RtYVU18mBeNybV0CM9oATA8xDjYSTVJaUHlCFQ5oAyCZZlMAWBzEaoB8BnfK3LTtXsz0PVGZ4ojXhIkdkKq0o4AcxLACbACJ8qwtR7wF8ri4dQd1zLOwAAAABJRU5ErkJggg==';
var chengji64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC3klEQVR4Xu2bTXLTQBCFX9tVxFlhbgAnwJwAe5Oq0YZ4E4UVyQ1yBHMCcgPwijgbm42mKhubG4QTACfA7FxU4qZE2ZRsybaUaf2k3FqPunu+6X7qkTSEPb9oz+cPBaAZsIPAwNp3YD4G0AZRs3BgzF99z2sv/Q6s5Z0xME8BTEA08o3pbxu/sQSub25a8/v7IQHPdzrMc8BDAETiYWBy0Gh0u51OCCV2JQIIJ893d+NSVnw9REcA/8wxT58cHr5IgpAI4Mra76Wv/BKEBICQATA5NaazzjcG4NraMwY+5pnVmWwLAVhkQtf3vFHUfwzAlbUjAt5kCjLPwZIAgL5vzNlWAIMg+FWJ2hcugaUW+J73bDuANI+ZPFc8DxGM2PSNWcn6WAmkes4qgAIJyGoANAO0BFQD3ESQgW8MXEirADG3iOhDzG7lNGAtICkQn61t14CxAqh8H1ByBkhl3NJO9kZIAay+oZFakbQaIOXPJQOmTHQrHghzE0StBBEU9VcD+ifGfHo4AOmZF2/vvW9MTwEsCGQXweJXTNqjZoCWgIsG5LUXkMhzAi4JeLnDlmMJ5NQISQAYBEH4Nei1AthOQDPATQS1BPiWcnghIqEBDFwmttOrxh1LQCLScm0oADcNKHf1JLxrBmgGuLTCAH6DWfyFiERuL54AT7UT1E5wKwFHEdROMJ+3whIaoLvBgrbDuheQSNcSbTiKYImRC7lWANoKO7bCQplYmhktgb0ugTnQeWvMZPPH0XTNRGn56+qY6vVXJ0dH/3ez8b/Fg+Ai8W8tV88VuJ+Zf5563soJmBiA4Xjc/DOb/QCwa19dgSllC4GA8+jPEeHdiSdGBkFwDKJhNvMVH71hF7v50FTVTo448GXgy0GjcZb6zNDS1+LkWK9SJ0gygAhrvkbUW0/7qIlUJ0dDXZjNZq3F76zFnx3MMOlw6ByY1Ov1aVTtN5lIBSCj/0c1XAE8quXKIdi/eP9BXxZAyk8AAAAASUVORK5CYII=';
var kebiao64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACV0lEQVR4Xu1aS1ICMRB9bZUWOzkCnkBvICzDSlfgSj2B3kA5ARxBV4IbZTNZojfQE4g30JWFC9uKpVUoQ5IaJ5BheraTdLrfdN70j1Dyh0puPwQA8YCSIyBXoOQOICTofQVuRqPqZDLZJeadyL1mvFGpDPcbjRcfPb0AuNb6iJm7IKr6CF36GuYXEPVaSnVcujgBGGh9DuDMJSjG9wxctJU6tulmBeBK69oa8BSjcb46fQCNA6Xu5q23AtBPkh4RnfgeFuM6BoZtpfYyATBIkjsQ7cZomK9ODIzbSm2VFgBjeEupuZ5uvQKr4AECgHiAXIHsHPAVAQI1X8aNdV1LKRPMpT7OSDBWo/LSSwDIC8miyhEPKOqXy0tviQRtSEoovALZoOQCkguEzAWY70GUVm5y1RAvAYz/8I8JuQ8d7J5W5HTuC1kP6KTF2QOt2WZIWp3uSuv6GjCy7UszJOu+n3P++xsUAMQDUlJNuQJl4QBTck5hc9NxrVvZnPmBiX717oi5CiJr35GBmT+Oz76Qf4G8cpKgcgQA6QtIYyRMZ4iZn2k2pIWrn8jAI5ke/tTDRFUCtkOQQUgOWGgkmBUcASAgCYoHLDIXkCuQEYFgHLDoUDij/dmbo1IVlqrwCgxJMT+3m825LX4Zk7MRS+kHJQ04/SQ5JaJuVgZe8r7LllJHNh282uPfozI9AJtLNsj3+FcAZlh67miMV1l8+jQzLv/+9lZ3la18NQy1zmSn65XKba7j8qGUjUGu1xWIQdFQOggAoZAtilzxgKJ8qVB6igeEQrYocj8BU3uAUCN1imIAAAAASUVORK5CYII=';

class App extends Component {

  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      selectedTab: 'my',
      notifCount: 0,
      presses: 0,
    };
  }

  _showBindModal() {
    this.refs.bindModal.show();
  }

  _renderContent(title, component) {
    StatusBar.setBarStyle(1);
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: title,
          component: component,
          barTintColor: '#3D3D3D',
          titleTextColor: '#fff',
          itemWrapperStyle: '#ccc',
          tintColor: '#fff',
          passProps: {
            showBindModal: this._showBindModal.bind(this),

          },
        }}
        configureScene={()=>{return NavigatorIOS.SceneConfigs.PushFromRight;}}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabBarIOS
          tintColor="#56abe4" /*当前被选中的标签图标的颜色*/
          barTintColor="#F6F6F6" /*背景色*/
          translucent={true}>
          <TabBarIOS.Item
            title="成绩"
            icon={{uri: chengji64Icon, scale: 2.5}} 
            selected={this.state.selectedTab === 'chengji'}
            onPress={() => {
              this.setState({
                selectedTab: 'chengji',
              });
            }}>
            {this._renderContent('成绩', Score)}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="课表"
            icon={{uri: kebiao64Icon, scale: 2.5}} 
            selected={this.state.selectedTab === 'kebiao'}
            onPress={() => {
              this.setState({
                selectedTab: 'kebiao',
              });
            }}>
            {this._renderContent('课表', Schedule)}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="我的"
            icon={{uri: wo64Icon, scale: 2.5}} 
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}>
            {this._renderContent('我的', My)}
          </TabBarIOS.Item>
        </TabBarIOS>
        <BindModal ref="bindModal" />
      </View>
    );
  }
}

AppRegistry.registerComponent('SampleAppMovies', () => App);
