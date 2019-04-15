/*This button type will be used as=
    - prijava
    - ustvari novo pošiljko

*/

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome'

class ButtonType1 extends React.Component {
	render() {
		const { text, onPress, width, height, textSize} = this.props;
		return (
          <TouchableOpacity 
            style={{
                paddingTop: 13,
                paddingBottom: 13,
                backgroundColor: '#0a1d30',
                borderRadius:23, 
                width: width, 
                height: height
            }} 
            onPress={() => onPress()} >
             <Text 
                style={{
                    fontSize: textSize,
                    color: '#ffffff',
                    textAlign: 'center',
                  //  fontFamily: 'OpenSans-Bold',
                    }}>
                {text}</Text>
		  </TouchableOpacity>
		);
	}
}

ButtonType1.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired, 
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, 
  textSize: PropTypes.number.isRequired
};
export default ButtonType1;