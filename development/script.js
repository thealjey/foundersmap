/* @flow */

import React from 'react';
import {render} from 'react-dom';
import Application from '../src/components/Application';
import DevTools from './DevTools';
import {createStore, compose} from 'redux';
import reducer from '../src/reducers';
import {persistState} from 'redux-devtools';
import {fromJS} from 'immutable';

/* eslint-disable require-jsdoc */
/* eslint-disable global-require */

const container = document.getElementById('app'),
  pattern = /[?&]debug_session=([^&#]+)\b/,
  enhancer = compose(
    DevTools.instrument(),
    persistState(getDebugSessionKey(), state => fromJS(state))
  ),
  store = createStore(reducer, undefined, enhancer),
  {dispatch, getState, subscribe, replaceReducer} = store;

if (module.hot) {
  module.hot.accept('../src/reducers', () => replaceReducer(require('../src/reducers').default));
}

function getDebugSessionKey(): ?string {
  const matches = window.location.href.match(pattern);

  return matches && matches.length ? matches[1] : null;
}

function renderApp() {
  /* @flowignore */
  render(
    <div>
      <Application dispatch={dispatch} state={getState()} />
      <DevTools store={store} />
    </div>,
    container
  );
}

subscribe(renderApp);
renderApp();
