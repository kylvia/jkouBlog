import { isLogin } from '@/services/auth'
import { Reducer, history, Subscription } from 'umi';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';

export interface authState {

}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void
export interface AuthType {
  namespace: 'auth',
  state: authState,
  effects: {
    isLogin: Effect
  },
  reducers: {},
  subscriptions: {
    setup: Subscription
  }
}
const Auth = {
  namespace: 'auth',
  state: {

  },
  effects: {
    *isLogin( _, { call }){
      const result = yield call(isLogin)
      if(result.status !== 200){
        history.push('/login');
      }
    }
  },
  reducers: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/blog' || pathname.toUpperCase().includes('BACKSYSTEM')) {
          dispatch({
            type: 'isLogin',
          });
        }
      })
    }
  }
}
export default Auth
