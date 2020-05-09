import { publishEditor, getDraftArticle } from '@/pages/Blog/service';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Reducer } from 'umi';
import { aticleDraft } from '@/pages/BackSystem/ArticleManagement/Blog/data';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: unknown) => T) => T }
) => void;
export interface blogModelState{
  draftArticle: aticleDraft | ''
}
interface blogModelType {
  namespace: 'blogModel',
  state: blogModelState,
  effects: {
    publishEditor: Effect
    getDraftArticle: Effect
  },
  reducers: {
    saveDraftArticle: Reducer
  },
}

const blogModel: blogModelType = {
  namespace: 'blogModel',
  state: {
    draftArticle: ''
  },
  effects: {
    * publishEditor({ payload }, { call }) {
      return yield call(publishEditor, payload);
    },
    * getDraftArticle({ payload }, { call, put }) {
      const result = yield call(getDraftArticle, payload);
      if(result.status === 201){
        yield put({
          type: 'saveDraftArticle',
          payload: result.data
        })
      }
    },
  },
  reducers: {
    saveDraftArticle(state, { payload }){
      return {
        ...state,
        draftArticle: payload
      }
    }
  }
};

export default blogModel
