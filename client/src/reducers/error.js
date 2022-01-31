import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
   msg: {},
   status: null,
   id: null
}

export default function( state = initialState, { type, payload }) {

   const { msg, status, id } = payload ? payload : state;

   switch(type) {
      case GET_ERRORS:
         return { msg, status, id };
      case CLEAR_ERRORS: 
         return { msg:{}, status: null, id: null };
      default:
         return state;
   }
}