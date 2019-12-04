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
import { USER_LOGIN } from '../../utils/api/apiConstants';
import FetchController from '../../utils/api/fetchController.js'
import InfoAlert from '../../components/alert/infoAlert.js'
import { inject, observer} from 'mobx-react';
import loginGateway from '../../utils/localDB/loginGateway.js'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '', 
      password: '', 
      emailError: false, 
      passwordError: false, 
      isInfoAlertVisible: false, 
      alertSubtitle: ''
    }
  }

  componentDidMount(){
    this.checkIfUserIsLogedIn()
  }

  checkIfUserIsLogedIn = async () =>{
    this.props.navigation.navigate("home");
    let userData = await loginGateway.isUserLoggedIn();
    if(userData != false){
      this.props.navigation.navigate("home");
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

  renderInfoAlert = () =>{
    if(this.state.isInfoAlertVisible){
      return(
        <InfoAlert 
          isVisible = {this.state.isInfoAlertVisible}
          callback = {() => this.setState({isInfoAlertVisible: false})}
          titleText = {"A problem accured"}
          subtitleText = {this.state.alertSubtitle}
        />
      );
    }
  }

  login = () =>{
    let emailError = validator('email', this.state.email);
    let passwordError = validator('password', this.state.password);

    this.setState({
      emailError: emailError, 
      passwordError: passwordError, 
    })

    if(!emailError && !passwordError){
      FetchController.post(USER_LOGIN, {email: this.state.email, password: this.state.password}).then((response) =>{
        if(response.status == 200){
          response.json().then((value) =>{
            let userInJsonStyle = {
              email: value.email, 
              token: value.token
            }
            loginGateway.saveUserInfo(userInJsonStyle)
            this.props.UserStore.loadingCompleted(value.email, value.token)
            this.props.navigation.navigate("home");
          })
        }
        else {
          let alertSubtitle = "Invalid credentials to login. Check your input.";
          this.setState({
            isInfoAlertVisible: true,
            alertSubtitle: alertSubtitle
          })
        }
      })
    }
  }

  renderLoginFieldsContainer = () =>{
    return(
      <View style = {styles.loginFieldContainer}>
        <Text style = {globalStyle.inputFieldTitle}>Login credentials</Text>
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
        <View style = {{paddingTop: 20}}/>
        {this.renderLoginBtn()}
      </View>
    );
  }

  renderLoginBtn = () =>{
    return (
      <AddBtn 
        text = "LOGIN"
        onPress = {this.login}
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
        {this.renderLoginFieldsContainer()}
        <View style = {styles.newAccountContainer}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('registration')}>
            <Text style={[globalStyle.subtitle, {fontSize: 15, textDecorationLine: "underline"}]}>Dont have an account yet?</Text>
          </TouchableOpacity>
        </View>
        {this.renderInfoAlert()}
      </View>
    )
  }
}

export default inject("UserStore")(observer(Login));

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 60, 
    flex: 1, 
    alignItems:"center",
    flexDirection: 'column'
  }, 
  loginFieldContainer: {
    flexDirection: "column", 
    width: '80%', 
    flex: 0.3, 
    alignItems: "center"
  }, 
  newAccountContainer: {
    flex: 0.5
  }
})
