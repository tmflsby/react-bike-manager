import React from 'react';

const LoadingComponent = () => {
  return (
    <div>
      <div className="overlay"/>
      <div className="loading">
        <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" alt=""/>
        <span>加载中，请稍后...</span>
      </div>
    </div>
  )
}

export default LoadingComponent;
