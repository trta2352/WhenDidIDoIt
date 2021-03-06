import { MAIN_URL } from './apiConstants.js';
import { AUTH_KEY } from './config.js';

const FetchApi = {
    post: async function(PATH, body){
        try{
            return (
                fetch(MAIN_URL+PATH, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': this.getTokenOrAuthorizationKey()
                    }, 
                    body: JSON.stringify(body)
                    }).then((response) =>{
                        return response;
                })
            );
        }
        catch(error){
            console.log("post")
            console.log(error)
            return false;
        }
    },
    put: async function(PATH, body){
        try{
            return (
                fetch(MAIN_URL+PATH, {
                    method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': this.getTokenOrAuthorizationKey()
                    }, 
                    body: JSON.stringify(body)
                    }).then((response) =>{
                        return response;
                })
            );
        }
        catch(error){
            console.log("put")
            console.log(error)
            return false;
        }
    },
    delete: async function(PATH, body){
        try{
            return (
                fetch(MAIN_URL+PATH, {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': this.getTokenOrAuthorizationKey()
                    }, 
                    body: JSON.stringify(body)
                    }).then((response) =>{
                        return response;
                })
            );
        }
        catch(error){
            console.log("delete")
            console.log(error)
            return false;
        }
    },
    getTokenOrAuthorizationKey: function(){
        //TODO add token getter
       return AUTH_KEY
    }
}

export default FetchApi;