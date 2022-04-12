import { createStore } from "vuex"
import actions from "./actions"
import getters from "./getters"
import state from "./state"
import mutations from "./mutations"
const store = createStore({
  state,
  getters,
  mutations,
  actions
})

export default store
