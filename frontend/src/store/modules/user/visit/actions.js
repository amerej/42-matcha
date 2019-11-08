import axios from "axios";
import store from "@/store";
/* eslint-disable */

const getMessage = ({ commit, state, rootState }) => {
  const userId = store.getters['auth/userId']
  // rootState.io.emit('test', userId)
}

const addVisit = async ({ commit, rootState }, user) => {
  try {
    commit('addVisitRequest')
    const userId = store.getters['auth/userId']
    const url = 'users/' + userId + '/visits'
    const result = await axios({ url: url, data: user, method: 'POST' })
    console.log('store result addvisit')
    console.log(result)

    // const result = await axios({ url: url, method: 'GET' })
    // const visits = result.data.visits
    // console.log(visits)
    // rootState.io.emit('test', visits)
    commit('addVisitSuccess')
  } catch (e) {
    commit('addVisitError')
    console.log(e)
  }
}

const getVisits = async ({ commit }) => {
  try {
    commit('getVisitsRequest')
    const userId = store.getters['auth/userId']
    const url = 'users/' + userId + '/visits'
    const result = await axios({ url: url, method: 'GET' })
    const visits = result.data.visits
    commit('getVisitsSuccess', visits)
  } catch (e) {
    commit('getVisitsError')
  }
}

export default {
  getMessage,
  getVisits,
  addVisit
}
