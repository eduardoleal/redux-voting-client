import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import remoteActionMiddleware from './RemoteActionMiddleware';
import reducer from './Reducer';
import App from './containers/App';
import {VotingContainer} from './containers/Voting';
import {ResultsContainer} from './containers/Results';
import {setState} from './ActionCreators';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = (
    <Route component={App}>
        <Route path="/results" component={ResultsContainer} />
        <Route path="/" component={VotingContainer} />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
