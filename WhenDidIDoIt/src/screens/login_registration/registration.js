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
import Validation from '../../utils/validation/login_registration'

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: '', 
      passowrd: '', 
      repeatPassword: ''
    }
  }


  renderRegistrationFields = () =>{
    return(
      <View style = {styles.loginFieldContainer}>
        <Text style = {globalStyle.inputFieldTitle}>Registration</Text>
        <Input 
          placeholder = {'email'}
          placeholderTextColor = {'#aeb1b3'}
          containerStyle = {globalStyle.inputContainer}
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
          containerStyle = {globalStyle.inputContainer}
          inputContainerStyle = {{
            borderBottomWidth: 0
          }}
          inputStyle = {globalStyle.inputText}
          value = {this.state.password}
          onChangeText = {(text)=> this.setState({password: text})} 
        />
        <Input 
          placeholder = {'Repeat password'}
          placeholderTextColor = {'#aeb1b3'}
          containerStyle = {globalStyle.inputContainer}
          inputContainerStyle = {{
            borderBottomWidth: 0
          }}
          inputStyle = {globalStyle.inputText}
          value = {this.state.repeatPassword}
          onChangeText = {(text)=> this.setState({repeatPassword: text})} 
        />
        <View style = {{paddingTop: 20}}/>
        {this.renderRegisterBtn()}
      </View>
    );
  }

  register = () =>{

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
