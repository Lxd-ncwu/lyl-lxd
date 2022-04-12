const actions = {
  addToken({ commit }, token) {
    commit("setToken", token)
  }
}

export default actions
