import { combineReducers } from 'redux'
import CounterReducer from './counter.reducer'
import ModalReducer from './modal.reducer'

export default combineReducers({
  counter: CounterReducer,
  model: ModalReducer
})