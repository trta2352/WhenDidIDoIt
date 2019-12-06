import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity,
} from 'react-native'

import {
  Input,
  Icon, 
  CheckBox
} from 'react-native-elements';
import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import globalStyle from '../styles/globalStyle.js';
import InfoAlert from '../components/alert/infoAlert.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import { inject, observer } from 'mobx-react';
import {toJS} from 'mobx';

const placeholder = {
  label: 'Select repeat interval',
  value: null,
  color: '#aeb1b3',
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state={
      areYousureAlertVisible: false, 
      isInfoAlertVisible: false, 
      infoAlertTitle: null, 
      infoAlertSubtitle: null,
      currentVisibleField: '',
      sortedTasks: [], 
      currentNewTask: '', 
      currentEditedItem: null, 
      rightOpenValue: -75
    }
  }

  componentDidMount(){
    this.setState({
      sortedTasks: []
    })
  }

  addNewTask = () =>{
    //IF THE TASK IS NEW
    if(this.state.currentEditedItem == null){
      let colors = ['#03C2FF', '#583AAE', '#FF044C', '#A20130', '#FFDF8F']; 
      let color = colors[Math.floor(Math.random() * colors.length)]
      if(this.state.currentNewTask != ''){
        let taskTemplate = {
          "title": this.state.currentNewTask, 
          "color": color, 
          "isDone": false, 
          "taskNum": this.props.taskStore.getNewTaskId(), 
          "fkUser": this.props.userStore.id
        }

        this.props.taskStore.saveNewTask(taskTemplate)
      } 
    }
    //IF WE ARE EDITING A PREVIOUS TASK TODO
    else {
      let temp = this.state.currentEditedItem;
      temp.title = this.state.currentNewTask
      console.log(temp)
      console.log("------------")
      this.props.taskStore.updateTask(temp)

      this.setState({
        currentEditedItem: null
      })
    }
  }

  renderAreYouSureAlert = () =>{
    return (
      <AreYouSureAlert 
        isVisible={this.state.areYousureAlertVisible}
        callback ={()=> this.setState({areYousureAlertVisible: !this.state.areYousureAlertVisible})}
        choiceBtn = {(choice)=> { this.handleBackButton(choice)}}
        titleText = {'GO BACK'}
        subtitleText = {"Are you sure you want to go back? Unsaved changes will be lost."}
        leftBtnTitle = {'Cancel'}
        rightBtnTitle = {'Go back'}
        />
    );
  }

  renderInfoAlert = () =>{
    return (
      <InfoAlert 
        isVisible = {this.state.isInfoAlertVisible}
        callback = {()=> this.setState({isInfoAlertVisible: !this.state.isInfoAlertVisible})}
        titleText = {this.state.infoAlertTitle}
        subtitleText = {this.state.infoAlertSubtitle}
        />
    );
  }

  searchTroughTasks = (text) =>{
    this.setState({
      currentNewTask: text
    })
    this.props.taskStore.sortTasks(text);
  }

  resetSortedTasks = () =>{
    this.props.taskStore.resetSortedTasks();
  }

  getJSobjectFromProxy = (item) =>{
    return toJS(item)
  }

  removeTask = (task) =>{
    this.props.taskStore.removeTask(this.getJSobjectFromProxy(task));
  }

  editTask = (task) =>{
    this.setState({
      currentEditedItem: this.getJSobjectFromProxy(task), 
      currentVisibleField: 'NEW_TASK', 
      currentNewTask: task.title
    })
  }

  renderSearchOrNewTaskField = () => {
    if(this.state.currentVisibleField == 'SEARCH'){
      return(
        <View style = {{flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
          <Input 
            placeholder = {'srach'}
            placeholderTextColor = {'#aeb1b3'}
            containerStyle = {[globalStyle.inputContainer, {width: '90%'}]}
            inputContainerStyle = {{
              borderBottomWidth: 0, 
            }}
            inputStyle = {globalStyle.inputText}
            value = {this.state.currentNewTask}
            onChangeText = {(text)=> this.searchTroughTasks(text)} 
          />
          <TouchableOpacity style ={{padding: 10}} onPress = {this.resetSortedTasks}>
            <Icon type="feather" name = "x" size = {22} color = {"#655D7D"}/>
          </TouchableOpacity>
        </View>
      );
    }
    else if(this.state.currentVisibleField == 'NEW_TASK'){
      return (
        <View style = {{flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
          <Input 
            placeholder = {'new task'}
            placeholderTextColor = {'#aeb1b3'}
            containerStyle = {[globalStyle.inputContainer, {width: '80%'}]}
            inputContainerStyle = {{
              borderBottomWidth: 0
            }}
            inputStyle = {globalStyle.inputText}
            value = {this.state.currentNewTask}
            onChangeText = {(text) => this.setState({currentNewTask: text})} 
          />
          <TouchableOpacity style ={{padding: 10}} onPress = {this.addNewTask}>
            <Icon type="feather" name ="check" size = {22} color = {"#655D7D"}/>
          </TouchableOpacity>
          <TouchableOpacity style ={{padding: 10, paddingLeft: 0}}>
            <Icon type="feather" name ="chevron-down" size = {26} color = {"#655D7D"}/>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderTask = (task) =>{
    return (
      <View style ={{flexDirection: 'row', flex: 1, marginBottom: -10, borderRadius: 5, borderColor: '#FAFAFA', borderWidth: 4}}>
        <View style ={{width: '2%', backgroundColor: task.color, marginRight: 20}}/>
          <View style = {{justifyContent: "center", alignContent: 'center'}}>
            <CheckBox
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={task.isDone}
              onPress = {() => {this.props.taskStore.taskWasChecked(task)}}
            />
          </View>
          <View style ={{ justifyContent: 'center'}}>
            <Text style ={{}}>{task.title}</Text>
          </View>
      </View>
    );
  }
  
  renderTasks = () =>{
    return (
      <View style = {{borderTopWidth: 1, borderColor: '#665D7E', borderRadius: 10, paddingTop: 10, marginTop: 10}}>
        <SwipeListView 
          data = {this.props.taskStore.sortedTasks}
          renderItem = { (data) => (
            <View style={styles.rowFront}>
              {this.renderTask(data.item)}
            </View>
        )}
        renderHiddenItem = { (data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style = {{paddingRight: 10}} onPress = {() => this.editTask(data.item)}>
              <Icon type="feather" name ="edit-2" size = {22} color = {"#655D7D"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> this.removeTask(data.item)}>
              <Icon type="feather" name ="trash-2"  size = {22} color = {"#655D7D"}/>
            </TouchableOpacity>
          </View>
        )}
        closeOnRowOpen = {true}
        closeOnRowBeginSwipe= {true}
        rightOpenValue = {-75}
      />
      </View>
    );
  }

  showOrHideSearchOrNewTaskField = (clickedBtn) =>{
    if(this.state.currentVisibleField == clickedBtn){
      this.setState({
        currentVisibleField: ''
      })
    }
    else {
      this.setState({
        currentVisibleField: clickedBtn
      })
    }
  }

  getBtnBackground = (btnTitle) =>{
    if(btnTitle == this.state.currentVisibleField){
      return (
        {
          backgroundColor: '#FFDF8F',
          borderRadius: 10, 
          padding: 5, 
        }
      );
    }
    else {
      return (
        {
          padding: 5
        }
      );
    }
  }

  render() {
    return (
      <View style = {globalStyle.container}>
       <View style= {globalStyle.topContainer}>
          <View style = {styles.leftTopContainer}>
            <Text style = {globalStyle.mainTitleStyle}>TASKS</Text>
          </View>
          <View style = {styles.rightTopContainer}>
            <TouchableOpacity style ={[{paddingRight: 20}]} onPress = {()=> this.showOrHideSearchOrNewTaskField('NEW_TASK')}>
              <Icon type="feather" name = "plus" color = {"#251947"} containerStyle = {this.getBtnBackground('NEW_TASK')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> this.showOrHideSearchOrNewTaskField('SEARCH')}>
              <Icon type="feather" name ="search" color = {"#251947"} containerStyle = {this.getBtnBackground('SEARCH')}/>
            </TouchableOpacity>
          </View>
        </View>
      <View style = {{}}>
        {this.renderSearchOrNewTaskField()}
        {this.renderTasks()}
      </View>
        {this.renderAreYouSureAlert()}
        {this.renderInfoAlert()}
    </View>
    )
  }
}

export default inject("userStore", "taskStore")(observer(Home));

const styles = StyleSheet.create({
  leftTopContainer: {
    justifyContent: 'flex-start', 
  }, 
  rightTopContainer: {
    justifyContent: 'flex-end', 
    paddingRight: 20, 
    flexDirection: 'row'
  }, 
  rowFront: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    height: 50,
    flexDirection: "row"
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingRight: 10
  },
})