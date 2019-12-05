import {observable, action, observer} from 'mobx';
import FetchController from '../utils/api/fetchController'
import TasksGateway from '../utils/localDB/tasksGateway';
import { USER_GET_ALL_TASK, TASK } from '../utils/api/apiConstants';
import SupportFun from '../utils/supportFunction.js'

class TaskStore {
    @observable tasks = [];
    @observable sortedTasks = []

    constructor(rootStore) {
        this.routerStore = rootStore;
    }
    //used for loading data from api
    @action async loadTasksFromLocalStore(){
        //let localTasks = await TasksGateway.loadTasks();
        let fkUser = this.routerStore.userStore.id;
        FetchController.post(USER_GET_ALL_TASK, {"fkUser": fkUser}).then((response) =>{
            if(response.status == 200){
                response.json().then((apiTasks) =>{
                    this.tasks = apiTasks;
                    this.sortedTasks = apiTasks;
                })
            }
        })
    }

    @action async saveNewTask(newTask){

        this.tasks.push(newTask)
        this.sortedTasks.push(newTask)

        await FetchController.post(TASK, newTask).then((response) =>{
            if(response.status == 200){
                response.json().then((value) =>{
                    TasksGateway.saveTasks(value)

                    this.tasks.pop();
                    this.tasks.push(value)

                    this.sortedTasks.pop()
                    this.sortedTasks.push(value)
                })
            }
        })
    }

    @action async updateTask(task){
        console.log("updateTask")
        console.log(task)
        let newArray = this.tasks.map((item) => {
            if (item.id == task.id) {
              item.title = task
            }
            return  SupportFun.getJSobjectFromProxy(item)
        })

        let newSortedArray = this.sortedTasks.map((item) => {
            if (item.id == task.id) {
              item.title = task
            }
            return  SupportFun.getJSobjectFromProxy(item)
        })
        this.tasks = newArray;
        this.sortedTasks = newSortedArray;

        console.log(newArray)
        console.log(newSortedArray)

        FetchController.put(TASK, task).then((response) =>{
            console.log("This is the response that i got from the put method")
            console.log(response)
        })
    }

    getNewTaskId(){
        if(this.tasks.length == 0){
            return 1
        }
        else {
            return this.tasks[this.tasks.length-1].taskNum + 1
        }
    }

    @action async removeTask(task){
        let filteredArray = this.tasks.filter((item) => item.taskNum != task.taskNum)
        let sortedFilteredArray = this.sortedTasks.filter((item) => item.taskNum != task.taskNum)

        this.tasks = filteredArray;
        this.sortedTasks = sortedFilteredArray;
        
        console.log("this task was pressed")
        console.log(task)

        FetchHelper.delete(TASK, {"id": task.id}).then((response) =>{
            console.log("well this is the response from the supposedly deleted task. But we will see how it really is");
            console.log(response)
        })
    }
    
    @action sortTasks = (text) =>{
        let searchString = text.toLowerCase();
        let sortedTasks = this.tasks.filter((task) => task.title.toLowerCase().includes(searchString));
        this.sortedTasks = sortedTasks
    }

    resetSortedTasks = () => {
        this.sortedTasks = this.tasks
    }
}

export default TaskStore;
