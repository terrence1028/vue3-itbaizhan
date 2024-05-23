<template>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
/* 公共樣式 */

body,html,#app{
  height: 100%;
}

/* 去掉element menu的右側邊框 */
.el-menu{
    border-right: 0 !important;
}
/* 修改diaolog的header樣式 */
/* 修改dialog的header样式 */
.el-dialog__header{
  background-color: #304156;
  margin-right: 0 !important;
  padding-bottom: 10px !important;
}

.el-dialog__header span{
  color: #fff;
}
/* tree 选中样式修改 */
.is-current .el-tree-node__content{
  background-color: #337ecc !important;
  color: #fff;
}

</style>