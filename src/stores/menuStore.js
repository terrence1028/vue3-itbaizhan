import { defineStore } from "pinia";
export const useMenuStore = defineStore('menu',{
    state:() =>{
        return {
            isCollapse:false,
            breadcumb:"首頁",
            menus:[]

        }
    },
     //本地持久化
     persist:{
        enabled:true,
        strategies:[
            {
                key:"menus", //自定義的值，存儲到本地的key
                storage:localStorage //選擇存儲方式
            }
        ]   
    }
})