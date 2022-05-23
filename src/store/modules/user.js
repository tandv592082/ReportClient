import { login, getUserInfo } from '@/api/users';
import router from '@/router';
import { setUserLocal, resetUserLocal } from '@/utils/user';

const state = {
  user: null,
};

const getters = {
  user: ({ user }) => user,
  role: ({ user }) => user?.role,
};

const mutations = {
  // eslint-disable-next-line no-shadow
  setUser(state, payload) {
    state.user = payload;
    if (payload) {
      setUserLocal(payload.id);
    } else {
      resetUserLocal();
    }
  },
};

const actions = {
  login: async ({ commit }, payload) => {
    const respone = await login(payload);
    const { user } = respone.data;
    commit('setUser', user);
    router.push({ path: '/' });
  },
  getUserInfo: async ({ commit }, userId) => {
    const respone = await getUserInfo(userId);
    const user = respone.data;
    commit('setUser', user);
  },
  logout: async ({ commit }) => {
    commit('setUser', null);
    router.push({ path: '/login' });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
