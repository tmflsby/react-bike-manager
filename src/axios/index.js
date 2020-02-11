// 对jsonp的方法进行封装
import Jsonp from "jsonp";

class Axios {
  static jsonp(options) { // 定义静态的方法 jsonp 供其他页面进行使用
    return new Promise((resolve, reject) => { // 使用Promise解决函数间的嵌套问题  链式调用
      Jsonp(options.url, {
        param: 'callback'
      }, (err, response) => {
        if (response.status === 'success') { //成功后 用resolve返回数据
          resolve(response);
        } else { //失败后 用reject返回数据
          reject(response.message);
        }
      })
    })
  }
}

export default Axios;
