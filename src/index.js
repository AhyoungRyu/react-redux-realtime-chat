import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Provider,
  useDispatch,
 } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./dux/rootReducer";

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './components/reusable/UI/Spinner';

import registerServiceWorker from './registerServiceWorker';

import {
  setUser,
  clearUser,
 } from './dux/user/actions';

import 'semantic-ui-css/semantic.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
 } from "react-router-dom";

import firebase from './firebase';

const store = createStore(rootReducer, composeWithDevTools());

const Root = ({ history }) => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!loading) {
      if (user) {
        dispatch(setUser({ 
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        }));
        history.push('/');
      } else {
        history.push('/login');
        dispatch(clearUser());
      }
    }
  }, [user, loading]);
  if (loading) {
    return <Spinner content="Loading chat..." />;
  }
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
}

const RootWithAuth = withRouter(Root);
ReactDOM.render(
  <Provider store={store}>
    <Router><RootWithAuth /></Router>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
