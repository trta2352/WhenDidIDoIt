import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import { CheckBox } from 'react-native-elements';
import Image from 'react-native-remote-svg'
import images from '../assets/images';

class CameraScreen extends PureComponent {
constructor(props){
  super(props)

  this.state ={
    flashOn: false
  }
}

  getCheckedCheckBoxView = () =>{
    return (
      <View>
        <Image source={images.flashOn}/>
      </View>
      
    );
  }

  getUncheckedCheckBoxView = () =>{
    return (
      <View>
        <Image source={images.flashOff}/>
      </View>
      
    );
  }

  getCorrectFlashMode = () =>{
    if(this.state.flashOn){
      return 'on'
    }
    else {
      return 'off'
    }
  }
/*
  openGallery = () =>{
    console.log("Sem v openGallert()")
    CameraRoll.getPhotos({
      first: 10,
      groupTypes: 'All', 

    }).then((photo) =>{
      console.log("Sem v returnu")
      console.log(photo)
    })
  }*/

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.getCorrectFlashMode()}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <TouchableOpacity 
          onPress = {()=>{this.props.navigation.navigate('AddReminder')}} 
          style = {{
            backgroundColor: '#e6e6e6',
            position: 'absolute', 
            borderRadius: 30, 
            height: 30, 
            width: 30, 
            padding: 5, 
            marginTop: 30, 
            marginLeft: 20}}>
          <Image source = {images.x} style = {{flex: 1, height: '100%', width: '100%'}}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          <View>
            <CheckBox 
              title={<Text></Text>}
              checked={this.state.flashOn}
              containerStyle = {{backgroundColor: '#e6e6e6'}}
              checkedIcon={this.getCheckedCheckBoxView()}
              uncheckedIcon={this.getUncheckedCheckBoxView()}
              onPress ={() => this.setState({ flashOn: !this.state.flashOn })}
              />
          </View>
          <View>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={{backgroundColor: '#e6e6e6', borderRadius: 20, height: 100, width: 100, padding: 5}}>
              <Image source={images.camera} style = {{flex: 1, height: '100%', width: '100%'}}/>
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox 
              title = {<Text></Text>}
              checked = {true}
              containerStyle = {{backgroundColor: '#e6e6e6'}}
              checkedIcon = {<Image source={images.folder} />}
              uncheckedIcon = {<Image source={images.folder} />}
              onPress = {() => console.log("")/*this.openGallery()*/}
              />
          </View>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri, 'photo').then(() => {
        this.props.navigation.navigate('AddReminder')
      })
    }
  };
}

export  default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
