<template>
    <div class="layout-container">
        <Drawersetting @onToggleEvent="getToogleEvent" />
        <SideNavs :myToggle="myToggle"/>
        <div class="right-container" :style="{marginLeft:menuStore.isCollapse ? '64px' : '210px'}">
            <TopNavs />
    <div class="container">
        <Router-view></Router-view>
    </div>
</div>
</div>
    
</template>

<script setup>
    
import SideNavs from "@/components/SideNavs/index.vue"
import TopNavs from "@/components/TopNavs/index.vue"
import { useMenuStore } from "@/stores/menuStore.js";
import { useLoginStore } from "@/stores/loginStore.js";
import { onMounted,ref} from "vue";
import api  from "@/api/index.js";
import { useRouter } from "vue-router";
import manageRouter from "@/router/dynamicrouter";
import Drawersetting from "@/components/DrawerSetting/index.vue"

const menuStore = useMenuStore()
const loginStore = useLoginStore()
const router = useRouter()
const myToggle = ref(false)

//用户權限數據獲取
onMounted(() =>{
    api.getRouter({
        user:loginStore.permission
    }).then(res =>{
        if(res.data.status === 200){
         menuStore.menus = res.data.menuData.menus
         //判斷當前用戶權限
         if(loginStore.permission === "admin"){
            router.addRoute('Layout',manageRouter)
         }
        }
    }).catch(err =>{
        console.log(err);
    })
})

const getToogleEvent = (data) =>{
    myToggle.value = data
}

</script>

<style scoped>

.right-container{
    transition: 0.3 ease-in;
    margin-left: 210px;
    /* padding: 20px; */
}

.container{
    padding: 10px;
}

</style>