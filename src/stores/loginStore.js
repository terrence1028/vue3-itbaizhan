import { defineStore } from "pinia";

export const useLoginStore = defineStore("login",{
    state:() =>{
        return{
            token:"",
            permission:"",
            username:""
        }
    },
    //本地持久化
    persist:{
        enabled:true,
        strategies:[
            {
                key:"login", //自定義的值，存儲到本地的key
                storage:localStorage //選擇存儲方式
            }
        ]
    }
})