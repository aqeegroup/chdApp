'use strict';

import {
    NavigatorIOS,
    View,
    StyleSheet,
} from 'react-native';
import React, { Component } from 'react';


export default class Navigation extends Component {
  render (){
    console.log(this.props);
    return(
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: this.props.title,
          component: this.props.component, 
          index: 0,
          barTintColor: '#3D3D3D',
          titleTextColor: '#fff',
          itemWrapperStyle: '#ccc',
        }}
        configureScene={(route)=>{
          if (route.sceneConfig) {
              return route.sceneConfig;
          }
          return NavigatorIOS.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          console.log(navigator, 1111);
          return (
            <View style={{flex: 1}}>
              <Component navigator={navigator} route={route} />
            </View>
          );
        }}/>
    );
  }
}
