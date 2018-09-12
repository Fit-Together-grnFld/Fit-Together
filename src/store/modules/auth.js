import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/auth';
import {USER_REQUEST } from '../actions/user'
import axios from 'axios';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    //promis is for router redirect in login
    return new Promise((resolve,reject) => {
      commit(AUTH_REQUEST);
      axios({url: 'auth', data: user, method: 'POST'})
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('user-token', token) // stores user token in local storage
          // sets the header of ajax library to the token value
          axios.defaults.headers.common['Authorization'] = token;
          commit(AUTH_SUCCESS, token)
          // we have the token now log user in
          dispatch(USER_REQUEST)
          resolve(resp)
        })
      .catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-token')// if request fails remove user token if possible
        reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')// clear token from local storage
      // remove the axios default header
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

// mutations showing loading, success, error to reflect the api call status and the token when loaded

const mutations ={
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) =>{
    state.status = 'success',
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
