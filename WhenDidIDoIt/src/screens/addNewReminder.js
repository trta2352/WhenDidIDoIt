import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Alert, 
  FlatList, 
  Platform, 
  Keyboard,
  TouchableOpacity
} from 'react-native'
import { Icon, ListItem, Input } from 'react-native-elements';
import Image from 'react-native-remote-svg';
import AddBtn from '../components/buttons/addBtn.js';
import Reminderlist from '../components/list/reminderList.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DBManager from '../utils/dbManager.js'

import AreYouSureAlert from '../components/alert/areYouSureAlert.js'

class AddNewReminder extends Component {
  
  constructor(props) {
    super(props);

    this.state={
        isDateTimePickerVisible: false, 
        id: 0, 
        title: '', 
        description: '', 
        pastTime: '', 
        futureTime: '', 
        currentVisible: 0, 
        areYousureAlertVisible: false, 
        choiceId: 0
    }
  }
  
  renderAreYouSureAlert = () =>{
    return (
      <AreYouSureAlert 
        isVisible={this.state.areYousureAlertVisible}
        callback ={()=> this.setState({areYousureAlertVisible: !this.state.areYousureAlertVisible})}
        choiceBtn = {(choice)=> { this.handleBackButton(choice)}}
        titleText={'GO BACK'}
        subtitleText ={"Are you sure you want to go back? Unsaved changes will be lost."}
        leftBtnTitle = {'Cancel'}
        rightBtnTitle = {'Go back'}
        />
    );
  }

  handleBackButton(choice){
    this.setState({
      areYousureAlertVisible: false
    })

    if(choice){
      this.props.navigation.goBack();
    }
    else {
      //do nothing
    }
  }
  
  cancelBtnPressed(){
    this.setState({areYousureAlertVisible: true})
  }

  componentWillMount(){
    if(this.props.navigation.state.params !=null){
      let item = this.props.navigation.state.params;
      this.setState({
        id: item.id, 
        title: item.title,
        description: item.description, 
        pastTime: item.whenDidIDoIt, 
        futureTime: item.whenShouldIDoItAgain
      })
    }
    else {
      (async () => {
        let temp = await DBManager.getLastKey();
        if(temp==null){
            this.setState({id: 1})
        }
        else {
            this.setState({id: temp})
        }
      })();
    }
    
  }

  _showDateTimePicker = (pickerId) => this.setState({ isDateTimePickerVisible: true, currentVisible: pickerId });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    if(this.state.currentVisible==1){
        this.setState({pastTime: date.toDateString(), currentVisible: 0})
    }
    else {
        this.setState({futureTime: date.toDateString(), currentVisible: 0})
    }
    this._hideDateTimePicker();
  };

  renderAddNewReminderBtn(){
    return (
      <AddBtn 
        text="CANCEL"
        onPress = {()=> {this.cancelBtnPressed()}}
        width={130}
        height={40}
        textSize={14}
        backgroundColor={'#E63946'}
        textColor={'#1D3557'}
      />
    );
  }

  saveBtnPressed(){
    (async () => {
      const reminder = {
        id:this.state.id,
        'title': this.state.title, 
        'description': this.state.description,
        'whenDidIDoIt': this.state.pastTime,
        'whenShouldIDoItAgain': this.state.futureTime,
      }

      let temp = await DBManager.save(reminder)
       if(temp){
        this.props.navigation.goBack();
       }
       else {
           console.log("Shranjevanje ni uspelo");
       }
      })();
  }

  renderSaveBtn(){
    return (
      <AddBtn 
        text="SAVE"
        onPress = {()=> {this.saveBtnPressed()}}
        width={130}
        height={40}
        textSize={14}
        backgroundColor={'#1D3557'}
        textColor={'#A8DADC'}
      />
    );
  }

  renderDateTimePicker(id){
      return (
        <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(date)=>this._handleDatePicked(date, id)}
            onCancel={this._hideDateTimePicker}
            is24Hour={true}
        />
      );
  }

  renderPastInput(){
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center'}}>
            <Input 
                placeholder={'Cleaned room'}
                containerStyle={styles.inputContainerWithDate}
                inputContainerStyle={{
                    borderBottomWidth: 0
                }}
                inputStyle={styles.inputText}
                value={this.state.pastTime}
                onChangeText={(text)=> {this.setState({pastTime: text}); Keyboard.dismiss()}} 
                onFocus={()=>{this._showDateTimePicker(1); Keyboard.dismiss()}}
                onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center'}} onPress={()=> this._showDateTimePicker(1)}>
                <Image source={require('./img/calendar-alt.svg')} style={{width: 35, height: 35, paddingTop:3}}/>
            </TouchableOpacity>
        </View>
    );
  }

  renderFutureInput(){
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center'}}>
            <Input 
                placeholder={'Cleaned room'}
                containerStyle={styles.inputContainerWithDate}
                inputContainerStyle={{
                    borderBottomWidth: 0
                }}
                inputStyle={styles.inputText}
                value={this.state.futureTime}
                onChangeText={(text)=> {this.setState({futureTime: text}); Keyboard.dismiss()}} 
                onPress={()=>{this._showDateTimePicker(2); Keyboard.dismiss()}}
                onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center'}} onPress={()=> this._showDateTimePicker(2)}>
                <Image source={require('./img/calendar-alt.svg')} style={{width: 35, height: 35, paddingTop:3}}/>
            </TouchableOpacity>
        </View>
    );
  }

  renderInputFields(){
    return(
      <View style={{paddingTop:-100}}>
        <Text style={styles.inputFieldTitle}>Task title</Text>
        <Input 
          placeholder={'Cleaned room'}
          containerStyle={styles.inputContainer}
          inputContainerStyle={{
            borderBottomWidth: 0
          }}
          inputStyle={styles.inputText}
          value={this.state.title}
          onChangeText={(text)=> this.setState({title: text})} 
        />
        <Text style={styles.inputFieldTitle}>Description</Text>
        <Input 
          placeholder={'Big room clean up'}
          containerStyle={styles.inputContainer}
          inputContainerStyle={{
            borderBottomWidth: 0
          }}
          inputStyle={styles.inputText}
          value={this.state.description}
          onChangeText={(text)=> this.setState({description: text})} 
        />
        <Text style={styles.inputFieldTitle}>When did I do it?</Text>
        {this.renderPastInput()}
        <Text style={styles.inputFieldTitle}>When should I do it again?</Text>
        {this.renderFutureInput()}
      </View>
    )
  }

  renderSaveBtnView(){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
        {this.renderSaveBtn()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.leftTopContainer}>
            {this.renderAddNewReminderBtn()}
          </View>
          <View style={styles.rightTopContainer}>
            <Text style={styles.titleStyle}>New reminder</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
         {this.renderInputFields()}
         {this.renderSaveBtnView()}
         {this.renderDateTimePicker()}
         {this.renderAreYouSureAlert()}
        </View>
      </View>
    )
  }
}

export default AddNewReminder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    flexDirection: 'column', 
  //  textAlign: 'center',
    alignContent: 'center',
    backgroundColor: '#F7FCF5', 
  }, 
  topContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
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
    paddingRight: 20
  }, 
  titleStyle: {
    fontSize: 20, 
    color: '#2D3142', 
    fontWeight: 'bold',
  }, 
  bodyContainer: {

  }, 
  inputContainer: {
    borderColor: '#475c7a', 
    borderWidth: 1, 
    borderRadius: 3, 
    marginTop: 10
  }, 
  inputContainerWithDate:{
    borderColor: '#475c7a', 
    borderWidth: 1, 
    borderRadius: 3, 
    marginTop: 10, 
    width: '85%'
  },
  inputText: {
    fontSize: 12, 
  }, 
  inputFieldTitle: {
      fontSize: 17, 
      paddingTop: 10, 
      color: '#2D3142', 
      fontWeight: 'bold',
  }
})
