import { Module, GetterTree, MutationTree } from 'vuex';
import { CommonState } from './types'
import actions from './actions'


const state: CommonState = {
  loading: false,
  errors: false
}

const getters: GetterTree<CommonState, any> = {
  loading: (state: CommonState) => state.loading,
  errors: (state: CommonState) => state.errors
}

const mutations: MutationTree<CommonState> = {
  loading(state, payload) {
    state.loading = payload
  },
  errors(state, payload) {
    state.errors = payload
  }
}

const namespaced: boolean = false;

const common: Module<CommonState, any> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};

export default common
