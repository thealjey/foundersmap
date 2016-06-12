/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import Panel from 'react-bootstrap/lib/Panel';
import Toolbar from './Toolbar';
import Pager from './Pager';
import DataTable from './DataTable';
import {Map, List} from 'immutable';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {instanceOf, number, string} = PropTypes,
  limit = 5;

export default class DataGrid extends Component {

  static propTypes: Object;

  props: Object;

  static getFilteredRows(data: Map, filter: string): List {
    const rows = data.get('rows');

    return filter
      ? rows.filter(row => row.get('cells').some(cell => includes(toLower(cell.get('value')), filter)))
      : rows;
  }

  static sortRows(rows: List, sort: number, dir: string): List {
    if (!dir) {
      return rows;
    }

    return rows.sort((a, b) => {
      const desc = 'desc' === dir,
        value1 = (desc ? b : a).get('cells').get(sort).get('value'),
        value2 = (desc ? a : b).get('cells').get(sort).get('value');

      if (value1 < value2) {
        return -1;
      }
      if (value1 > value2) {
        return 1;
      }

      return 0;
    });
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  render(): any {
    const {data, activePage, filter, sort, dir, labelField, latitudeField, longitudeField} = this.props,
      headers = data.get('headers'),
      rows = DataGrid.sortRows(DataGrid.getFilteredRows(data, filter), sort, dir);

    return (
      <Panel className="x-data-grid"
        header={
          <Toolbar
            filter={filter}
            headers={headers}
            labelField={labelField}
            latitudeField={latitudeField}
            longitudeField={longitudeField}
          />
        }
        footer={<Pager rows={rows} limit={limit} activePage={activePage} />}
      >
        <DataTable headers={headers} rows={rows} limit={limit} activePage={activePage} sort={sort} dir={dir} />
      </Panel>
    );
  }

}

DataGrid.propTypes = {data: instanceOf(Map), activePage: number, filter: string, sort: number, dir: string,
  labelField: string, latitudeField: string, longitudeField: string};
