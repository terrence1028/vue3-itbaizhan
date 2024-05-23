<template>
  <!-- 搜索与添加 start -->
  <div class="search">
    <span>項目狀態:</span>
    <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" size="large" placeholder="請輸入要搜索的信息">
    </el-input>
    <el-button @click="searchHandler" class="button" size="large" type="primary" plain>搜索</el-button>
    <el-button @click="addHandler" class="button" size="large" type="primary" plain>添加</el-button>
  </div>
  <!-- 搜索与添加 end -->
  <!-- 表格展示數據 start -->
  <el-table class="table" :data="projectInfo.list" :header-cell-style="headerClass" style="width: 100%">
    <el-table-column prop="name" label="項目名稱" width="180" />
    <el-table-column prop="number" label="項目編碼" width="120" />
    <el-table-column prop="money" label="項目金額" width="120" />
    <el-table-column prop="address" label="項目地址" width="150" />
    <el-table-column prop="duration" label="項目工期(月)" width="120" />
    <el-table-column :formatter="(value) => detaFormater(Number(value.startTime))" prop="startTime" label="開工時間"
      width="150" />
    <el-table-column :formatter="(value) => detaFormater(Number(value.endTime))" prop="endTime" label="终止時間"
      width="150" />
    <el-table-column prop="quantity" label="隧道數量" width="120" />
    <el-table-column prop="status" label="項目狀態" width="120">
      <template #default="scope">
        <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{
          statusHandle(scope.row.status)
          }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="remark" label="備注">
      <template #default="scope">
        <div v-html="scope.row.remark"></div>
      </template>
    </el-table-column>
    <el-table-column width="135" label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编輯</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 表格展示數據 end -->
  <!-- 分頁 start -->
  <div class="page">
    <el-pagination @current-change="currentChangeHandler" background layout="prev, pager, next,jumper"
      :default-page-size="defaultPageSize" :total="total" />
  </div>
  <!-- 分頁 end -->
  <!-- 添加对话框 start -->
  <el-dialog v-model="dialogAddVisible" title="添加隧道信息" width="35%" center>
    <el-form :inline="true" :model="addFormInfo">
      <el-form-item label="項目名稱">
        <el-input v-model="addFormInfo.name" placeholder="請輸入項目名稱"></el-input>
      </el-form-item>
      <el-form-item label="項目編碼">
        <el-input v-model="addFormInfo.number" placeholder="請輸入項目編碼"></el-input>
      </el-form-item>
      <el-form-item label="項目金額">
        <el-input v-model="addFormInfo.money" placeholder="請輸入項目金額"></el-input>
      </el-form-item>
      <el-form-item label="項目地址">
        <el-input v-model="addFormInfo.address" placeholder="請輸入項目地址"></el-input>
      </el-form-item>
      <el-form-item label="項目工期">
        <el-input v-model="addFormInfo.duration" placeholder="請輸入專案工期"></el-input>
      </el-form-item>
      <el-form-item label="開工時間">
        <el-date-picker value-format="x" v-model="addFormInfo.startTime" type="date" placeholder="請輸入開工時間">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="终止時間">
        <el-date-picker value-format="x" v-model="addFormInfo.endTime" type="date" placeholder="請輸入終止時間">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="隧道數量">
        <el-input v-model="addFormInfo.quantity" placeholder="請輸入隧道數量"></el-input>
      </el-form-item>
      <el-form-item label="項目狀態">
        <el-input v-model="addFormInfo.status" placeholder="'1' 施工中  -  '0' 已完工"></el-input>
      </el-form-item>
      <el-form-item label="項目備註">
        <TinymceEditor :options="options" @onDataEvent="getInfoEditorHandler" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="sureHandler">确定</el-button>
      </span>
    </template>
  </el-dialog>
 <!-- 新增對話框 end -->
  <!-- 編輯對話框 start -->
  <!-- destory-on-close:關閉對話框，直接銷毀對話框 -->
  <el-dialog destroy-on-close v-model="dialogEditorVisible" title="編輯隧道信息" width="35%" center>
    <el-form :inline="true" :model="editorFormInfo">
      <el-form-item label="項目名稱">
        <el-input v-model="editorFormInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="項目編碼">
        <el-input v-model="editorFormInfo.number"></el-input>
      </el-form-item>
      <el-form-item label="項目金額">
        <el-input v-model="editorFormInfo.money"></el-input>
      </el-form-item>
      <el-form-item label="項目地址">
        <el-input v-model="editorFormInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="項目工期">
        <el-input v-model="editorFormInfo.duration"></el-input>
      </el-form-item>
      <el-form-item label="開工時間">
        <el-date-picker value-format="x" v-model="editorFormInfo.startTime" type="date">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="终止時間">
        <el-date-picker value-format="x" v-model="editorFormInfo.endTime" type="date">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="隧道數量">
        <el-input v-model="editorFormInfo.quantity"></el-input>
      </el-form-item>
      <el-form-item label="項目狀態">
        <el-input v-model="editorFormInfo.status"></el-input>
      </el-form-item>
      <el-form-item label="項目備注">
        <TinymceEditor :editorID="editorID" :remark="editorFormInfo.remark" :options="options" @onDataEvent="updateEditorHandler" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取消</el-button>
        <el-button type="primary" @click="sureEditorHandler">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 編輯對話框 end -->
</template>
<script setup>
import api from "@/api/index.js";
import { onMounted, reactive, ref } from "vue";
import { detaFormater } from "@/utils/utils.js";
import TinymceEditor from "@/components/TinymceEditor/index.vue";

const projectInfo = reactive({
  list: [],
});

// 初始化總條數
const total = ref(0);
// 初始分頁顯示數量
const defaultPageSize = ref(15);

// 新增對話框控制器
const dialogAddVisible = ref(false);
// 編輯對話框控制器
const dialogEditorVisible = ref(false);
// 定義修改資料的唯一ID
const editorID = ref(0);

// 初始化新增對話框狀態
const addFormInfo = reactive({
  name: "",
  number: "",
  money: "",
  address: "",
  duration: "",
  startTime: "",
  endTime: "",
  quantity: "",
  status: "",
  remark: "",
});

// 初始化編輯對話框狀態
const editorFormInfo = reactive({
  name: "",
  number: "",
  money: "",
  address: "",
  duration: "",
  startTime: "",
  endTime: "",
  quantity: "",
  status: "",
  remark: "",
});

// 初始獲取頁面數據
onMounted(() => {
  http(1);
});

// 初始取得總條數
onMounted(() => {
  api.getTotal().then((res) => {
    if (res.data.status === 200) {
      total.value = res.data.result[0]["count(*)"];
    } else {
      total.value = 0;
    }
  });
});

// 搜尋初始化狀態條數
const searchInfo = ref("");

/**
 * 網路請求
 */
const http = (page) => {
  api
    .projectInfo({ page })
    .then((res) => {
      if (res.data.status === 200) {
        projectInfo.list = res.data.result;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * 隧道狀態文字
 */
const statusHandle = (status) => {
  return status === "1" ? "施工中" : "已完工";
};
/**
 * 設定表格頭部樣式
 */
const headerClass = () => {
  return {
    background: "#dcdcdc",
    color: "#999",
    fontWeight: 700,
  };
};
/**
 * 表格 編輯按鈕
 */
const handleEdit = (index, row) => {
  dialogEditorVisible.value = true;
  editorID.value = row.id;
  api
    .getPreProject({ id: row.id })
    .then((res) => {
      if (res.data.status === 200) {
        editorFormInfo.name = res.data.result.name;
        editorFormInfo.number = res.data.result.number;
        editorFormInfo.money = res.data.result.money;
        editorFormInfo.address = res.data.result.address;
        editorFormInfo.duration = res.data.result.duration;
        // 修改事件日期格式
        editorFormInfo.startTime = Number(res.data.result.startTime);
        editorFormInfo.endTime = Number(res.data.result.endTime);
        editorFormInfo.quantity = res.data.result.quantity;
        editorFormInfo.status = res.data.result.status;
        editorFormInfo.remark = res.data.result.remark;
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * 表格 删除按钮
 */
const handleDelete = (index, row) => {
  ElMessageBox.confirm("确定要删除當前數據嗎?", "删除數據庫", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 确定删除
      api.getDelProject({ id: row.id }).then((res) => {
        if (res.data.status === 200) {
          ElMessage({
            type: "success",
            message: res.data.msg,
          });
          // 刷新UI
          http(1);
        } else {
          ElMessage({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

/**
 * 搜尋按鈕
 */
const searchHandler = () => {
  console.log(searchInfo.value);
  api.getSearch({ search: searchInfo.value }).then((res) => {
    if (res.data.status === 200) {
      projectInfo.list = res.data.result;
    } else {
      projectInfo.list = [];
    }
  });
};

/**
 * 分頁事件
 */
const currentChangeHandler = (val) => {
  http(val);
};

/**
 * 新增對話框彈出事件
 */
const addHandler = () => {
  dialogAddVisible.value = true;
};

/**
 * 新增對話框 確定事件
 */
const sureHandler = () => {
  api
    .getAddProject({
      name: addFormInfo.name,
      number: addFormInfo.number,
      money: addFormInfo.money,
      address: addFormInfo.address,
      duration: addFormInfo.duration,
      startTime: addFormInfo.startTime,
      endTime: addFormInfo.endTime,
      quantity: addFormInfo.quantity,
      status: addFormInfo.status,
      remark: addFormInfo.remark,
    })
    .then((res) => {
      if (res.data.status === 200) {
        dialogAddVisible.value = false;
        // 重新整理頁面
        http(1);
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * 定義富文本編輯器寬高
 */
const options = {
  width: "100%",
  height: "300px",
};

/**
 * 富文本編輯器獲取數據事件
 */
const getInfoEditorHandler = (data) => {
  addFormInfo.remark = data;
};

/**
 * 修改提交富文本編輯器數據
 */
const updateEditorHandler = (data) => {
  editorFormInfo.remark = data;
};

/**
 * 確認修改事件
 */
const sureEditorHandler = () => {
  api
    .getUpdateProject(editorID.value, {
      name: editorFormInfo.name,
      number: editorFormInfo.number,
      money: editorFormInfo.money,
      address: editorFormInfo.address,
      duration: editorFormInfo.duration,
      startTime: editorFormInfo.startTime,
      endTime: editorFormInfo.endTime,
      quantity: editorFormInfo.quantity,
      status: editorFormInfo.status,
      remark: editorFormInfo.remark, // 富文本编輯器中的數據
    })
    .then((res) => {
      if (res.data.status === 200) {
        dialogEditorVisible.value = false;
        http(1);
      } else {
        ElMessage.error(res.data.msg);
      }
    });
};
const ni = () => {
  console.log(editorFormInfo.startTime);
};
</script>
<style scoped>
.search {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  background: #fff;
}

.search span {
  font-weight: 700;
}

.search .input {
  width: 300px;
}

.page {
  position: fixed;
  right: 10px;
  bottom: 10px;
}

.table {
  margin: -10px;
}
</style>
