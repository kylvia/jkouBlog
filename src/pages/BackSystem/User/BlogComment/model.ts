import { blogCommentListType } from './data';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getBlogUserReport, clearOneBlogNotComm } from './service'
import { Reducer } from 'umi';

export interface blogCommentState {
  list: blogCommentListType[] | []
}
type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T }
) => void
interface BlogCommentModelType {
  namespace: 'blogCommentModel',
  state: blogCommentState,
  effects: {
    getBlogUserReport: Effect
    clearOneBlogNotComm: Effect
  },
  reducers: {
    saveList: Reducer
  }
}
const BlogCommentModel: BlogCommentModelType = {
  namespace: 'blogCommentModel',
  state: {
    list: []
  },
  effects: {
    *getBlogUserReport(_, { call, put }){
      const res = yield call(getBlogUserReport)
      if(res.status === 200){
        yield put({
          type: 'saveList',
          payload: res.data
        })
      }
    },
    *clearOneBlogNotComm({ payload }, { call, put }){
      return yield call(clearOneBlogNotComm, payload)
    },
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
export default BlogCommentModel
