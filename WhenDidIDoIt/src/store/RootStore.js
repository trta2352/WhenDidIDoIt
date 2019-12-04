import UserStore from './UserStore.js';
import TaskStore from './TaskStore.js'


class RootStore {
    constructor() {
        this.userStore = new UserStore(this)
        this.taskStore = new TaskStore(this)
    }
}

export default RootStore;