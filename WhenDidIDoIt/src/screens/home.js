import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Platform, 
  TouchableOpacity,
  ScrollView, 
} from 'react-native'

import {  Input, Icon } from 'react-native-elements';
import AreYouSureAlert from '../components/alert/areYouSureAlert.js'
import globalStyle from '../styles/globalStyle.js';
import InfoAlert from '../components/alert/infoAlert.js';
import { SwipeListView } from 'react-native-swipe-list-view';

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
      tasks: [], 
      sortedTasks: [], 
      currentNewTask: '', 
      currentEditedItem: null, 
      rightOpenValue: -75
    }
  }

  componentDidMount(){
    let tempTasks = [
      {
        id: 1, 
        title: 'Pospravi sobo', 
        color: '#583AAE'
      }, 
      {
        id: 2, 
        title: 'Pomoj posodo', 
        color: '#FFDF8F'
      }, 
      {
        id: 3, 
        title: 'Zalij rože', 
        color: '#FF044C'
      }
    ]; 

    this.setState({
      tasks: tempTasks, 
      sortedTasks: tempTasks
    })
  }

  addNewTask = () =>{
    //IF THE TASK IS NEW
    if(this.state.currentEditedItem == null){
      let colors = ['#03C2FF', '#583AAE', '#FF044C', '#A20130', '#FFDF8F']; 
      let color = colors[Math.floor(Math.random() * colors.length)]
      if(this.state.currentNewTask != ''){
        let previousTasks = this.state.tasks;
        let id = previousTasks[previousTasks.length-1].id + 1
        let taskTemplate = {
          "id": id, 
          "title": this.state.currentNewTask, 
          "color": color
        }
        previousTasks.push(taskTemplate);
        this.setState({
          tasks: previousTasks,
          sortedTasks: previousTasks
        })
      }
    }
    //IF WE ARE EDITING A PREVIOUS TASK
    else {
      let newArray = this.state.tasks.map((item) => {
        if (item.id == this.state.currentEditedItem.id) {
          item.title = this.state.currentNewTask
          return item
        }
        else {
          return item
        }
      })

      let newSortedTaskArray = this.state.sortedTasks.map((item) => {
        if (item.id == this.state.currentEditedItem.id) {
          item.title = this.state.currentNewTask
          return item
        }
        else {
          return item
        }
      })
      this.setState({
        sortedTasks: newSortedTaskArray, 
        tasks: newArray, 
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
    let searchString = text.toLowerCase();
    let sortedTasks = this.state.tasks.filter((task) => task.title.toLowerCase().includes(searchString));

    this.setState({
      sortedTasks: sortedTasks, 
      currentNewTask: text
    })
  }

  resetSortedTasks = () =>{
    this.setState({
      sortedTasks: this.state.tasks, 
      currentNewTask: ''
    })
  }

  removeTask = (task) =>{
    let filteredTasksArray = this.state.tasks.filter((item) => item.id != task.id)
    let filteredSortedArray = this.state.sortedTasks.filter((item) => item.id != task.id)
    this.setState({
      sortedTasks: filteredSortedArray, 
      tasks: filteredTasksArray
    })
  }

  editTask = (task) =>{
    this.setState({
      currentEditedItem: task, 
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
  //let colors = ['#03C2FF', '#583AAE', '#FF044C', '#A20130', '#FFDF8F']; 

  renderTask = (task) =>{
    return (
      <View style ={{flexDirection: 'row', flex: 1}}>
        <View style ={{width: '2%', backgroundColor: task.color, marginRight: 20}}/>
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
          data = {this.state.sortedTasks}
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
        closeOnRowOpen ={true}
        closeOnRowBeginSwipe= {true}
        stopLeftSwipe = {true}
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

export default Home

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