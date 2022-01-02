export const state = () => ({
  options: {
    message: null,
    color: 'themeDark',
  },
})

export const mutations = {
  setSnackbar(state, payload) {
    state.options = payload
  },
}

export const actions = {
  getSnackbar({ commit }, options) {
    commit('setSnackbar', options)
  },
}
