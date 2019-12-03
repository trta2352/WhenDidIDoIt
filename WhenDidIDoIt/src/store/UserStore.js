import {observable, action, observer} from 'mobx';

class UserStore {
    @observable email = 'asdasdasd'; 
    @observable token = ''; 

    @action loadingCompleted(email, token){
        this.email = email;
        this.token = token;
    }
}

const userStore = new UserStore();
export default userStore;
