import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Alert, 
  FlatList, 
  TouchableOpacity
} from 'react-native'

import {ListItem} from 'react-native-elements';
import Image from 'react-native-remote-svg'

import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../../assets/images';
import globalStyle from '../../styles/globalStyle';

class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeSections: [], 
      isModalVisible: false, 
      isRateModalVisible: false, 
      correctData: [], 
      currentExtendedItem: null
    }
  }

  renderHeaderStyle(item){
    if(this.state.activeSections.length!= 0){
      if(this.state.currentExtendedItem==item.id){
        return globalStyle.extendedHeader
      }
      else {
        return globalStyle.normalHeader
      }
    }
    else {
      return globalStyle.normalHeader
    }
  }

  getRandomImage = (item) => {
    if(item.id%2 == 0){
      return <Image source={images.clock} style={{width: 30, height: 40}}/>
    }
    else if(item.id%3 == 0){
      return <Image source={images.house} style={{width: 30, height: 40}}/>
    }
    else {
      return <Image source={images.hourGlass} style={{width: 30, height: 40}}/>
    }
  }

  getImage = (item) =>{
    if(item.imagePath != null){
      return (
        <View style = {{ borderRadius: 4, marginTop: 5, marginBottom: 5, marginRight: 10, flex: 0.1}}>
          <Image source={{ uri: item.imagePath }} style={{width: 30, height: 40}}/>
        </View>
      );
    }
    else {
      return (
        <View style = {{borderStartColor: '#D1D1D1', borderRadius: 4, marginTop: 5, marginBottom: 5, marginRight: 10, flex: 0.1}}>
          {this.getRandomImage(item)}
        </View>
      );
    }
  }

  _renderHeader = item => {
    return (
      <View style={this.renderHeaderStyle(item)}>
        {this.getImage(item)}
        <View style={styles.middleContainer}>
          <Text style={globalStyle.title}>
            {item.title}
          </Text>
          <Text style={globalStyle.subtitle}>
            {item.whenDidIDoIt}
          </Text>
        </View>

      </View>
    );
  };

  /*
          <View style={{backgroundColor: '#D1D1D1', paddingRight: 4, borderRadius: 5, paddingLeft: 10, marginLeft: 40, flex: 0.5}}>
          <View style={styles.rateBtnContainer}>
            <TouchableOpacity style={{paddingRight: 10}} onPress={() =>  this.props.deleteFunc(item.id)}>
              <Image source={images.trash} style={{height: 35, width: 35}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingRight: 8}} onPress={() =>  this.props.editFunc(item.id)}>
              <Image source={images.edit2} style={{height: 35, width: 35}}/>
            </TouchableOpacity>
            <Image source={images.up} style={{height: 45, width: 45}}/>
          </View>
        </View>
  
  
  */

  renderNormalLine = (leftText, rightText) =>{
    return(
      <View style={stylesInfo.lineContainer}>
        <View style={stylesInfo.leftTextContainer}>
          <Text style={globalStyle.leftText}>{leftText}</Text>
        </View>
        <View style={stylesInfo.rightTextContainer}>
          <Text style={globalStyle.rightText}>{rightText}</Text>
        </View>
      </View>
    );
  }

  _renderContent = item => {
    return (
      <View style={globalStyle.content}>
        <View style={stylesInfo.sectionContainer}>
          {this.renderNormalLine('Description', item.description)}
        </View>
        <View style={stylesInfo.sectionContainer}>
          {this.renderNormalLine('When did I do it?', item.whenDidIDoIt)}
        </View>
        <View style={stylesInfo.sectionContainer}>
          {this.renderNormalLine('When should I do it again?', item.whenShouldIDoItAgain)}
        </View>
        <View style = {styles.lastSectionContainer}>
          <TouchableOpacity>
            <Text style = {styles.lastSectionText}>EDIT</Text>    
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _updateSections = position => {
    let item = this.props.data[position];
    let toSaveValue = null;

    if (item!=null){
     toSaveValue = item.id
    }

    this.setState({
      activeSections: position.includes(undefined) ? [] : position,
      currentExtendedItem: toSaveValue
    });
  };
  
  render() {
    const {data, deleteFunc, editFunc} = this.props;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>   
          <Accordion
            sections={data}
            activeSections={this.state.activeSections}
          // renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
            underlayColor = 'transparent'
          />
        </ScrollView>
      </View>
    )
  }
}

ReminderList.propTypes ={
    data: PropTypes.any.isRequired, 
    deleteFunc: PropTypes.func, 
    editFunc: PropTypes.func
}

export default ReminderList

const styles = StyleSheet.create({
  middleContainer:{
    flexDirection: 'column',
    flex: 0.7
  }, 
  rateBtnContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end', 
    flexDirection: 'row', 
    flex: 1
  }, 
})

const stylesInfo = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column', 
    borderBottomWidth: 1,
    borderColor: '#e6edf4', 
  }, 
  lineContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    flex: 1, 
    marginTop: 10, 
    marginBottom: 0
  }, 
  leftTextContainer:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  }, 
  rightTextContainer:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  }, 
  lastSectionContainer:{
    alignItems:'center', 
    justifyContent: 'center', 
    alignContent: 'center',
    flex: 1, 
  },
  lastSectionText:{
    color: '#81878d',
    //fontFamily: 'Nunito-ExtraBold',
    fontSize: 12,
  }, 
})