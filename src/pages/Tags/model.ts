import { getTags, getTagsDetail } from './service';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Reducer } from 'umi';
import { RowsType } from './data.d'

export interface TagState {
  tagList?: {
    id: string;
    labelName: string;
  }[],
  articleList?: RowsType[]
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: TagState) => T) => T }
) => void;
export interface TagsType {
  namespace: 'tag';
  state: TagState;
  effects: {
    getTags: Effect,
    getTagsDetail: Effect,
  },
  reducers: {
    saveTagList: Reducer<TagState>,
    saveList: Reducer<TagState>,
  }
}
const Tags: TagsType = {
  namespace: 'tag',
  state: {
    tagList: [],
    articleList: [],
  },
  effects: {
    *getTags({ payload }, { call, put }){
      const result = yield call(getTags, payload)
      if(result.status === 200){
        yield put({
          type: 'saveTagList',
          payload: result.data
        })
      }
    },
    *getTagsDetail({ payload }, { call, put }){
      const result = yield call(getTagsDetail, payload)
      if(result.status === 200){
        yield put({
          type: 'saveList',
          payload: result.data
        })
      }
    }
  },
  reducers: {
    saveTagList(state, { payload }){
      return {
        ...state,
        tagList: payload
      }
    },
    saveList(state, { payload }){
      return {
        ...state,
        articleList: payload
      }
    }
  }
}
export default Tags;
