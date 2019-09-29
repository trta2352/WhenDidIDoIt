import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Platform, 
  Keyboard,
  TouchableOpacity,
  ScrollView, 
  ActivityIndicator
} from 'react-native'
import {  Input } from 'react-native-elements';
import Image from 'react-native-remote-svg';

import AddBtn from '../components/buttons/addBtn.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DBManager from '../utils/dbManager.js'
import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import globalStyle from '../styles/globalStyle.js';
import colors from '../styles/colors.js';
import ImagePicker from 'react-native-image-picker';
import images from '../assets/images.js';
import RNPickerSelect from 'react-native-picker-select';

class Home extends Component {
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
      choiceId: 0, 
      path: null,
      shouldStartTheIndicator: false, 
      selectedPickerValue: null
    }
  }

  componentDidMount(){
    if(this.props.navigation.state.params != null){
      let item = this.props.navigation.state.params;
      this.setState({
        id: item.id, 
        title: item.title,
        description: item.description, 
        pastTime: item.whenDidIDoIt, 
        futureTime: item.whenShouldIDoItAgain,
        path: item.imagePath
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

  saveBtnPressed() {
    (async () => {
      const reminder = {
        id: this.state.id,
        'title': this.state.title,
        'description': this.state.description,
        'whenDidIDoIt': this.state.pastTime,
        'whenShouldIDoItAgain': this.state.futureTime,
        'imagePath': this.state.path
      }

      let temp = await DBManager.save(reminder)
      if (temp) {
        this.props.navigation.goBack();
      } else {
        console.log("Shranjevanje ni uspelo");
      }
    })();
  }

  renderAddPhotoBtn = () => {
    return (
      /*<AddBtn 
        text = "ADD PHOTO"
        onPress = {()=> {this.setState({shouldStartTheIndicator: true}); this.showImagePicker()}}
        width = {140}
        height = {40}
        textSize = {13}
        backgroundColor = {colors.addBtnBackground}
        textColor = {colors.addBtnText}
      />*/
      <TouchableOpacity onPress = {() => {this.setState({shouldStartTheIndicator: true}); this.showImagePicker()}}>
        <Image source = {images.camera} style = {{height: 50, width: 50}}/>
      </TouchableOpacity>
      );
  } 

  showImagePicker = () => {
    const options = {
      title: 'Select task/reminder images.',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      this.setState({
        path: response.uri
        })
      
      if (response.didCancel) {
        this.setState({shouldStartTheIndicator: false})
      } else if (response.error) {
        this.setState({shouldStartTheIndicator: false})
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        this.setState({shouldStartTheIndicator: false})
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({shouldStartTheIndicator: false})
        console.log('Response = ', response);
        this.setState({
          path: response.uri
        })
      }
    });
  }

  renderSelectedImage = () =>{
    if(this.state.path != null){
      this.setState({shouldStartTheIndicator: false})
      return(
        <TouchableOpacity style = {{ backgroundColor: 'black', borderRadius: 4, marginTop: 5, marginBottom: 5}} onPress = {() => {this.showImagePicker(); this.setState({shouldStartTheIndicator: true, path: null})}}>
           <Image source={{ uri: this.state.path }} style={{width: 170, height: 227}}/>
        </TouchableOpacity>
      );
    }
    else if(this.state.shouldStartTheIndicator){
      return(
        <ActivityIndicator size="large" color="#064c5d" />
      );
    }
  }

  renderSaveBtn = () => {
    return (
      <AddBtn 
        text = "SAVE"
        onPress = {()=> {this.saveBtnPressed()}}
        width = {130}
        height = {40}
        textSize = {14}
        backgroundColor = {colors.addBtnBackground}
        textColor = {colors.addBtnText}
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
        mode={'datetime'}
      />
    );
  }
  
  renderPicker = () =>{
    return(
      <RNPickerSelect
      onValueChange={(value) => this.setState({selectedPickerValue: value})}
      style={pickerSelectStyles}
      items={[
          { label: 'daily', value: '1' },
          { label: 'weekly', value: '2' },
          { label: 'monthly', value: '3' },
      ]}></RNPickerSelect>  
    );
  }

  renderPastInput(){
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center'}}>
        <Input 
          placeholder={'Cleaned room'}
          containerStyle={globalStyle.inputContainerWithDate}
          inputContainerStyle={{
              borderBottomWidth: 0, 
          }}
          inputStyle={globalStyle.inputText}
          value={this.state.pastTime}
          onChangeText={(text)=> {this.setState({pastTime: text}); Keyboard.dismiss()}} 
          onFocus={()=>{this._showDateTimePicker(1); Keyboard.dismiss()}}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center'}} onPress={()=> this._showDateTimePicker(1)}>
            <Image source={images.calendar} style={{width: 35, height: 35, paddingTop:3}}/>
        </TouchableOpacity>
      </View>
    );
  }

  renderFutureInput(){
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center'}}>
        <Input 
          placeholder={'When do I need to do it again'}
          containerStyle={globalStyle.inputContainerWithDate}
          inputContainerStyle={{
              borderBottomWidth: 0
          }}
          inputStyle={globalStyle.inputText}
          value={this.state.futureTime}
          onChangeText={(text)=> {this.setState({futureTime: text}); Keyboard.dismiss()}} 
          onPress={()=>{this._showDateTimePicker(2); Keyboard.dismiss()}}
          onFocus={()=>{this._showDateTimePicker(2); Keyboard.dismiss()}}
            onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center'}} onPress={()=> this._showDateTimePicker(2)}>
            <Image source={images.calendar} style={{width: 35, height: 35, paddingTop:3}}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderInputFields(){
    return(
      <View style={{paddingTop:-100}}>
        <Text style={globalStyle.inputFieldTitle}>Task title</Text>
        <Input 
          placeholder={'Cleaned room'}
          containerStyle={globalStyle.inputContainer}
          inputContainerStyle={{
            borderBottomWidth: 0
          }}
          inputStyle={globalStyle.inputText}
          value={this.state.title}
          onChangeText={(text)=> this.setState({title: text})} 
        />
        <Text style={globalStyle.inputFieldTitle}>Description</Text>
        <Input 
          placeholder={'Big room clean up'}
          containerStyle={globalStyle.inputContainer}
          inputContainerStyle={{
            borderBottomWidth: 0
          }}
          inputStyle={globalStyle.inputText}
          value={this.state.description}
          onChangeText={(text)=> this.setState({description: text})} 
        />
        <Text style={globalStyle.inputFieldTitle}>When did I do it?</Text>
        {this.renderPastInput()}
        <Text style={globalStyle.inputFieldTitle}>When should I do it again?</Text>
        {this.renderFutureInput()}
        <Text style={globalStyle.inputFieldTitle}>Is it a repeating task?</Text>
        {this.renderPicker()}
      </View>
    )
  }

  renderImageViewAndBtn = () =>{
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
        {this.renderSelectedImage()}
        {this.renderAddPhotoBtn()}
      </View>
    );
  }


  renderSaveBtnView(){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40, paddingBottom: 300}}>
        {this.renderSaveBtn()}
      </View>
    );
  }

  render() {
    return (
      <View style={globalStyle.container}>
       <View style={styles.topContainer}>
          <View style={styles.leftTopContainer}>
            <Text style={globalStyle.mainTitleStyle}>When Did I Do It?</Text>
          </View>
          <View style={styles.rightTopContainer}>
            <Text style = {globalStyle.screeTitleStyle}>New reminder</Text>
          </View>
        </View>
      <ScrollView style={{flex: 0.7}}>
       {this.renderInputFields()}
       {this.renderImageViewAndBtn()}
       {this.renderSaveBtnView()}
       {this.renderDateTimePicker()}
       {this.renderAreYouSureAlert()}
      </ScrollView>
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
    marginBottom: 20,
    ...Platform.select({
      ios: {
        marginTop: 50, 
       
      }, 
      android:{
        marginTop: 20, 
      }
    }), 
  }, 
  leftTopContainer: {
    justifyContent: 'flex-start', 
  }, 
  rightTopContainer: {
    justifyContent: 'flex-end', 
    paddingRight: 20
  }, 
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    marginTop: 40,
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    fontSize: 12, 
    fontWeight: 'bold',
    color: '#72767A',
    fontFamily: 'CooperHewitt-Light',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 12, 
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    fontWeight: 'bold',
    color: '#72767A',
    fontFamily: 'CooperHewitt-Light',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});