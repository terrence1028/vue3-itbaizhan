/**

存放所有網絡請求地址
*/
const base = {
baseUrl: "http://localhost:3000", // 公共地址
login: "/api/login", // 登錄地址
router: "/api/router", // 用戶權限地址
line: "/api/line", // 圖表 Line 地址
projectInfo: "/api/project/all", // 隧道資訊獲取
search: "/api/project/search", // 搜索地址
total: "/api/project/total", // 總條數
addProject: "/api/project/add", // 添加隧道
delProject: "/api/project/del", // 刪除隧道
preProject: "/api/project/update/pre", // 隧道預更新
updateProject: "/api/project/update/", // 隧道更新
tunnelList: "/api/tunnel/list", // 隧道設計資訊-tree-一級
tunnelListChild: "/api/tunnel/list/child",// 隧道設計資訊-tree-二級
tunnelContent: "/api/tunnel/content", // 隧道設計資訊-content
uploadTunnelContent: "/api/tunnel/content/url", // 隧道設計資訊-content-上傳
pdfPreView: "/api/tunnel/pdf", // PDF預覽
userList: "/api/user/list", // 用戶列表
searchUser: "/api/user/search", // 用戶搜索
addUser: "/api/user/add", // 用戶添加
delUser: "/api/user/del", // 用戶刪除
preViewUser: "/api/user/preview", // 用戶預更新
updateUser: "/api/user/update", // 用戶修改
};
