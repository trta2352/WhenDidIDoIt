import React, { Component } from 'react';
import {
  StyleSheet,
  Platform, 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';

import Image from 'react-native-remote-svg'
import {createStackNavigator, createAppContainer, HeaderBackButton, createMaterialTopTabNavigator, createSwitchNavigator} from 'react-navigation';
import homeScreen from './screens/home.js'

const homeStack = createStackNavigator(
    {
        home: { 
            screen: homeScreen,
        },
       
    },
    {
        initialRouteName: 'home', 
        headerMode: 'none'
    }
);

const switchStack = createSwitchNavigator(
    {
        home: homeStack
    },
    {
        initialRouteName: 'home', 
    }
)

const styles = StyleSheet.create({
  })
 

const Navigator = createAppContainer(switchStack);

export default Navigator;  