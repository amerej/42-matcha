/* eslint-disable */
import axios from 'axios'
import store from '@/store'

const state = {
  minAge: 18,
  maxAge: 99,
  minPopularity: 0,
  maxPopularity: 100,
  distance: 1,
  updateSettingsStatus: ''
}

const getters = {
  minAge: state => state.minAge,
  maxAge: state => state.maxAge,
  minPopularity: state => state.minPopularity,
  maxPopularity: state => state.maxPopularity,
  distance: state => state.distance,
  updateSettingsStatus: state => state.updateSettingsStatus
}

const mutations = {
  updateSettingsRequest (state) {
    state.updateSettingsStatus = 'Loading'
  },
  updateSettingsSuccess (state, userSettings) {
    state.updateSettingsStatus = 'Success'
    state.minAge = userSettings.minAge
    state.maxAge = userSettings.maxAge
    state.minPopularity = userSettings.minPopularity
    state.maxPopularity = userSettings.maxPopularity
    state.distance = userSettings.distance
  },
  updateSettingsError (state) {
    state.updateSettingsStatus = 'Error'
  },
  getSettingsRequest (state) {
    state.getSettingsStatus = 'Loading'
  },
  getSettingsSuccess (state, userSettings) {
    state.getSettingsStatus = 'Success'
    state.minAge = userSettings.minAge
    state.maxAge = userSettings.maxAge
    state.minPopularity = userSettings.minPopularity
    state.maxPopularity = userSettings.maxPopularity
    state.distance = userSettings.distance
  },
  getSettingsError (state) {
    state.getSettingsStatus = 'Error'
  }
}

const actions = {
  async updateSettings ({ commit }, userSettings) {
    try {
      commit('updateSettingsRequest')
      const settings = await axios({url: 'users/' + store.getters['auth/userId'] + '/settings', data: userSettings, method: 'PUT'})
      const data = settings.data
      commit('updateSettingsSuccess', {
        minAge: data.min_age,
        maxAge: data.max_age,
        minPopularity: data.min_popularity,
        maxPopularity: data.max_popularity,
        distance: data.distance
      })
    } catch (e) {
      commit('updateProfileError')
      console.log(e)
    }
  },
  async getSettings ({ commit }) {
    try {
      commit('getSettingsRequest')
      const settings = await axios({url: 'users/' + store.getters['auth/userId'] + '/settings', method: 'GET'})
      const data = settings.data
      commit('getSettingsSuccess', {
        minAge: data.min_age,
        maxAge: data.max_age,
        minPopularity: data.min_popularity,
        maxPopularity: data.max_popularity,
        distance: data.distance
      })
    } catch (e) {
      commit('getSettingsError')
      console.log(e)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
