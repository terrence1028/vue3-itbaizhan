import axios from "../utils/request.js"
import base from "./base.js"

const api = {
    /**
     * 登錄
     */
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    /**
     * 用户權限
     */
    getRouter(params) {
        return axios.get(base.baseUrl + base.router, {
            params
        })
    },
    /**
     * 取得line圖表數據
     */
    getLine() {
        return axios.get(base.baseUrl + base.line)
    },
    /**
     * 讀取隧道資訊
     */
    projectInfo(params) {
        return axios.get(base.baseUrl + base.projectInfo,{
            params
        })
    },
    /**
     * 模糊查詢
     */
    getSearch(params){
        return axios.get(base.baseUrl + base.search,{
            params
        })
    },
    /**
     * 取得資料總條數
     */
    getTotal(){
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 添加隧道
     */
    getAddProject(params){
        return axios.get(base.baseUrl + base.addProject,{
            params
        })
    },
    /**
     * 删除隧道
     */
    getDelProject(params){
        return axios.get(base.baseUrl + base.delProject,{
            params
        })
    },
    /**
     * 隧道預更新
     */
    getPreProject(params){
        return axios.get(base.baseUrl + base.preProject,{
            params
        })
    },
    /**
     * 隧道更新
     */
    getUpdateProject(id,params){
        return axios.put(base.baseUrl + base.updateProject + id,params)
    },
    /**
     * 隧道設計信息-tree-一级
     */
    getTunnelList(){
        return axios.get(base.baseUrl + base.tunnelList)
    },
    /**
     * 隧道設計信息-tree-二级
     */
    getTunnelListChild(params){
        return axios.get(base.baseUrl + base.tunnelListChild,{
            params
        })
    },
    /**
     * 隧道設計信息-content
     */
    getTunnelContent(params){
        return axios.get(base.baseUrl + base.tunnelContent,{
            params
        })
    },
    /**
     * 隧道設計信息-content-上传
     */
    getUploadTunnelContent(params){
        return axios.get(base.baseUrl + base.uploadTunnelContent,{
            params
        })
    },
    /**
     * PDF預覽
     */
    getPdfPreView(params){
        return axios.get(base.baseUrl + base.pdfPreView,{
            params
        })
    },
    /**
     * 取得用户列表
     */
    getUserList(){
        return axios.get(base.baseUrl + base.userList)
    },
    /**
     * 搜索用户
     */
    getSearchUser(params){
        return axios.get(base.baseUrl + base.searchUser,{
            params
        })
    },
    /**
     * 用户添加
     */
    getAddUser(params){
        return axios.get(base.baseUrl + base.addUser,{
            params
        })
    },
    /**
     * 用户删除
     */
    getDelUser(params){
        return axios.get(base.baseUrl + base.delUser,{
            params
        })
    },
    /**
     * 用户預更新
     */
    getPreViewUser(params){
        return axios.get(base.baseUrl + base.preViewUser,{
            params
        })
    },
    /**
     * 用户修改
     */
    getUpdateUser(params){
        return axios.get(base.baseUrl + base.updateUser,{
            params
        })
    }
}

export default api
