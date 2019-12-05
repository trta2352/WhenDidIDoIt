import fetchHelper from './fetchHelper.js'
import NetInfo from '@react-native-community/netinfo';

const FetchController = {
    post: async function(PATH, body){
        try {
            var promise = new NetInfo.fetch().then(state => {
                if (state.type != 'none' && state.type != 'unknown') {
                    return fetchHelper.post(PATH, body).then((value) =>{
                        return value;
                    })
                   
                } else {
                   return false;
                }
            })
            return promise
        } catch (error) {
            return false;
        }
    },
    put: async function(PATH, body){
        try {
            var promise = new NetInfo.fetch().then(state => {
                if (state.type != 'none' && state.type != 'unknown') {
                    return fetchHelper.put(PATH, body).then((value) =>{
                        return value;
                    })
                   
                } else {
                   return false;
                }
            })
            return promise
        } catch (error) {
            return false;
        }
    },
    delete: async function(PATH, body){
        try {
            var promise = new NetInfo.fetch().then(state => {
                if (state.type != 'none' && state.type != 'unknown') {
                    return fetchHelper.delete(PATH, body).then((value) =>{
                        return value;
                    })
                   
                } else {
                   return false;
                }
            })
            return promise
        } catch (error) {
            return false;
        }
    },
}

export default FetchController;