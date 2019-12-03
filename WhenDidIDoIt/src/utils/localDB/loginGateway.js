import AsyncStorage from '@react-native-community/async-storage'

const LoginGateway = {
    isUserLoggedIn: async function(){
        try{
            const value = await AsyncStorage.getItem('@StoreWhenDidIDoIt:loginInfo');
            if(value !== null){
                const loadedUser = JSON.parse(value);
                if(loadedUser.token != null && loadedUser.email != null)
                    return loadedUser
            }
            else
                return false
        }
        catch(error){
            return false;
        }
    },
    saveUserInfo: async function(userInfo){
        try {
            const result = await AsyncStorage.setItem('@StoreWhenDidIDoIt:loginInfo', JSON.stringify(userInfo));
            return true;
          } 
          catch (error) {
            return false 
          }
    }, 
    logout: async function(){
        try{
            const result = await AsyncStorage.setItem('@StoreWhenDidIDoIt:loginInfo', '');
            return true
        }
        catch(error){
            return false

        }

    }
}

export default LoginGateway;