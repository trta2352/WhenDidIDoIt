import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    flexDirection: 'column', 
    alignContent: 'center',
    backgroundColor: '#F7FCF5'
  },
  //shown at the top of the screen
  mainTitleStyle:{
    fontSize: 22, 
    color: '#E63946', 
    fontWeight: 'bold',
  }, 
  inputContainer: {
    borderColor: '#475c7a', 
    borderWidth: 1, 
    borderRadius: 3, 
    marginTop: 10
  }, 
  inputContainerWithDate:{
    borderColor: '#475c7a', 
    borderWidth: 1, 
    borderRadius: 3, 
    marginTop: 10, 
    width: '85%'
  },
  //text inside input
  inputText: {
    fontSize: 12, 
  }, 
  inputFieldTitle: {
      fontSize: 17, 
      paddingTop: 10, 
      color: '#2D3142', 
      fontWeight: 'bold',
  }, 
});