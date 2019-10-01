import {Dimensions} from 'react-native'

const SupportFun = {
    checkIfSelectedDatePassed: function(selectedDate){
       let currentDate = new Date();

       if(Date.parse(selectedDate) > currentDate){
           return false
       }
       else{
           return true
       }

    },
    formatDate: function(date){
        let formatedDate = date.toDateString();
        formatedDate = formatedDate + ', '+ date.getHours() +':'+ date.getMinutes()

        return formatedDate;
    }
}

export default SupportFun;