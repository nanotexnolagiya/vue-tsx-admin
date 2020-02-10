import { ActionTree } from 'vuex';
import { CommonState } from './types';


const actions: ActionTree<CommonState, any> = {
  errors({ commit }, payload): void {
    commit('errors', payload)
  }
}

export default actions
