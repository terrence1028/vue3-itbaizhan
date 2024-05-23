import { defineStore } from "pinia"

export const useSystemStore = defineStore('system', {
    state: () => {
        return {
            toggleStore: true
        }
    },
    //本地持久化
    persist:{
       enabled:true,
       strategies:[
           {
               key:"system", //自定義的值，存儲到本地的key
               storage:localStorage //選擇存儲方式
           }
       ]   
   }
})


