import {observable, action, observer} from 'mobx';
import FetchHelper from '../utils/api/fetchController'
import TasksGateway from '../utils/localDB/tasksGateway';
import { USER, USER_GET_ALL_TASKS } from '../utils/api/apiConstants';

class TaskStore {
    @observable tasks = []; 

    constructor(rootStore) {
        this.routerStore = rootStore;
    }
    //used for loading data from api
    @action async loadTasksFromLocalStore(){
        //let localTasks = await TasksGateway.loadTasks();
        let fkUser = this.routerStore.userStore.id;
        console.log("loadTasksFromLocalStore")
        console.log("this is the id")
        console.log(fkUser)
        FetchHelper.post(USER_GET_ALL_TASKS, {"fkUser": fkUser}).then((response) =>{
            if(response.status == 200){
                response.json().then((apiTasks) =>{
                    console.log("Jabadabadu")
                    console.log(apiTasks)
                    this.tasks = apiTasks;
                })
            }
        })
    }

    @action async saveNewTask(newTask){
        //save to local storage
        this.tasks.push(newTask)

        await FetchHelper.post(USER, newTask).then((response) =>{
            console.log("New tasks value returned from api")
            console.log(response)
            if(response.status == 200){
                response.json().then((value) =>{
                    TasksGateway.saveTasks(value)
                    this.tasks.pop();
                    this.tasks.push(value)
                })
            }
        })
    }
}

export default TaskStore;
