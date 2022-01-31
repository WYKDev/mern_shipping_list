import { combineReducers } from 'redux';

const Reducers = {};
const reqReducers = require.context('.', false, /\.js$/);

reqReducers.keys()
   .filter( file => (
      (file !== '.DS_Store') && 
      (file !== '_notes') && 
      (file.indexOf('.js') !== -1) &&
      (file !== './index.js') 
   ))
   .forEach( file => {
      const end = file.indexOf('.js') - 2;
      const name = file.substr( 2, end )
      Reducers[name] = reqReducers(file).default
   })

// console.log( Reducers )

export default combineReducers({
   ...Reducers
})