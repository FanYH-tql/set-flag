import { combineReducers } from "redux";
import app from "./app"
import login from './login'
import register from './register'
import global from './global'
import route from './route'
import flagSetting from './flagSetting'
import discuss from './discuss'
export default combineReducers({
  app,
  login,
  register,
  global,
  route,
  flagSetting,
  discuss
});
