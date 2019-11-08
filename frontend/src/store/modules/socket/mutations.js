/* eslint-disable */
import store from '@/store'

// const SOCKET_VUE_TEST = (state, visits) => {
//   state.visits = visits
//   state.count = visits.length
//   console.log('count: ' + state.count)
//   console.log('visits: ' + JSON.stringify(visits))
// }

const SOCKET_CONNECT = (state) => {
  state.isConnected = true;
}

const SOCKET_DISCONNECT = (state) => {
  state.isConnected = false;
}

const SOCKET_MESSAGECHANNEL = (state, message) => {
  state.socketMessage = message
}

export default {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_MESSAGECHANNEL
}
