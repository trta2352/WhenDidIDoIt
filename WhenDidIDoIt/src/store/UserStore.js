import {observable, action, observer} from 'mobx';

class UserStore {
    constructor(rootStore) {
        this.routerStore = rootStore;
    }
    @observable id = -1; 
    @observable email = ''; 
    @observable token = ''; 

    @action loadingCompleted(id, email, token){
        this.email = email;
        this.token = token;
    }
}

export default UserStore;
