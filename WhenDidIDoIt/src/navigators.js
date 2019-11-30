import React, { Component } from 'react';
import {
  StyleSheet,
  Platform, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions
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
import AllTasksScreen from './screens/allTasks.js'

import loginScreen from './screens/login_registration/login.js';
import registrationScreen from './screens/login_registration/registration.js'

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 4;


const loginRegistrationStack  = createStackNavigator(
    {
        login: { 
            screen: loginScreen,
        },
        registration: {
            screen: registrationScreen
        }, 
    },
    {
        initialRouteName: 'login', 
        headerMode: 'none'
    }
);

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
            tabBarLabel: 'ADD',
            tabBarIcon: (values) => {
                return (
                    <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={images.home} style={{width: 20, height: 20}}/>
                        <Text style = {globalStyle.tabLabel}>ADD</Text>
                        <View style={{width: 5, height: 5, borderRadius: 20, backgroundColor: values.tintColor}}></View>
                    </View>
                )
            }
        }
    },
    allTasks: {
        screen: AllTasksScreen, 
        navigationOptions: {
            tabBarLabel: 'ALL TASKS', 
            tabBarIcon: (values) => {
                return (
                    <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={images.archive} style={{width: 20, height: 20}}/>
                        <Text style = {globalStyle.tabLabel}>ALL TASKS</Text>
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
        login: loginRegistrationStack,
        tabs: tabsNavigator
    },
    {
        initialRouteName: 'login', 
    }
)

const styles = StyleSheet.create({
  })
 

const Navigator = createAppContainer(switchStack);

export default Navigator;  