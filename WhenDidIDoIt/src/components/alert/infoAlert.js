import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import Modal from 'react-native-modal';


class InfoAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state={
        }
      }

	render() {
		const { isVisible, callback, titleText='Manjkajoči podatki', subtitleText='Za napredovanje prosim vnesite vse potrebne podatke' } = this.props;
		return (
        <Modal 
            isVisible={isVisible} 
            backdropOpacity={ 0.4}
            style={styles.modal}>
            <View style={styles.modalElementsContainer}>
                <View style={styles.closeButton}>
                    <TouchableOpacity onPress={()=> callback()} style={{alignSelf: 'flex-end'}}>
                        <Image source={require('./img/close_grey.svg')} />
                    </TouchableOpacity>
                </View>
                <View  style={{alignItems: 'center'}}>
                    <Text style={styles.lostPasswordTitle}>{titleText}</Text>
                </View>
                <View style={{marginBottom: 30,}}>
                    <Text style={styles.subtitleTextStyle}>{subtitleText}</Text>
                </View>
            </View>
            </Modal>
    
		);
	}
}

InfoAlert.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired, 
    titleText: PropTypes.string, 
    subtitleText: PropTypes.string
};

const styles = StyleSheet.create({
    modal: {

    }, 
    modalElementsContainer:{
        backgroundColor: "#E8E8E8",
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
        color: '#2D3142', 
       // fontFamily: 'Nunito-Regular',
        fontSize: 24,
        marginBottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
    }, 
    subtitleTextStyle: {
        color: '#4F5D75', 
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

export default InfoAlert;