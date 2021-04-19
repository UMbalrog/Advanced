// import { DECREMENT, INCREMENT } from "../const/counter.const";

// const initState = {
//   count: 0
// }

// export default (state = initState, action) => {
//   switch(action.type){
//     case INCREMENT:
//       return { 
//         ...state,
//         count: state.count + action.payload 
//       };
//     case DECREMENT:
//       return { 
//         ...state,
//         count: state.count - action.payload 
//       };
//     default:
//       return state;
//   }
// }

import { handleActions as createReducer } from 'redux-actions';
import { increment, decrement } from '../actions/counter.action';

const initState = {
  count: 0
}

const IncrementHandle = (state, action) => ({count: state.count + action.payload })
const DecrementHandle = (state, action) => ({count: state.count - action.payload })

export default createReducer({
  ['increment']: IncrementHandle,
  ['decrement']: DecrementHandle,
}, initState)