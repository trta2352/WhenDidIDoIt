/*This button type will be used as=
    - prijava
    - ustvari novo pošiljko

*/

import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

class AddBtn extends React.Component {
	render() {
		const { text, onPress, width, height, textSize, backgroundColor ='#8fb9a8', textColor='#ffffff'} = this.props;
		return (
      <TouchableOpacity 
        style={{
          paddingTop: 13,
          paddingBottom: 13,
          backgroundColor: backgroundColor,
          borderRadius:23, 
          width: width, 
          height: height
        }} 
        onPress={() => onPress()} >
         <Text 
          style={{
            fontSize: textSize,
            color: textColor, 
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'CooperHewitt-Bold',
          }}>
          {text}</Text>
		  </TouchableOpacity>
		);
	}
}

AddBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired, 
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, 
  textSize: PropTypes.number.isRequired, 
  backgroundColor: PropTypes.string, 
  textColor: PropTypes.string
};
export default AddBtn;
