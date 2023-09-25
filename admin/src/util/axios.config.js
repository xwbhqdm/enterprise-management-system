// Add a request interceptor
import axios from 'axios'
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token){
        //如果token有效以后每次请求都携带token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {

    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //解构response.headers中的authorization字段
    const {authorization} = response.headers
    //authorization字段是根据后端在用户登录时设置在请求头中的值
    //如果请求投中的authorization字段是否有值
    if (authorization){
        //如果有值就设置在localStoreage中
        localStorage.setItem('token',authorization)
    }
    return response;
}, function (error) {
    //解耦error.response对象中的status状态码
    const  {status} = error.response
    //如果status等于401就证明token失效了
    if (status === 401){
        //token失效删除存在localStore中的token,并跳转到login页
        localStorage.removeItem('token')
         window.location.href = '/login'
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});