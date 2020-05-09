import { UserMessType } from './data';
import { getUserMess, insUserMess } from './service'
import { Reducer } from 'umi'
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';

export interface personalPageModelState{
  userMess: UserMessType | {}
}
type Effects = (
  action: AnyAction,
  effects: EffectsCommandMap & { select:  <T>(func: (state: any) => T) => T}
) => void
interface personalPageModelType {
  namespace: 'personalPageModel',
  state: personalPageModelState,
  effects: {
    getUserMess: Effects
    insUserMess: Effects
  },
  reducers: {
    saveDatail: Reducer
  }
}
const personalPageModel: personalPageModelType = {
  namespace: 'personalPageModel',
  state: {
    userMess: {}
  },
  effects: {
    *getUserMess({ payload }, { call, put }){
      const res = yield call(getUserMess, {...payload})
      if(res.status === 200){
        yield put({
          type: 'saveDatail',
          payload: res.data
        })
      }
    },
    *insUserMess({ payload }, { call }){
      return yield call(insUserMess, {...payload})
    }
  },
  reducers: {
    saveDatail(state, { payload }){
      return {
        ...state,
        userMess: payload
      }
    }
  }
}

export default personalPageModel
