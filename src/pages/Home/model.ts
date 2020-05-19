import { Reducer } from 'umi';
import { myArticles, getUserMess } from './service'
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { RowsType } from './data.d'

export interface HomeModelState {
  articleListParms?:{
    pageSize: number,
    pageNum: number
  },
  articleData?: {
    page: number;
    total: number;
    records: number;
    rows: RowsType[]
  };
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void;
export interface HomeModelType {
  namespace: 'home';
  state: HomeModelState;
  effects: {
    query: Effect,
    setPageData: Effect,
    getUserMess: Effect
  };
  reducers: {
    saveList: Reducer<HomeModelState>,
    setArticleListParms: Reducer<HomeModelState>
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    articleListParms: {
      pageSize: 10,
      pageNum: 1
    },
    articleData: {
      page: 1,
      total: 5,
      records: 5,
      rows: [],
    }
  },
  effects: {
    *getUserMess({ payload }, { call, put }){
      const res = yield call(getUserMess, {...payload})
      if(res.status === 200){
        localStorage.setItem('userInfo', JSON.stringify(res.data))
      }
    },
    *setPageData({ payload }, { put, select }){
      const params = yield select(state => {
        return state.home.articleListParms
      })
      yield put({
        type: 'setArticleListParms',
        payload: {
          ...params,
          pageNum: payload.pageNum
        }
      });
      yield put({
        type: 'query',
      });
    },
    *query(_, { call, put, select }){
      const params = yield select(state => {
        return state.home.articleListParms
      })
      const result =yield call(myArticles,params)
      if(result.status === 200){
        yield put({
          type: 'saveList',
          payload: result.data
        })
      }
    },
  },
  reducers: {
    saveList(state, { payload }){
      return {
        ...state,
        articleData: payload
      }
    },
    setArticleListParms(state, { payload }){
      return {
        ...state,
        articleListParms: payload
      }
    },
  }
}

export default HomeModel
