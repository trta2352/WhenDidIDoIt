import {AsyncStorage} from 'react-native';


const Storage = {
    getAll: async function(){
        try{
            var itemArray = []
            const items = await AsyncStorage.getAllKeys();

                const hjkl = await AsyncStorage.multiGet(items, (err, stores) => {
                  stores.map((result, i, store) => {
                    let key = store[i][0];
                    let value = store[i][1];

                    itemArray.push(JSON.parse(value));
                  });
                
              });

              itemArray = itemArray.sort(function(a, b){return a.id - b.id});
              return itemArray
        }
        catch(error){
            return false;
        }
    },
    getLastKey: async function(){
        try{
            var itemArray = []
            const items = await AsyncStorage.getAllKeys();
            var ints= items.map(parseFloat);
            
            var maxID = Math.max(...ints);
            if(items.length==0){
                return 1
            }
            else {
                return maxID+1;
            }
        }
        catch(error){
            return false;
        }
    },
    save: async function(reminder){
        try {
              AsyncStorage.setItem(reminder.id.toString(), JSON.stringify(reminder), () => {
                return true;
              });
              return true;
          } 
          catch (error) {
              console.log(error)
            return false
          }
    }, 
    remove: async function(id){
        try{
            const result = await AsyncStorage.removeItem(id.toString());
            return true
        }
        catch(error){
            return false
        }

    }, 
    cleanStorage: async function(){
        try{
            const result = await AsyncStorage.clear()
            return true
        }
        catch(error){
            return false

        }
    }
}

export default Storage;