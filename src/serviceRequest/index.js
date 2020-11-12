// 对jsonp/axios的方法进行封装
import JSONP from "jsonp";
import axios from "axios";
import { Modal } from "antd";

const _axios = axios.create();

/**拦截器*/
_axios.interceptors.response.use(response => {
  console.log('接口请求打印：', response);
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});

class ServiceRequest {
  /**jsonp请求  定义静态的方法jsonp供其他页面进行使用*/
  static jsonp(options) {
    // 使用Promise解决函数间的嵌套问题  链式调用
    return new Promise((resolve, reject) => {
      JSONP(options.url, {
        param: 'callback'
      }, (err, response) => {
        console.log(response);

        if (err) {
          reject(err)
        } else {
          if (response && response.status === 'success') {
            //成功后 用resolve返回数据
            resolve(response);
          } else {
            //失败后 用reject返回数据
            reject(response.message);
          }
        }
      })
    })
  }

  /**axios请求*/
  static axios(options) {
    let loading;
    console.log(options)

    /**loading显示*/
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }

    return new Promise((resolve, reject) => {
      _axios({
        url: options.url,
        method: 'get',
        timeout: 5000,
        paras: (options.data && options.data.params) || ''
      }).then(response => {
        console.log(response)

        /**loading隐藏*/
        if (options.data && options.data.isShowLoading !== false) {
          loading.style.display = 'none';
        }

        if (response && response.status === 200) {
          let res = response.data;
          if (res.code === 0) {
            //成功后 用resolve返回数据
            resolve(res);
          } else {
            //失败后 弹出提示框
            Modal.info({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          //失败后 用reject返回数据
          reject(response.data);
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }
}

export default ServiceRequest;
