import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { getToken } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
   dispatch( setItemsLoading() )
   
   axios.get('/api/items').then( res => {
      dispatch({ type: GET_ITEMS, payload: res.data }) 
   })
   .catch( err => returnErrors(err.response.data, err.response.status) )
};


export const addItem = (item) => (dispatch, getState) => {
   const options = getToken(getState);

   axios.post('/api/items', item, options).then( res => {
      dispatch({ type: ADD_ITEM, payload: res.data }) 
   })
   .catch( err => returnErrors(err.response.data, err.response.status) )
};


export const deleteItem = id => (dispatch, getState) => {
   const options = getToken(getState);

   axios.delete(`/api/items/${id}`, options).then( res => {
      dispatch({ type: DELETE_ITEM, payload: id })  
   })
   .catch( err => returnErrors(err.response.data, err.response.status) )
};


export const setItemsLoading = () => {
   return {
      type: ITEMS_LOADING
   }
}