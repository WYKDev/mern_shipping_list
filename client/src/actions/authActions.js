import axios from 'axios';
import {
   USER_LOADED,
   USER_LOADING,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT_SUCCESS,
   REGISTER_SUCCESS,
   REGISTER_FAIL
 } from './types';

 import { returnErrors } from './errorActions';

 // Check token and load user
 export const loadUser = () => (dispatch, getState) => {

   // User loading
   dispatch({ type: USER_LOADING });

   // Get token from localStorage
   const options = getToken(getState);

   // Headers
   axios.get('/api/auth/user', options)
   .then( res => dispatch({ type: USER_LOADED, payload: res.data }) )
   .catch( err => {
      dispatch( returnErrors(err.response.data, err.response.status) )   
      dispatch({ type: AUTH_ERROR }) 
   })
}


export const register = ({ name, email, password }) => dispatch => {
   const config = {
      headers: {
         "Content-Type": "application/json"
      }
   }

   const body = JSON.stringify({ name, email, password })

   axios.post('/api/users', body, config)
   .then( res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }) )
   .catch( err => {
      dispatch( returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL') ) 
      dispatch({ type: REGISTER_FAIL })
   })
}


export const login = ({ email, password }) => dispatch => {
   const config = {
      headers: {
         "Content-Type": "application/json"
      }
   }

   const body = JSON.stringify({ email, password })

   axios.post('/api/auth', body, config)
   .then( res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }) )
   .catch( err => {
      dispatch( returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL') ) 
      dispatch({ type: LOGIN_FAIL })
   })
}


export const logout = () => ({ type: LOGOUT_SUCCESS });


export const getToken = getState => {
   const token = getState().auth.token;
   const headers = token ? {
      "Content-Type": "application/json",
      "x-auth-token": token
   } : { "Content-Type": "application/json" };

   return { headers };
}

 