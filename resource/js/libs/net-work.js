import axios from 'axios';
const install = (Vue) => {
    const NetWork = new Vue({
        methods: {
            get: (url, data, successCallback) => {
                console.log(data);
                axios.get(url, { params: data }).
                    then((serverData) => {
                        console.log(serverData);
                        successCallback(serverData.data);
                    }).
                    catch((err) => {
                        console.log('请求错误' + err);
                    })
            },
            post: (url, data, successCallback) => {
                //如果是测试环境开发，需要跨域请求服务器的数据
                console.log('url');
                axios.post(url, data).
                    then((data) => {
                        successCallback(data.data);
                    }).
                    catch((err) => {
                        console.log('请求错误' + err);
                    })
            },
            pGet: (url, data) => {
                return new Promise((resolve, reject) => {
                    axios.get(url, { params: data }).
                        then((serverData) => {
                            resolve(serverData.data);
                        }).
                        catch((err) => {
                            console.log('请求错误' + err);
                        })
                })
            },
            pPost: (url, data) => {
                return new Promise((resolve, reject) => {
                    axios.post(url, data).
                        then((data) => {
                            resolve(data.data);
                        }).
                        catch((err) => {
                            console.log('请求错误' + err);
                        })
                });
            }
        }

    })
    Vue.prototype.$netWork = NetWork;
}
export default install;