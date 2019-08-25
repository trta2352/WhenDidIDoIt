import React, { Component } from 'react';
import {
  StyleSheet,
  Platform, 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';

import Image from 'react-native-remote-svg'
import {createStackNavigator, createAppContainer, HeaderBackButton, createMaterialTopTabNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import homeScreen from './screens/home.js'

import AddReminderScreen from './screens/addNewReminder.js'
import CameraScreen from './screens/cameraScreen.js'
import HistoryScreen from './screens/history.js'
import SettingsScreen from './screens/settings'
import images from './assets/images.js';
import globalStyle from './styles/globalStyle.js';

const homeStack = createStackNavigator(
    {
        home: { 
            screen: homeScreen,
        },
        AddReminder: {
            screen: AddReminderScreen
        }, 
        cameraScreen:{
            screen: CameraScreen
        }
    },
    {
        initialRouteName: 'home', 
        headerMode: 'none'
    }
);
const tabsNavigator = createBottomTabNavigator({
    home: { 
        screen: homeStack,
        navigationOptions: {
            tabBarLabel: 'HOME',
            tabBarIcon: (values) => {
                return (
                    <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={images.home} style={{width: 20, height: 20}}/>
                        <Text style = {globalStyle.tabLabel}>HOME</Text>
                        <View style={{width: 5, height: 5, borderRadius: 20, backgroundColor: values.tintColor}}></View>
                    </View>
                )
            }
        }
    },
    history: {
        screen: HistoryScreen, 
        navigationOptions: {
            tabBarLabel: 'HISTORY', 
            tabBarIcon: (values) => {
                return (
                    <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={images.archive} style={{width: 20, height: 20}}/>
                        <Text style = {globalStyle.tabLabel}>HISTORY</Text>
                        <View style={{width: 5, height: 5, borderRadius: 20, backgroundColor: values.tintColor}}></View>
                    </View>
                )
            }
        }
    },
    settings: {
        screen: SettingsScreen, 
        navigationOptions: {
            tabBarLabel: 'SETTINGS',
            tabBarIcon: (values) => {
                console.log(values)
                return (
                    <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                        <Image source = {images.sliders} style = {{width: 20, height: 20}}/>
                        <Text style = {globalStyle.tabLabel}>SETTINGS</Text>
                        <View style={{width: 5, height: 5, borderRadius: 20, backgroundColor: values.tintColor}}></View>
                    </View>
                )
            }
        }
    },
  }, {
    initialRouteName: 'home',
    navigationOptions: ({ navigation }) => ({
      }),
      tabBarOptions: {
        activeTintColor: '#161616',
        inactiveTintColor: '#ffffff',
        style: globalStyle.bottomTabNavigator,
        //do not display icon label
        showLabel: false,
    
      },
  });

const switchStack = createSwitchNavigator(
    {
        tabs: tabsNavigator
    },
    {
        initialRouteName: 'tabs', 
    }
)

const styles = StyleSheet.create({
  })
 

const Navigator = createAppContainer(switchStack);

export default Navigator;  