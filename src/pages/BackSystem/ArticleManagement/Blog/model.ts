import { getBlogs, delBlog } from './service'
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Reducer } from 'umi';
import { aticleDraft } from './data.d';

export interface sysBlogState {
  list?: {
    page: number;
    total: number;
    records: number;
    rows:  aticleDraft[]
  },
  blogListParms?:{
    pageSize: number,
    pageNum: number
  },
}
export type Effects = (
  action: AnyAction,
  effects: EffectsCommandMap & { select:  <T>(func: (state: any) => T) => T}
) => void
export interface sysBlogType {
  namespace: 'sysBlog',
  state: sysBlogState,
  effects: {
    getBlogs: Effects,
    setPageData: Effects,
    delBlog: Effects,
  },
  reducers: {
    setBlogListParms: Reducer
    saveList: Reducer
  },
}
const sysBlog: sysBlogType = {
  namespace: 'sysBlog',
  state: {
    list: {
      page: 1,
      total: 5,
      records: 5,
      rows: [],
    },
    blogListParms: {
      pageSize: 10,
      pageNum: 1
    },
  },
  effects: {
    *setPageData({ payload }, { put, select }){
      const params = yield select(state => {
        return state.sysBlog.blogListParms
      })
      yield put({
        type: 'setBlogListParms',
        payload: {
          ...params,
          pageNum: payload ? payload.pageNum : 1
        }
      });
      yield put({
        type: 'getBlogs',
      });
    },
    *getBlogs(_, { call, put, select }){
      const params = yield select(state => {
        return state.sysBlog.blogListParms
      })
      const result =yield call(getBlogs,params)
      if(result.status === 200){
        yield put({
          type: 'saveList',
          payload: result.data
        })
      }
    },
    *delBlog({ payload }, { call }){
      console.log(payload)
      return yield call(delBlog, { ...payload })
    }
  },
  reducers: {
    setBlogListParms(state, { payload }){
      return {
        ...state,
        blogListParms: payload
      }
    },
    saveList(state, { payload }){
      return {
        ...state,
        list: payload
      }
    },
  },
}

export default sysBlog
