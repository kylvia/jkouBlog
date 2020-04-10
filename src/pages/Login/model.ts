import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getLoginUser } from './service'
import { Reducer } from '@@/plugin-dva/connect';

export interface LoginState {
  userInfo: object
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: LoginState) => T) => T }
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
    *loginUser({ paylod }, { put, call }){
      const result = yield call(getLoginUser, paylod)
      if(result.status === 200){
        yield put({
          type: 'saveLoginUser',
          payload: result.data
        })
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
