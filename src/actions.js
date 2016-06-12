/* @flow */

import type {Action} from './typedef';
import map from 'lodash/map';
import trim from 'lodash/trim';
import toLower from 'lodash/toLower';

const editorHeightLimit = 313;

/* eslint-disable require-jsdoc */

type CellData = {key: string, value: string};
type RowData = {checked: boolean, cells: Array<CellData>};
type GridData = {headers: Array<string>, rows: Array<RowData>};

function convertData(headers: Array<string>, ...rows: Array<Array<string>>): GridData {
  return {
    headers,
    rows: map(rows, (row, i) => ({
      index: i,
      checked: true,
      cells: map(row, (col, j) => ({
        key: headers[j],
        value: col
      }))
    }))
  };
}

export function batch(payload: Array<Action>): Action {
  return {type: 'BATCH', payload};
}

export function setText(payload: string): Action {
  return {type: 'SET_TEXT', payload};
}

export function setData(data: Array<Array<string>>): Action {
  return {type: 'SET_DATA', payload: convertData(...data)};
}

export function addError(error: any): Action {
  return {type: 'ADD_ERROR', payload: String(error)};
}

export function clearErrors(): Action {
  return {type: 'CLEAR_ERRORS'};
}

export function selectPage(payload: number): Action {
  return {type: 'SELECT_PAGE', payload};
}

export function setEditorHeight(height: number): Action {
  return {type: 'SET_EDITOR_HEIGHT', payload: editorHeightLimit < height ? editorHeightLimit : height};
}

export function setFilter(filter: string): Action {
  return {type: 'SET_FILTER', payload: toLower(trim(filter))};
}

export function sortGrid(oldSort: string, newSort: string, dir: string): Action {
  let newDir = '';

  if (oldSort !== newSort || !dir) {
    newDir = 'asc';
  } else if ('asc' === dir) {
    newDir = 'desc';
  }

  return {type: 'SORT_GRID', sort: newSort, dir: newDir};
}

export function setDelimiter(payload: string): Action {
  return {type: 'SET_DELIMITER', payload};
}

export function setRowChecked(index: number, checked: boolean): Action {
  return {type: 'SET_ROW_CHECKED', index, checked};
}

export function setLabelField(payload: string): Action {
  return {type: 'SET_LABEL_FIELD', payload};
}

export function setLatitudeField(payload: string): Action {
  return {type: 'SET_LATITUDE_FIELD', payload};
}

export function setLongitudeField(payload: string): Action {
  return {type: 'SET_LONGITUDE_FIELD', payload};
}
