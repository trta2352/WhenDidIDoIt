import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Alert, 
  FlatList, 
  Platform

} from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Image from 'react-native-remote-svg'

import AddBtn from '../components/buttons/addBtn.js'

import Reminderlist from '../components/list/reminderList.js'

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
      ]
    }
  }
  
  addBtnPressed(){

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

  renderList(){}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.leftTopContainer}>
            <Text>When Did I Do It?</Text>
          </View>
          <View style={styles.rightTopContainer}>
            {this.renderAddNewReminderBtn()}
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <Reminderlist data={this.state.data}/>
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
    backgroundColor: '#f3f3f4'
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
  bodyContainer: {
  }
})
