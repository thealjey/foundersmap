/* @flow */

import {Map, List, fromJS} from 'immutable';
import type {Action} from './typedef';
import reduce from 'lodash/reduce';

const emptyMap = new Map(),
  emptyList = new List();

/* eslint-disable require-jsdoc */
/* eslint-disable complexity */

export default function reducer(state: Map = emptyMap, action: Action): Map {
  switch (action.type) {
    case 'BATCH':
      return reduce(action.payload, reducer, state);
    case 'SET_TEXT':
      return state.set('text', action.payload);
    case 'SET_DATA':
      return state.set('data', fromJS(action.payload));
    case 'ADD_ERROR':
      return state.updateIn(['errors'], emptyList, list => list.push(action.payload));
    case 'CLEAR_ERRORS':
      return state.set('errors', emptyList);
    case 'SELECT_PAGE':
      return state.set('grid_page', action.payload);
    case 'SET_EDITOR_HEIGHT':
      return state.set('editor_height', action.payload);
    case 'SET_FILTER':
      return state.set('grid_filter', action.payload);
    case 'SORT_GRID':
      return state.withMutations(map => {
        map.set('grid_sort', action.sort).set('grid_dir', action.dir);
      });
    case 'SET_DELIMITER':
      return state.set('delimiter', action.payload);
    case 'SET_ROW_CHECKED':
      return state.updateIn(['data', 'rows', action.index], row => row.set('checked', action.checked));
    case 'SET_LABEL_FIELD':
      return state.set('label_field', action.payload);
    case 'SET_LATITUDE_FIELD':
      return state.set('latitude_field', action.payload);
    case 'SET_LONGITUDE_FIELD':
      return state.set('longitude_field', action.payload);
    default:
      return state;
  }
}
