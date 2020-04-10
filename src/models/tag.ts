import { getTag } from '../services/tag'
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Reducer } from 'umi';

export interface tagListType {
  id: number;
  labelName: string;
}
export interface TagState {
  tagList: tagListType[]
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func:(state: TagState) => T) => T }
) => void;
export interface TagType {
  namespace: 'commonTag',
  state: TagState,
  effects: {
    getTags: Effect
  },
  reducers: {
    saveTags: Reducer<TagState>
  }
}
const Tag: TagType = {
  namespace: 'commonTag',
  state: {
    tagList: []
  },
  effects: {
    *getTags({ payload }, { call, put }){
      const result = yield call(getTag, payload)
      if(result.status === 200){
        yield put({
          type: 'saveTags',
          payload: result.data
        })
      }
    }
  },
  reducers: {
    saveTags(state, { payload }){
      return {
        ...state,
        tagList: payload
      }
    }
  }
}
export default Tag
