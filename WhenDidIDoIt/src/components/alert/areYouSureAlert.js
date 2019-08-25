import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import Modal from 'react-native-modal';

import Button from '../buttons/addBtn';
import images from '../../assets/images';
import colors from '../../styles/colors';

class AreYouSureAlert extends React.Component {
    constructor(props) {
        super(props);
      }

	render() {
		const { isVisible, callback, titleText='Delete reminder', subtitleText='Are you sure you want to delte this item?', choiceBtn, leftBtnTitle = 'Prekliči', rightBtnTitle = 'Shrani' } = this.props;
		return (
        <Modal 
            isVisible={isVisible} 
            backdropOpacity={ 0.4}
            style={styles.modal}>
            <View style={styles.modalElementsContainer}>
                <View style={styles.closeButton}>
                    <TouchableOpacity onPress={()=> callback()} style={{alignSelf: 'flex-end'}}>
                        <Image source={images.closes} />
                    </TouchableOpacity>
                </View>
                <View  style={{alignItems: 'center'}}>
                    <Text style={styles.lostPasswordTitle}>{titleText}</Text>
                </View>
                <View style={{marginBottom: 30,}}>
                    <Text style={styles.subtitleTextStyle}>{subtitleText}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 40, paddingRight: 40, paddingBottom: 20}}>
                    <Button text={leftBtnTitle}
                        onPress = {()=> choiceBtn(false)}
                        width = {110}
                        height = {46}
                        backgroundColor = {colors.cancelBtnBackground}
                        textColor = {colors.cancelBtnText}
                        textSize = {14}/>
                    <Button 
                        text={rightBtnTitle}
                        onPress = {()=> choiceBtn(true)}
                        width = {110}
                        height = {46}
                        backgroundColor = {colors.addBtnBackground}
                        textColor = {colors.addBtnText}
                        textSize = {14}/>
                </View>
            </View>
            </Modal>
    
		);
	}
}

AreYouSureAlert.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired, 
    titleText: PropTypes.string, 
    subtitleText: PropTypes.string, 
    choiceBtn: PropTypes.func.isRequired, 
    leftBtnTitle: PropTypes.string, 
    rightBtnTitle: PropTypes.string
};

const styles = StyleSheet.create({
    modal: {

    }, 
    modalElementsContainer:{
        backgroundColor: "#F7FCF5",
        borderColor: "rgba(0, 0, 0, 0.1)",
        flexDirection: 'column',
        borderRadius: 10,
        textAlign: 'center',
    }, 
    closeButton:{
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        marginTop: 20,
        marginBottom: 20, 
        marginRight: 20
    }, 
    lostPasswordTitle:{
        color: '#34445a', 
        //fontFamily: 'Nunito-Regular',
        fontSize: 24,
        marginBottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
    }, 
    subtitleTextStyle: {
        color: '#a4acb5', 
        //fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 30, 
        marginRight: 30
    }, 
    inputField:{
        marginBottom: 20, 
        marginRight: 20, 
        marginLeft: 20, 
        marginTop:32,
        justifyContent: 'center', 
        alignItems: 'center',
    }, 
    sendButton:{
        marginBottom: 40,
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

export default AreYouSureAlert;