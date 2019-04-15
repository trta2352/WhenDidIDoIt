/*This button type will be used as=
    - registracija
    - ustvari račun
    - pošlji

*/

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome'

class ButtonType2 extends React.Component {
	render() {
    const { text, onPress, width, height, textSize, borderColor='#f99d32', textColor = '#f99d32', fontFamily = 'OpenSans-SemiBold', backgroundColor = 'transparent'} = this.props;
		return (
          <TouchableOpacity 
            style={{
               /* paddingTop: 13,
                paddingBottom: 13,*/
                backgroundColor: backgroundColor,
                borderRadius:23, 
                borderColor: borderColor,
                borderWidth: 2,
                width: this.props.width, 
                height: this.props.height, 
                alignContent: 'center', 
                justifyContent: 'center'
            }} 
            onPress={() => onPress()} >
             <Text 
                style={{
                    fontSize:this.props.textSize,
                    color: textColor,
                    textAlign: 'center',
                    //fontFamily: fontFamily,
                    }}>
                {text}</Text>
		  </TouchableOpacity>
		);
	}
}

ButtonType2.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired, 
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, 
  textSize: PropTypes.number.isRequired, 
  borderColor: PropTypes.string, 
  textColor: PropTypes.string, 
  fontFamily: PropTypes.string, 
  backgroundColor: PropTypes.string
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
	color: '#f99d32',
    textAlign: 'center',
    //fontFamily: 'OpenSans-Bold',
  },
  
  buttonStyle: {
    paddingTop: 13,
    paddingBottom: 13,
	  backgroundColor: 'transparent',
    borderRadius:23,
    borderColor: '#f99d32',
  }
});

export default ButtonType2;