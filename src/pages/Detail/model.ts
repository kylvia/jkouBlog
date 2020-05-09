import { getArticleDetail, insComment, insRepComment, getComment, updLikes } from './service'
import { Reducer } from 'umi';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { detailType, commentsType } from './data.d';

export interface DetailModelState {
  detail?: detailType | null
  comments?: commentsType[] | []
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: DetailModelState) => T) => T }
) => void;
interface DetailModelType {
  namespace: 'articleDetail',
  state: DetailModelState,
  effects: {
    fetchDetail: Effect
    insComment: Effect
    insRepComment: Effect
    getComment: Effect
    updLikes: Effect
  },
  reducers: {
    saveDetail: Reducer<DetailModelState>
    saveComments: Reducer<DetailModelState>
  }
}

const DetailModel: DetailModelType = {
  namespace: 'articleDetail',
  state: {
    detail: null,
    comments: []
  },
  effects: {
    * insComment({ payload }, { put, call }) {
      const result = yield call(insComment, payload);
      if(result.status === 200){
        yield put({
          type: 'saveComments',
          payload: result.data
        })
      }
      return result ? result.status : ''
    },
    * insRepComment({ payload }, { put, call }) {
      const result = yield call(insRepComment, payload);
      if(result.status === 200){
        yield put({
          type: 'saveComments',
          payload: result.data
        })
      }
      return result ? result.status : ''
    },
    * getComment({ payload }, { put, call }) {
      const result = yield call(getComment, payload);
      if(result.status === 200){
        yield put({
          type: 'saveComments',
          payload: result.data
        })
      }
    },
    *fetchDetail({ payload }, { put, call }){
      const result = yield call(getArticleDetail, payload)
      if(result.status === 200){
        yield put({
          type: 'saveDetail',
          payload: result.data
        })
      }
    },
    *updLikes({ payload }, { put, call }){
      const result = yield call(updLikes, payload)
      if(result.status === 200){
        yield put({
          type: 'saveComments',
          payload: result.data
        })
      }
    }
  },
  reducers: {
    saveDetail(state, { payload }){
      return {
        ...state,
        detail: payload
      }
    },
    saveComments(state, { payload }){
      return {
        ...state,
        comments: payload
      }
    }
  }

}
export default DetailModel
