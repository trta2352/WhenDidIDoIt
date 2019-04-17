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
        return {
          backgroundColor: '#457B9D',
          paddingLeft: 10,
          paddingRight: 10, 
          flexDirection: 'row', 
          borderWidth: 0,
          marginBottom: 0,
          alignItems: 'center',
          paddingTop: 10, 
          paddingBottom: 5,
          borderTopLeftRadius: 5, 
          borderTopRightRadius: 5
        }
      }
      else {
        return {
          backgroundColor: '#457B9D',
          paddingLeft: 10,
          paddingRight: 10, 
          flexDirection: 'row', 
          borderWidth: 0,
          marginBottom: 10,
          alignItems: 'center',
          paddingTop: 10, 
          paddingBottom: 10,
          borderRadius: 5
        }
      }
    }
    else {
      return {
        backgroundColor: '#457B9D',
        paddingLeft: 10,
        paddingRight: 10, 
        flexDirection: 'row', 
        borderWidth: 0,
        marginBottom: 10,
        alignItems: 'center',
        paddingTop: 10, 
        paddingBottom: 10,
        borderRadius: 5
      }
    }
  }

  _renderHeader = item => {
    return (
      <View style={this.renderHeaderStyle(item)}>
          <View style={styles.middleContainer}>
            <Text style={styles.subtitle}>
              {item.title}
            </Text>
            <Text style={styles.title}>
              {item.whenDidIDoIt}
            </Text>
          </View>
          <View style={{backgroundColor: '#D1D1D1', paddingRight: 4, borderRadius: 5, marginLeft: 40, flex: 0.5}}>
            <View style={styles.rateBtnContainer}>
              <TouchableOpacity style={{paddingRight: 10}} onPress={() =>  this.props.deleteFunc(item.id)}>
                <Image source={require('./img/trash.svg')} style={{height: 35, width: 35}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingRight: 8}} onPress={() =>  this.props.editFunc(item.id)}>
                <Image source={require('./img/edit2.svg')} style={{height: 35, width: 35}}/>
              </TouchableOpacity>
              <Image source={require('./img/up.svg')} style={{height: 45, width: 45}}/>
            </View>
          </View>
      </View>
    );
  };

  renderNormalLine = (leftText, rightText) =>{
    return(
      <View style={stylesInfo.lineContainer}>
        <View style={stylesInfo.leftTextContainer}>
          <Text style={stylesInfo.leftText}>{leftText}</Text>
        </View>
        <View style={stylesInfo.rightTextContainer}>
          <Text style={stylesInfo.rightText}>{rightText}</Text>
        </View>
      </View>
    );
  }

  _renderContent = item => {
    return (
      <View style={styles.content}>
        <View style={stylesInfo.sectionContainer}>
          {this.renderNormalLine('Description', item.description)}
        </View>
        <View style={stylesInfo.sectionContainer}>
          {this.renderNormalLine('When did I do it?', item.whenDidIDoIt)}
        </View>
        <View style={stylesInfo.sectionContainer}>
          {this.renderNormalLine('When should I do it again?', item.whenShouldIDoItAgain)}
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
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    //backgroundColor: 'blue'
  }, 
 title: {
    color: 'white',
   // fontFamily: 'OpenSans-Semibold',
    paddingTop: 3, 
    fontSize: 13,
  }, 
  statusIconContainer: {
   //marginRight: 20, 
    flex: 0.2
  },
  middleContainer:{
    flexDirection: 'column',
    flex: 0.5
  }, 
  rateBtnContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end', 
    flexDirection: 'row', 
    flex: 1
  }, 
  subtitle: {
    color: '#1D3557',
   // fontFamily: 'OpenSans-Semibold',
    fontSize: 17,
    fontWeight: 'bold',
  }, 
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row', 
    borderWidth: 0,
    marginBottom: 10,
    alignItems: 'center',
    paddingTop: 20, 
    paddingBottom: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 10,
    backgroundColor: '#BBCFDB',
    marginBottom: 10
  },
})

const stylesInfo = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column', 
    borderBottomWidth: 1,
    borderColor: '#e6edf4', 
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
  leftText: {
    color: 'black',
    //fontFamily: 'OpenSans-Semibold',
    fontSize: 15,
  }, 
  rightTextContainer:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  }, 
  rightText:{
    color: '#34445a',
  //  fontFamily: 'OpenSans-Semibold',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10
  },
  rightTextBill:{
    color: '#34445a',
   // fontFamily: 'OpenSans-Semibold',
    fontSize: 14,
    paddingBottom: 10
  }, 
  rightTextBillContainer:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end', 
  }, 
  rightSpecialText:{
    color: '#a1acb6',
   // fontFamily: 'OpenSans-Semibold',
    fontSize: 14,
    paddingBottom: 10
  }
})