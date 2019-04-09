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
    }
  }

  renderRateOrFollowBtn = (status) =>{
   
      return (
        <View style={{
          backgroundColor: '#f3f3f4', 
          height: 40, 
          width: 40, 
          borderRadius: 30, 
          justifyContent: 'center', 
          alignContent: 'center', 
          alignItems: 'center'
        }}><Text>3.7</Text></View>

      );
  
  }

  renderHeaderStyle(item){
    if(this.state.activeSections.length!= 0){
      if(this.state.activeSections[0]+1==item.id){
        console.log(this.state.activeSections)
        return {
          backgroundColor: '#ffffff',
          padding: 10,
          flexDirection: 'row', 
          borderWidth: 0,
          marginBottom: 0,
          alignItems: 'center',
          paddingTop: 20, 
          paddingBottom: 0,
        }
      }
      else {
        return {
          backgroundColor: '#ffffff',
          padding: 10,
          flexDirection: 'row', 
          borderWidth: 0,
          marginBottom: 10,
          alignItems: 'center',
          paddingTop: 20, 
          paddingBottom: 20,
        }
      }
    }
    else {
      return {
        backgroundColor: '#ffffff',
        padding: 10,
        flexDirection: 'row', 
        borderWidth: 0,
        marginBottom: 10,
        alignItems: 'center',
        paddingTop: 20, 
        paddingBottom: 20,
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
          <View style={styles.rateBtnContainer}>
           
            <Image source={require('./img/up.svg')} />
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
          {this.renderNormalLine('When should I do it again', item.whenShouldIDoItAgain)}
        </View>
      </View>
    );
  };

  _updateSections = item => {
    this.setState({
      activeSections: item.includes(undefined) ? [] : item,
    });
  };
  
  render() {
    const {data} = this.props;
    return (
      <View>
        <ScrollView>   
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
    data: PropTypes.any.isRequired
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
    color: '#b4bdc7',
   // fontFamily: 'OpenSans-Semibold',
    fontSize: 12,
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
    flex: 0.3, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
  }, 
  subtitle: {
    color: '#0a1d30',
   // fontFamily: 'OpenSans-Semibold',
    fontSize: 18,
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
    padding: 20,
    backgroundColor: '#fff',
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
    marginTop: 17, 
    marginBottom: 0
  }, 
  leftTextContainer:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  }, 
  leftText: {
    color: '#a4acb5',
    //fontFamily: 'OpenSans-Semibold',
    fontSize: 12,
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