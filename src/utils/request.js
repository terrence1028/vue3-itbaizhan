import axios from "axios"
import qs from "querystring"

const errorHandle = (status,info) =>{
    switch(status){
        case 400:
            console.log("語義錯誤");
            break;
        case 401:
            console.log("服務器認證失敗");
            break;
        case 403:
            console.log("服務器請求拒絕執行");
            break;
        case 404:
            console.log("請撿查網絡地址");
            break;
        case 500:
            console.log("服務器發生意外");
            break;
        case 502:
            console.log("服務器無響應");
            break;
        default:
            console.log(info);
            break;
    }
}
/**
 * 創建Axios对象
 */
const instance = axios.create({
    timeout:5000
})

instance.interceptors.request.use(
    config =>{
        if(config.method === 'post' || config.method === "put"){
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => Promise.reject(error)
)
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error =>{
        const { response } = error;
        if(response){
            errorHandle(response.status,response.info)
        }else{
            console.log("網絡請求被中斷了");
        }
    }
)
export default instance
