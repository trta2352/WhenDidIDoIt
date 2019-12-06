import {observable, action, observer} from 'mobx';
import FetchController from '../utils/api/fetchController'
import TasksGateway from '../utils/localDB/tasksGateway';
import { USER_GET_ALL_TASK, TASK } from '../utils/api/apiConstants';
import SupportFun from '../utils/supportFunction.js'

class TaskStore {
    @observable tasks = [];
    @observable sortedTasks = []
    @observable completedTasks = [];

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
                    this.sortedTasks = this.tasks.filter((task) => task.isDone == false)

                    this.sortCompletedTasks();
                })
            }
        })
    }

    async sortCompletedTasks (){
        this.completedTasks = this.tasks.filter((task) => task.isDone == true)
    }

    @action async saveNewTask(newTask){
        console.log("to je new task, ki ga noter dobil")
        console.log(newTask)
        this.sortedTasks.push(newTask)
        this.sortedTasks  = this.sortedTasks;
        this.tasks.push(newTask)

        await FetchController.post(TASK, newTask).then((response) =>{
            if(response.status == 200){
                response.json().then((value) =>{
                    console.log("To pa je potem vrnil strećnik")
                    console.log(value)
                    TasksGateway.saveTasks(value)

                    this.tasks.pop();
                    this.tasks.push(value)

                    this.sortedTasks.pop()
                    this.sortedTasks.push(value)
                })
            }
        })
    }

    @action async taskWasChecked(task) {
        let newArray = this.tasks.map((item) => {
            if (item.taskNum == task.taskNum) {
              item.isDone = true
            }
            return  SupportFun.getJSobjectFromProxy(item)
        })
       
        let sortedFilteredArray = this.sortedTasks.filter((item) => item.taskNum != task.taskNum)

        this.tasks = newArray;
        this.sortedTasks = sortedFilteredArray;
        this.sortCompletedTasks()

        FetchController.put(TASK, task).then((response) =>{
        })
    }

    @action async updateTask(task){
        let newArray = this.tasks.map((item) => {
            if (item.taskNum == task.taskNum) {
              item.title = task.title
            }
            return  SupportFun.getJSobjectFromProxy(item)
        })

        let newSortedArray = this.sortedTasks.map((item) => {
            if (item.taskNum == task.taskNum) {
              item.title = task.title
            }
            return  SupportFun.getJSobjectFromProxy(item)
        })
        this.tasks = newArray;
        this.sortedTasks = newSortedArray;

        FetchController.put(TASK, task).then((response) =>{

        })
    }

    @action getNewTaskId(){
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

        FetchController.delete(TASK, {"id": task.id}).then((response) =>{
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
