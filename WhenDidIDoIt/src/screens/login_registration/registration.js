import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import globalStyle from '../../styles/globalStyle';
import {  Input } from 'react-native-elements';
import AddBtn from '../../components/buttons/addBtn.js'
import colors from '../../styles/colors';
import validator from '../../utils/validation/login_registration/validateWrapper.js'

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '', 
      password: '', 
      repeatPassword: '', 
      emailError: false, 
      passwordError: false, 
      repeatPasswordError: false
    }
  }

  getCorrectContainerStyle = (isError) => {
    if(isError){
      return globalStyle.inputContainerError
    }
    else {
      return globalStyle.inputContainer
    }
  }

  renderRegistrationFields = () =>{
    return(
      <View style = {styles.loginFieldContainer}>
        <Text style = {globalStyle.inputFieldTitle}>Registration</Text>
        <Input 
          placeholder = {'email'}
          placeholderTextColor = {'#aeb1b3'}
          containerStyle = {this.getCorrectContainerStyle(this.state.emailError)}
          inputContainerStyle = {{
            borderBottomWidth: 0
          }}
          inputStyle = {globalStyle.inputText}
          value = {this.state.email}
          onChangeText = {(text)=> this.setState({email: text})} 
        />
        <Input 
          placeholder = {'password'}
          placeholderTextColor = {'#aeb1b3'}
          containerStyle = {this.getCorrectContainerStyle(this.state.passwordError)}
          inputContainerStyle = {{
            borderBottomWidth: 0
          }}
          inputStyle = {globalStyle.inputText}
          value = {this.state.password}
          secureTextEntry = {true}
          onChangeText = {(text)=> this.setState({password: text})} 
        />
        <Input 
          placeholder = {'Repeat password'}
          placeholderTextColor = {'#aeb1b3'}
          containerStyle = {this.getCorrectContainerStyle(this.state.repeatPasswordError)}
          inputContainerStyle = {{
            borderBottomWidth: 0
          }}
          inputStyle = {globalStyle.inputText}
          value = {this.state.repeatPassword}
          secureTextEntry = {true}
          onChangeText = {(text)=> this.setState({repeatPassword: text})} 
        />
        <View style = {{paddingTop: 20}}/>
        {this.renderRegisterBtn()}
      </View>
    );
  }

  register = () =>{
    let emailError = validator('email', this.state.email);
    let passwordError = validator('password', this.state.password);
    let repeatPasswordError = validator('password', this.state.repeatPassword);
    if(this.state.repeatPassword !== this.state.password){
      passwordError = true; 
      repeatPasswordError =  true
    }
    this.setState({
      emailError: emailError, 
      passwordError: passwordError, 
      repeatPasswordError: repeatPasswordError
    })

    if(!emailError && !passwordError && !repeatPasswordError){
      console.log("vse ok")
    }
  }

  renderRegisterBtn = () =>{
    return (
      <AddBtn 
        text = "REGISTER"
        onPress = {this.register}
        width = {130}
        height = {40}
        textSize = {14}
        backgroundColor = {colors.addBtnBackground}
        textColor = {colors.addBtnText}/>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style ={{flex: 0.1}}>
          <Text style ={[globalStyle.screeTitleStyle, {fontSize: 30}]}>When did I do It? </Text>
        </View>
        {this.renderRegistrationFields()}
         <TouchableOpacity style = {styles.newAccountContainer} onPress = {() => this.props.navigation.navigate('login')}>
           <Text style={[globalStyle.subtitle, {fontSize: 15, textDecorationLine: "underline"}]}>Already have an account? Login!</Text>
         </TouchableOpacity>
      </View>
    )
  }
}

export default Registration

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 60, 
    flex: 1, 
    alignItems:"center",
    flexDirection: 'column'
  }, 
  loginFieldContainer: {
    flexDirection: "column", 
    width: '70%', 
    flex: 0.4, 
    alignItems: "center"
  }, 
  newAccountContainer: {
    flex: 0.5
  }
})
