import AsyncStorage from '@react-native-community/async-storage'

const TasksGateway = {
    saveTasks: async function(tasks){
        try {
            const result = await AsyncStorage.setItem('@StoreWhenDidIDoIt:tasks', JSON.stringify(tasks));
            return true;
          } 
          catch (error) {
            return false 
          }
    }, 
    loadTasks: async function(){
        try{
            const value = await AsyncStorage.getItem('@StoreWhenDidIDoIt:tasks');
            if(value !== null){
                const loadedTasks = JSON.parse(value);
                return loadedTasks
            }
            else
                return []
        }
        catch(error){
            return [];
        }
    }
}

export default TasksGateway;