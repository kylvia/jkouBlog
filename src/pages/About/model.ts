import { Reducer, Subscription } from 'umi';

export interface AboutModelState {
  name: string
}
export interface AboutModelType {
  namespace: 'about';
  state: AboutModelState;
  effects: {
    save: Reducer<AboutModelState>
  };
  subscriptions: {
    setup: Subscription
  }
}
const AboutModel: AboutModelType = {
  namespace: 'about',
  state: {
    name: 'xxxx'
  },
  effects: {
    *query({ payload }, call, put){
      console.log(payload)
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname }) => {
        console.log(pathname)
        if(pathname==='/'){
          dispatch({
            type: 'query'
          })
        }
      })
    }
  }
}

export default AboutModel
