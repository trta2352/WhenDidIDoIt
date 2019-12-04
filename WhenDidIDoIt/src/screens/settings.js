import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Platform,
  TouchableOpacity,
  ScrollView, 
} from 'react-native'


import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import InfoAlert from '../components/alert/infoAlert.js'
import globalStyle from '../styles/globalStyle.js';
import colors from '../styles/colors.js';
import images from '../assets/images.js';
import UserGateway from '../utils/localDB/userGateway'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areYousureAlertVisible: false
    }
  }


  renderAreYouSureAlert = () =>{
    return (
      <AreYouSureAlert 
        isVisible={this.state.areYousureAlertVisible}
        callback ={()=> this.setState({areYousureAlertVisible: !this.state.areYousureAlertVisible})}
        choiceBtn = {this.areYouSureAlertChoice}
        titleText = {'Are you sure?'}
        //subtitleText ={"Ali ste prepričani, da se želite odjaviti?"}
        leftBtnTitle = {'Cancel'}
        rightBtnTitle = {'Logout'}
        />
    );
  }

  logoutUserFromDB = async() =>{
    UserGateway.logout();
  }

  areYouSureAlertChoice = (choice) =>{
    if(choice){
      this.logoutUserFromDB();
      this.props.navigation.navigate('login');
    }
    else {
      this.setState({
        areYousureAlertVisible: false
      })
    }
  }

  render() {
    return (
      <View style = {globalStyle.container}>
         <View style= {globalStyle.topContainer}>
          <View style = {styles.leftTopContainer}>
            <Text style = {globalStyle.mainTitleStyle}>SETTINGS</Text>
          </View>
        </View>
        <View style = {{flex: 1}}>
          <View style = {styles.bottomContainer}>
            <TouchableOpacity style = {styles.logoutBtn} onPress = {() => {this.setState({areYousureAlertVisible: true})}}>
              <Text style ={[globalStyle.screeTitleStyle, {paddingTop: 10, fontSize: 20}]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      {this.renderAreYouSureAlert()}
    </View>
    )
  }
}

export default Settings

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 30,
    ...Platform.select({
      ios: {
        marginTop: 50, 
       
      }, 
      android:{
        marginTop: 20, 
      }
    })
  }, 
  leftTopContainer: {
    justifyContent: 'flex-start', 
  }, 
  rightTopContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  infoBtnStyle: {
    position: 'absolute', 
    bottom:30, 
    right: 30
  }, 
  bottomContainer: {
    flex: 0.9,
    justifyContent: 'flex-end',
    marginBottom: 36, 
    alignItems: 'center', 

  }, 
  logoutBtn: {
    borderTopColor: '#7f7f7f', 
    borderTopWidth: 1, 
    width: '100%',
    alignItems: 'center', 
  }
})
