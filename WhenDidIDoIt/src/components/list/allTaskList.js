import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  FlatList,
} from 'react-native'
import {
  Icon
} from 'react-native-elements'
import PropTypes from 'prop-types';
import SupportFun from '../../utils/supportFunction';

class AllTaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], 
      pressedItem: null, 
      choosenAnswer: null
    }
  }

  renderItem = ({item}) =>{

    return(
      <View style = {styles.itemStyle}
        onPress = {() => 
          { 
          }
        }>
        <View style={styles.valueContainer}>
          <Text style={styles.titleText}>
            {item.title}
          </Text>
          <View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              <Icon type="feather" name = "plus-circle" color = {"#251947"} style = {{width: 20, height: 20}}/>
              <Text style ={styles.dateText}>{SupportFun.convertTimeToString(item.createdOn)}</Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              <Icon type="feather" name = "check-circle" color = {"#251947"} />
              <Text style ={styles.dateText}>{SupportFun.convertTimeToString(item.updatedOn)}</Text>
            </View>
          </View>
       

        </View>
      </View>
    )
    
  }

  render() {
    const {data} = this.props;
    return (
      <View style ={{flex: 1}}>   
        <FlatList
          keyExtractor={item => item.taskNum}
          data = {data}
          renderItem = {this.renderItem}
          style = {styles.flatListStyle}
        />
      </View>
    )
  }
}

AllTaskList.propTypes ={
  data: PropTypes.any.isRequired, 
}

export default AllTaskList

const styles = StyleSheet.create({
  flatListStyle: {
    borderTopWidth: 0,
    borderTopColor: '#e6edf4',
    width: '100%',
  },
  itemStyle: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderWidth: 0,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 3, 
  },
  valueContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: "space-between", 
    alignItems: 'center',
    padding: 5, 
    borderRadius: 10
  },
  titleText: {
    fontFamily: 'roboto-Bold',
    fontSize: 13,
  },
  dateText: {
    color: 'black',
    fontFamily: 'roboto-Regular',
    fontSize: 12,
  },
})