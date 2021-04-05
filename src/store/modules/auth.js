export default {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
    accessTokenExpDate: '',
  },

  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token
    },
    SET_REFRESH_TOKEN(state, token) {
      state.refreshToken = token
    },
    SET_ATOKEN_EXP_DATE(state, exp) {
      state.accessTokenExpDate = exp
    },
  },
}
