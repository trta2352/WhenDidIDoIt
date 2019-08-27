import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column', 
    alignContent: 'center',
    backgroundColor: '#ffffff'
  },
  addNewReminderPlusBtn: {
    backgroundColor: '#8E2424', 
    padding: 10, 
    borderRadius: 50,
  },
  //shown at the top of the screen
  mainTitleStyle: {
    fontSize: 21, 
    color: '#7f7f7f', 
    fontWeight: 'bold',
    fontFamily: 'CooperHewitt-Bold', 
  }, 
  screeTitleStyle: {
    fontSize: 27, 
    color: '#064c5d', 
    fontWeight: 'bold',
    fontFamily: 'CooperHewitt-Bold', 
  },
  inputContainer: {
    borderColor: '#e5e5e5', 
    borderBottomWidth: 1,
    borderRadius: 3, 
    marginTop: 10
  }, 
  inputContainerWithDate:{
    borderColor: '#e5e5e5', 
    borderBottomWidth: 1,
    borderRadius: 3, 
    marginTop: 10, 
    width: '85%'
  },
  //text inside input
  inputText: {
    fontSize: 12, 
    fontWeight: 'bold',
    color: '#72767A',
    fontFamily: 'CooperHewitt-Light'
  }, 
  inputFieldTitle: {
    fontSize: 15, 
    paddingTop: 10, 
    color: '#7f7f7f', 
    //fontWeight: 'bold',
    fontFamily: 'CooperHewitt-Semibold'
  }, 
  //list
  leftText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'CooperHewitt-Medium',
  }, 
  rightText:{
    color: '#34445a',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'CooperHewitt-Medium',
  },
  //content container
  content: {
    padding: 10,
    backgroundColor: '#efefef',
    marginBottom: 10, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10
  },
  //header
  title: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'CooperHewitt-Book',
  }, 
  subtitle: {
    color: '#999999',
    paddingTop: 3, 
    fontSize: 13,
    fontFamily: 'CooperHewitt-Light',
  }, 
  normalHeader: {
    backgroundColor: '#e5e5e5',
    paddingLeft: 10,
    paddingRight: 10, 
    flexDirection: 'row', 
    borderWidth: 0,
    marginBottom: 10,
    alignItems: 'center',
    paddingTop: 10, 
    paddingBottom: 10,
    borderRadius: 20,
  }, 
  extendedHeader: {
    backgroundColor: '#ECEEF2',
    paddingLeft: 10,
    paddingRight: 10, 
    flexDirection: 'row', 
    borderWidth: 0,
    marginBottom: 0,
    alignItems: 'center',
    paddingTop: 10, 
    paddingBottom: 5,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20
  }, 
  lastSectionText: {
    color: '#81878d',
    fontFamily: 'CooperHewitt-Semibold',
    fontSize: 12,
  },
  //bottomTabNavigator
  bottomTabNavigator:{
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderTopColor: 'pink',
    borderTopWidth: 0,
    paddingTop: 20, 
    zIndex: 8, 
    position: 'absolute',
    width: '100%',
    bottom: 0,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: -3,
    },
    shadowColor: '#7BABED',
    elevation: 4,  
    shadowOpacity: 0.2
  }, 
  tabLabel:{
    color: 'black', 
    fontFamily: 'CooperHewitt-Medium',
    paddingTop: 5, 
    paddingBottom: 5
  }
});