/* eslint-disable */

const SOCKET_VUE_TEST = (state, visits) => {
  state.visits = visits
  state.count = visits.length
  console.log('count: ' + state.count)
  console.log('visits: ' + JSON.stringify(visits))
}

// 
// Get visits

const getVisitsRequest = state => {
  state.getVisitsStatus = 'LOADING'
}

const getVisitsSuccess = (state, visits) => {
  state.visits = visits
  state.count = visits.length
  state.getVisitsStatus = 'SUCCESS'
}

const getVisitsError = state => {
  state.getVisitsStatus = 'ERROR'
}

//
// Add visit

const addVisitRequest = state => state.updateVisitsStatus = 'LOADING'

const addVisitSuccess = (state) => {
  state.updateVisitsStatus = 'SUCCESS'
}

const addVisitError = state => {
  state.updateVisitsStatus = 'ERROR'
}

export default {
  SOCKET_VUE_TEST,
  getVisitsRequest,
  getVisitsSuccess,
  getVisitsError,
  addVisitRequest,
  addVisitSuccess,
  addVisitError
}
