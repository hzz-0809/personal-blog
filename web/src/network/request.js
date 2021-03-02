import axios from 'axios';
import { Loading, Notification } from 'element-ui';
import store from "../store";

let loading = null;//接收Loading.service返回的实例
let baseOptions = {
    text: "拼命加载中...",
    background: "rgba(255, 255, 255, 0.6)",
}


//用户
export function userRequest(config, defaultLoading = false, loadingOptions) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:3344/user',
        // baseURL: 'http://115.29.177.15:3344/user',
        timeout: 5000
    })

    //axios请求拦截
    instance.interceptors.request.use(config => {
        if (loadingOptions) {
            for (const key in loadingOptions) {
                baseOptions[key] = loadingOptions[key]
            }
        }
        //开启加载动画
        if (defaultLoading) loading = Loading.service(baseOptions);

        let token = store.state.token;
        if (token) {
            config.headers.authorization = "Bearer " + token;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })

    //axios响应拦截拦截
    instance.interceptors.response.use(res => {
        //关闭加载动画
        if (loading) loading.close();
        //统一错误处理
        if (!res.data.status) {
            Notification.error({
                title: "错误",
                message: res.data.msg,
                duration: 2000,
            });
        }
        return res;
    }, error => {
        if (loading) loading.close();

        if (error.response.status === 401) {
            Notification.error({
                title: "错误",
                message: `${error.response.status}:${error.response.data.msg}`,
                duration: 2000,
            });
            store.commit("delToken");
        }
        return Promise.reject(error);
    })

    return instance(config);
}


//博主
export function adminRequest(config, defaultLoading = false, loadingOptions) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:3344/hzz',
        // baseURL: 'http://115.29.177.15:3344/hzz',
        timeout: 5000
    })

    //axios请求拦截
    instance.interceptors.request.use(config => {
        if (loadingOptions) {
            for (const key in loadingOptions) {
                baseOptions[key] = loadingOptions[key]
            }
        }
        //开启加载动画
        if (defaultLoading) loading = Loading.service(baseOptions);

        let token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.authorization = "Bearer " + token;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })

    //axios响应拦截拦截
    instance.interceptors.response.use(res => {
        //关闭加载动画
        if (loading) loading.close();
        //统一错误处理
        if (!res.data.status) {
            Notification.error({
                title: "错误",
                message: res.data.msg,
                duration: 2000,
            });
        }
        return res;
    }, error => {
        if (loading) loading.close();

        if (error.response.status === 401) {
            Notification.error({
                title: "错误",
                message: `${error.response.status}:${error.response.data.msg}`,
                duration: 2000,
            });
            localStorage.removeItem("adminToken");//清除token
        }
        return Promise.reject(error);
    })

    return instance(config);
}
