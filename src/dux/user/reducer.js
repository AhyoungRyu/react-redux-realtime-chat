import { handleActions } from 'redux-actions';
import set from 'lodash/fp/set';
import { SET_USER, CLEAR_USER } from './actionTypes';

const initialState = {
  currentUser: null,
}
export default handleActions({
  [SET_USER]: (state, { payload: { currentUser } }) => set('currentUser', currentUser, state),
  [CLEAR_USER]: (state) => set('currentUser', null, state),
}, initialState);
