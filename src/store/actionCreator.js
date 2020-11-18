import * as actionTypes from "./actionTypes";

export const switchMenu = (menuName) => ({
  type: actionTypes.SWITCH_MENU,
  menuName
})

export const switchUrl = (url,path) => ({
  type: actionTypes.SWITCH_URL,
  url,
  path
})

export const handleLogin = (token) => ({
  type: actionTypes.USER_LOGIN,
  token
})

export const handleLogout = (token) => ({
  type: actionTypes.USER_LOGOUT,
  token
})



