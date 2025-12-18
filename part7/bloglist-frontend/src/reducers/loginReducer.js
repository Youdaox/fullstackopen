import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return ''
    },
  }
})
const { setUser, removeUser } = loginSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
  }
}

export const initializeUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser())
    window.localStorage.clear()
  }
}

export default loginSlice.reducer