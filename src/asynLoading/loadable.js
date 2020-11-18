import React from "react";
import Loadable from "react-loadable";
import LoadingComponent from "./LoadingComponent";


const BikeMapLoadableComponent = Loadable({// 异步加载组件 单车地图
  loader: () => import(/* webpackChunkName: "BikeMapPage" */'../views/BikeMap/index'),
  loading: LoadingComponent
})

const LoginLoadableComponent = Loadable({// 异步加载组件 登录页
  loader: () => import(/* webpackChunkName: "LoginPage" */'../views/Login/index'),
  loading: LoadingComponent
})

export const LoadableBikeMap = () => {
  return <BikeMapLoadableComponent/>;
}

export const LoadableLogin = () => {
  return <LoginLoadableComponent/>;
}

