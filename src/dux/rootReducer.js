import { combineReducers } from 'redux';
import user from './user/reducer';
import chatRoom from './chatRoom/reducer';

const rootReducer = combineReducers({
  user,
  chatRoom,
})

export default rootReducer;
