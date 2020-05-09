import { commentListType } from './data';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getUserReport } from './service'
import { Reducer } from 'umi';

export interface commentState {
  list: commentListType[] | []
}
type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T }
) => void
interface CommentModelType {
  namespace: 'commentModel',
  state: commentState,
  effects: {
    getUserReport: Effect
  },
  reducers: {
    saveList: Reducer
  }
}
const CommentModel: CommentModelType = {
  namespace: 'commentModel',
  state: {
    list: []
  },
  effects: {
    *getUserReport(_, { call, put }){
      const res = yield call(getUserReport)
      if(res.status === 200){
        yield put({
          type: 'saveList',
          payload: res.data
        })
      }
    }
  },
  reducers: {
    saveList(state, { payload }){
      return {
        ...state,
        list: payload
      }
    }
  }
}
export default CommentModel
