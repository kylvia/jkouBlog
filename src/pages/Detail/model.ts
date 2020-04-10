import { getArticleDetail } from './service'
import { Reducer } from 'umi';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { detailType } from './data.d';

export interface DetailModelState {
  detail?: detailType | null
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
  },
  reducers: {
    saveDetail: Reducer<DetailModelState>
  }
}

const DetailModel: DetailModelType = {
  namespace: 'articleDetail',
  state: {
    detail: null
  },
  effects: {
    *fetchDetail({ payload }, { put, call }){
      const result = yield call(getArticleDetail, payload)
      if(result.status === 200){
        yield put({
          type: 'saveDetail',
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
    }
  }

}
export default DetailModel
