import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getLoginUser } from './service'
import { Reducer, history  } from 'umi';
import { message  } from 'antd';

export interface LoginState {
  userInfo: object
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void
export interface LoginType {
  namespace: 'login',
  state: LoginState,
  effects: {
    loginUser: Effect
  },
  reducers: {
    saveLoginUser: Reducer<LoginState>
  }
}
const login = {
  namespace: 'login',
  state: {
    userInfo: {}
  },
  effects: {
    *loginUser({ payload }, { put, call }){
      const result = yield call(getLoginUser, payload)
      if(result.status === 200){
        localStorage.setItem('isLogin', true)
        localStorage.setItem('userInfo', JSON.stringify(result.data))
        history.push('/home');
      }else {
        localStorage.setItem('isLogin', false)
        message.error(result.msg)
      }
    }
  },
  reducers: {
    saveLoginUser(state, { payload }){
      return {
        ...state,
        userInfo: payload
      }
    }
  }
}
export default login
