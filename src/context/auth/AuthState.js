import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {
  AUTH_LOADING,
  SET_USER,
  GET_USER_LOADING,
  LOGOUT,
  LOGIN,
  REGISTER,
  AUTH_ERROR,
} from '../types'
import { auth, db } from '../../firebase/config'
import { collection } from '@firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth'

const AuthState = ({ children }) => {
  const initialState = {
    errors: null,
    user: null,
    loading: false,
    userLoading: false,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // const signInWithGithub = async () => {
  //     const provider = new GithubAuthProvider();
  //     signInWithRedirect(auth, provider);
  // }
  // const getGithubResult = async () => {
  //     try {
  //         await getRedirectResult(auth);
  //         dispatch({
  //             type: LOGIN
  //         })
  //     } catch (err) {
  //         dispatch({
  //             type: AUTH_ERROR,
  //         })
  //         const errorMessage = err.message;
  //         console.error(errorMessage)
  //     }
  // }

  const register = (user) => {
    setAuthLoading()
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: user.name })
          .then(() => console.log('name saved'))
          .catch((error) => console.log(error))
        dispatch({ type: REGISTER })
      })
      .catch((err) => {
        dispatch({ type: AUTH_ERROR })
        console.log(err.code)
        console.log(err.message)
      })
  }

  const login = (user) => {
    setAuthLoading()
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        dispatch({ type: LOGIN })
      })
      .catch((err) => {
        dispatch({ type: AUTH_ERROR })
        console.log(err.code)
        console.log(err.message)
      })
  }
  const setUser = (user) => {
    setGetUserLoading()
    if (user) {
      const { email, displayName, uid } = user
      dispatch({
        type: SET_USER,
        payload: {
          name: displayName,
          email,
          id: uid,
        },
      })
    }

    dispatch({
      type: LOGIN,
    })
  }

  const logout = async () => {
    try {
      await signOut(auth)
      dispatch({
        type: LOGOUT,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // Clear Errors
  // const clearErrors = () => dispatch({
  //     type: CLEAR_ERRORS
  // })

  // Set Loading
  const setAuthLoading = () => dispatch({ type: AUTH_LOADING })
  const setGetUserLoading = () => dispatch({ type: GET_USER_LOADING })

  return (
    <AuthContext.Provider
      value={{
        errors: state.errors,
        user: state.user,
        loading: state.loading,
        userLoading: state.userLoading,
        dispatch,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
