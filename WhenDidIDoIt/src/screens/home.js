import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Alert, 
  FlatList, 
  Platform, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator
} from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Image from 'react-native-remote-svg'
import AddBtn from '../components/buttons/addBtn.js'
import Reminderlist from '../components/list/reminderList.js'

import DBManager from '../utils/dbManager.js'
import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import InfoAlert from '../components/alert/infoAlert.js'
import globalStyle from '../styles/globalStyle.js';
import colors from '../styles/colors.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state={
      data: [
        {
          id: 1, 
          title: 'Clean my room', 
          description: 'I Cleaned my room last week. It was super fun. I should do it again sooon!', 
          whenDidIDoIt: '14.3.2019 14:00', 
          whenShouldIDoItAgain: '14.4.2019 14:00'
        }, 
      ], 
      realData: [], 
      areYousureAlertVisible: false, 
      missingInputVisible: false, 
      choiceId: 0, 
      isLoadingIndicatorVisible: true
    }
  }

  renderInfoAlert = () =>{
    return (
      <InfoAlert 
        isVisible={this.state.missingInputVisible}
        callback ={()=> this.setState({missingInputVisible: !this.state.missingInputVisible})}
        titleText={"Some information about the application"}
        subtitleText={'This application was developed as a side project. Additional information will be added here. '}
        />
    );
  }

  updatedData(isUpdate){
    (async () => {
      let temp = await DBManager.getAll()
      if(temp != false){
        this.setState({realData: temp})
      }
      else{
        if(isUpdate){
          this.setState({
            realData: []
          })
        }
        this.setState({
          isLoadingIndicatorVisible: false
        })
      }
    })();

    
  }

  renderAreYouSureAlert = () =>{
    return (
      <AreYouSureAlert 
        isVisible={this.state.areYousureAlertVisible}
        callback ={()=> this.setState({areYousureAlertVisible: !this.state.areYousureAlertVisible})}
        choiceBtn = {(choice)=> { this.deleteItem(choice)}}
        titleText={'REMOVE'}
        //subtitleText ={"Ali ste prepričani, da se želite odjaviti?"}
        leftBtnTitle = {'Cancel'}
        rightBtnTitle = {'Remove'}
        />
    );
  }

  componentDidMount = () =>{
   this.updatedData();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.updatedData(true);
      }
    );
    this.setState({isLoadingIndicatorVisible: true})
  }

  componentDidMount() {
    this.willFocusSubscription.remove();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  
  openAddNewReminderScreen(id){
    if(id!=-1){
      for(var i = 0;i< this.state.realData.length;i++){
        if (this.state.realData[i].id== id){
          let item = this.state.realData[i];
          this.props.navigation.navigate('AddReminder', item);    
        }
      }
    }
    else{
      this.props.navigation.navigate('AddReminder');
    }
  }

  renderAddNewReminderBtn(){
    return (
      <AddBtn 
        text="ADD"
        onPress = {()=> {this.openAddNewReminderScreen(-1)}}
        width={150}
        height={40}
        textSize={14}
        backgroundColor={colors.addBtnBackground}
        textColor={colors.addBtnText}
      />
    );
  }
  renderInfoBtn(){
    return (
      <TouchableOpacity onPress={()=> this.setState({missingInputVisible: !this.state.missingInputVisible})}>
        <Image source={require('./img/info.svg')} style={{width: 25, height: 25}}/>
      </TouchableOpacity>
    );
  }

  renderCorrectView(){
    if(this.state.realData.length!=0){
      return (
          <ScrollView>
            <Reminderlist data={this.state.realData} deleteFunc={(id)=> this.deleteFunc(id)} editFunc={(id)=> this.editFunc(id)}/>
          </ScrollView>
      );
    }
    else {
      if(this.state.isLoadingIndicatorVisible==true){
        return (
          <ActivityIndicator size="large" color="#0000ff" hidesWhenStopped={this.state.isLoadingIndicatorVisible}/>
        );
      }
      else {
        return (
          <View style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 17, color: 'black'}}>You have no saved tasks. Add new ones and they will appear here.</Text>
          </View>
        );
      }
    }
  }

  editFunc(id){
    this.openAddNewReminderScreen(id)
  }

  deleteFunc(id){
    this.setState({choiceId: id, areYousureAlertVisible: true})
  }

  removeFromCurrentList(){
    for(var i= 0; i< this.state.realData.length; i++){
      if (this.state.realData[i].id == this.state.choiceId){
        var tempArray = this.state.realData.splice(i, 1);
        this.setState({realData: tempArray});
      }
    }
  }

  deleteItem(choice){
    this.setState({areYousureAlertVisible: false});
    if(choice==true){
      (async () => {
        let temp = await DBManager.remove(this.state.choiceId)
        if(temp){
          this.updatedData(true)
          this.removeFromCurrentList();
       }
      })();
    }
    else {
      
    }
  }

  render() {
    return (
      <View style={globalStyle.container}>
        <View style={styles.topContainer}>
          <View style={styles.leftTopContainer}>
            <Text style={globalStyle.mainTitleStyle}>When Did I Do It?</Text>
          </View>
          <View style={styles.rightTopContainer}>
            {this.renderAddNewReminderBtn()}
          </View>
        </View>
        {this.renderCorrectView()}
        <View style={styles.infoBtnStyle}>
          {this.renderInfoBtn()}
          {this.renderAreYouSureAlert()}
          {this.renderInfoAlert()}
        </View>
      </View>
    )
  }
}

export default Home

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
    justifyContent: 'flex-end', 
  }, 
  infoBtnStyle: {
    position: 'absolute', 
    bottom:30, 
    right: 30
  }
})
