import {Dimensions} from 'react-native'

const SupportFun = {
    checkIfSelectedDatePassed: function(selectedDate){
        try {
            let currentDate = new Date();
            if(Date.parse(selectedDate) > currentDate){
                return false
            }
            else{
                return true
            }
        } catch (e) {
            console.log(e)
        }
    },
    formatDate: function(date){
        let formatedDate = date.toDateString();
        formatedDate = formatedDate + ', '+ date.getHours() +':'+ date.getMinutes()

        return formatedDate;
    },
    getTodaysDate: function(){
        let currentDate = new Date();
        return currentDate.toDateString();
    },
    getSortedTasks: function(tasks){
        let todaysTasks = [];
        let thisWeeksTasks = [];
        let laterTasks = [];
        let todaysDate = this.getTodaysDate()
        let endOfWeek = this.getLastDayOfWeek()
        for(let i = 0; i< tasks.length; i++){
            let date = tasks[i].whenShouldIDoItAgain.split(', ')[0]
            console.log("Date = "+date);
            console.log("today = "+todaysDate)
            if(date == todaysDate){
                todaysTasks.push(tasks[i]);
                continue;
            }
            else if(Date.parse(date) <= Date.parse(endOfWeek)){
                thisWeeksTasks.push(tasks[i])
            }
            else {
                laterTasks.push(tasks[i])
            }
        }

        let allTasks = {
            todays: todaysTasks, 
            thisWeek: thisWeeksTasks,
            later: laterTasks,
        }

        return allTasks;

    }, 
    getTodaysTasks: function(tasks){
        this.isTodaysDate()
        console.log(tasks);
       
        console.log("--"+date)
        console.log("LastDay of week"+ this.getLastDayOfWeek())
    },
    getThisWeeksTasks: function(taks){

    },
    getLaterTasks: function(taks){

    },
    getLastDayOfWeek: function (){
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); 
        var last = first + 7; // last day is the first day + 6

        var lastday = new Date(curr.setDate(last)).toUTCString();

       return lastday
    }, 
    scheduleNotification: function(){
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 60 * 1000) // in 60 secs
          });
    }
}

export default SupportFun;