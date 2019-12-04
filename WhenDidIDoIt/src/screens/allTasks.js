import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator
} from 'react-native'
import Image from 'react-native-remote-svg'

import Reminderlist from '../components/list/reminderList.js'
import DBManager from '../utils/dbManager.js'
import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import InfoAlert from '../components/alert/infoAlert.js'
import globalStyle from '../styles/globalStyle.js';
import images from '../assets/images.js';
import SupportFun from '../utils/supportFunction.js'
import { inject, observer } from 'mobx-react'

class AllTasks extends Component {
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
      todayTasks: [], 
      thisWeekTasks: [], 
      laterTasks: [], 
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

  sortData = (tasks) =>{
    let sortedTasks = SupportFun.getSortedTasks(tasks);
    this.setState({
      todayTasks: sortedTasks.todays, 
      thisWeekTasks: sortedTasks.thisWeek, 
      laterTasks: sortedTasks.later, 
    })
  }

  updatedData(isUpdate){
    (async () => {
      let temp = await DBManager.getAll()
      this.sortData(temp)
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
      <TouchableOpacity onPress={()=> this.openAddNewReminderScreen(-1)} style={globalStyle.addNewReminderPlusBtn}>
        <Image source={images.plus} style={{width: 40, height: 40}}/>
      </TouchableOpacity>
    );
  }

  renderTodoSection = () =>{
    return (
      <View>
        <Text style = {globalStyle.aboveListTitle}>TODAY</Text>
        <ScrollView>
            <Reminderlist data = {this.state.todayTasks} deleteFunc = {(id)=> this.deleteFunc(id)} editFunc = {(id)=> this.editFunc(id)}/>
          </ScrollView>
      </View>
    );
  }

  renderNextWeekSection = () =>{
    return (
      <View>
        <Text style = {globalStyle.aboveListTitle}>THIS WEEK</Text>
        <ScrollView>
            <Reminderlist data = {this.state.thisWeekTasks} deleteFunc = {(id)=> this.deleteFunc(id)} editFunc = {(id)=> this.editFunc(id)}/>
          </ScrollView>
      </View>
    );
  }

  renderOtherSection = () =>{
    return (
      <View>
        <Text style = {globalStyle.aboveListTitle}>LATER</Text>
        <ScrollView>
            <Reminderlist data = {this.state.laterTasks} deleteFunc = {(id)=> this.deleteFunc(id)} editFunc = {(id)=> this.editFunc(id)}/>
          </ScrollView>
      </View>
    );
  }

  renderCorrectView(){
    if(this.state.realData.length != 0){
      return (
        <ScrollView>
          {this.renderTodoSection()}
          {this.renderNextWeekSection()}
          {this.renderOtherSection()}
        </ScrollView>
      );
    }
    else {
      if(this.state.isLoadingIndicatorVisible == true){
        return (
          <ActivityIndicator size = "large" color = {'#064c5d'} hidesWhenStopped = {this.state.isLoadingIndicatorVisible}/>
        );
      }
      else {
        return (
          <View style = {{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{textAlign: 'center', fontSize: 17, color: 'black'}}>You have no saved tasks. Add new ones and they will appear here.</Text>
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
       <View style= {globalStyle.topContainer}>
          <View style = {styles.leftTopContainer}>
            <Text style = {globalStyle.mainTitleStyle}>ALL TASKS</Text>
          </View>
        </View>
        {this.renderCorrectView()}
        <View style = {styles.infoBtnStyle}>    
          {this.renderAreYouSureAlert()}
          {this.renderInfoAlert()}
        </View>
      </View>
    )
  }
}
export default inject("UserStore")(observer(AllTasks));

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
    bottom: 100, 
    right: 30, 
  }
})
