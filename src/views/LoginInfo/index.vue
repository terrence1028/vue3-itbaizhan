<template>
    <div class="login-Container">
        <el-form class="user" size="large" :model="user">
            <div class="title-container">
                <h3 class="title">隧道後台管理系統</h3>
            </div>
            <el-form-item prop="username">
                <el-input  :prefix-icon="User" type="text" v-model="user.username" placeholder="請輸入用戶名稱" name="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="Lock" type="password" v-model="user.password" placeholder="請輸入密碼" name="password"></el-input>
            </el-form-item>
            <el-button style="width:100%;margin-bottom:30px" type="primary"
                @click.native.prevent="handleLogin">登錄</el-button>
        </el-form>
    </div>
</template>
<script setup>

import { reactive } from "vue";
import { User,Lock } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { useLoginStore } from "@/stores/loginStore.js"
import { useRouter } from "vue-router";


//登錄倉庫對象
const loginStore = useLoginStore()
//獲取路由對象
const router = useRouter()

//聲明用戶信息
const user = reactive({
    username: "",
    password: ""
})

//登錄事件
const handleLogin = () => {
    api.getLogin({
        username: user.username,
        password: user.password
    }).then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
            loginStore.token = res.data.token
            loginStore.username = res.data.username
            loginStore.permission = res.data.permission
            router.push("/")
        } else {
                ElMessage.error(res.data.msg)
            }
        })
}

</script>

<style scoped>
.login-Container {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}

.user {
    position: relative;
    width: 400px;
    padding: 160px 35px 0;
    margin: 0 auto;
}

.title-container .title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin: 20px;
}
</style>