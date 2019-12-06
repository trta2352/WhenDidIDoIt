import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Platform, 
} from 'react-native'

import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import InfoAlert from '../components/alert/infoAlert.js'
import globalStyle from '../styles/globalStyle.js';
import { inject, observer } from 'mobx-react'
import AllTaskList from '../components/list/allTaskList.js'
class AllTasks extends Component {
  constructor(props) {
    super(props);

    this.state={
      areYousureAlertVisible: false, 
      missingInputVisible: false, 
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

  renderAllTaskList = () =>{
    return (
      <AllTaskList 
        data = {this.props.taskStore.completedTasks}
      />
    );
  }

  render() {
    return (
      <View style={globalStyle.container}>
        <View style= {globalStyle.topContainer}>
          <View style = {styles.leftTopContainer}>
            <Text style = {globalStyle.mainTitleStyle}>ALL TASKS</Text>
          </View>
        </View>
        <View style = {{marginLeft: 10, marginRight: 10, flex: 1}}>
          {this.renderAllTaskList()}
        </View>

        <View style = {styles.infoBtnStyle}>    
          {this.renderAreYouSureAlert()}
          {this.renderInfoAlert()}
        </View>
      </View>
    )
  }
}
export default inject("userStore", "taskStore")(observer(AllTasks));

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
