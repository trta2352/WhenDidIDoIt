import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Alert, 
  FlatList, 
  Platform, 
  TouchableOpacity
} from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Image from 'react-native-remote-svg'
import AddBtn from '../components/buttons/addBtn.js'
import Reminderlist from '../components/list/reminderList.js'

import DBManager from '../utils/dbManager.js'

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
        {
          id: 2, 
          title: 'Clean my car', 
          description: 'I Cleaned my room last week. It was super fun. I should do it again sooon!', 
          whenDidIDoIt: '14.3.2019 14:00', 
          whenShouldIDoItAgain: '14.4.2019 14:00'
        }, 
        {
          id: 3, 
          title: 'Clean my house', 
          description: 'I Cleaned my room last week. It was super fun. I should do it again sooon!', 
          whenDidIDoIt: '14.3.2019 14:00', 
          whenShouldIDoItAgain: '14.4.2019 14:00'
        }
      ], 
      realData: []
    }
  }

  updatedData(){
   // this.setState({realData: []})
    (async () => {
      let temp = await DBManager.getAll()
      if(temp != false){
        this.setState({realData: temp})
      }
      else{
        this.setState({
          realData: this.state.data
        })
      }
    })();
  }

  componentDidMount = () =>{
   this.updatedData();

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.updatedData();
      }
    );
  }

  componentDidMount() {
    this.willFocusSubscription.remove();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  
  addBtnPressed(){
    this.props.navigation.navigate('AddReminder');
  }

  renderAddNewReminderBtn(){
    return (
      <AddBtn 
        text="ADD"
        onPress = {()=> {this.addBtnPressed()}}
        width={150}
        height={40}
        textSize={14}
      />
    );
  }
  renderInfoBtn(){
    return (
      <TouchableOpacity onPress={()=> console.log('do something')}>
        <Image source={require('./img/info.svg')} style={{width: 25, height: 25}}/>
      </TouchableOpacity>
    );
  }

  renderCorrectView(){
    if(this.state.realData!=null){
    return (
        <View style={styles.bodyContainer}>
          <Reminderlist data={this.state.realData}/>
        </View>
      );
    }
    else {
      return (
        <Text>You have no saved tasks. Add new ones and they will appeat here.</Text>
      );
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.leftTopContainer}>
            <Text style={styles.titleStyle}>When Did I Do It?</Text>
          </View>
          <View style={styles.rightTopContainer}>
            {this.renderAddNewReminderBtn()}
          </View>
        </View>
        {this.renderCorrectView()}
        <View style={styles.infoBtnStyle}>
          {this.renderInfoBtn()}
        </View>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    flexDirection: 'column', 
  //  textAlign: 'center',
    backgroundColor: '#ffffff', 
    alignContent: 'center',
    backgroundColor: '#DEF2C8', 
    backgroundColor: '#fefad4'
  }, 
  topContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 50, 
    marginBottom: 50
  }, 
  leftTopContainer: {
    justifyContent: 'flex-start', 
  }, 
  rightTopContainer: {
    justifyContent: 'flex-end', 
  }, 
  titleStyle: {
    fontSize: 20, 
    color: '#F1828D', 
    fontWeight: 'bold',
  }, 
  bodyContainer: {
  }, 
  infoBtnStyle: {
    position: 'absolute', 
    bottom:30, 
    right: 30
  }
})
