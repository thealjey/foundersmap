/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {List} from 'immutable';
import Table from 'react-bootstrap/lib/Table';
import HeaderCell from './HeaderCell';
import Row from './Row';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {instanceOf, number, string} = PropTypes;

export default class DataTable extends Component {

  static propTypes: Object;

  props: Object;

  static renderRow(row: Map, i: number): any {
    return <Row key={i} row={row} />;
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  render(): any {
    const {headers, rows, limit, activePage, sort, dir} = this.props,
      chunk = rows.slice(limit * (activePage - 1), limit * activePage);

    return (
      <Table hover responsive striped>
        <thead>
          <tr>
            <th />
            {headers.map((header, i) => <HeaderCell key={i} index={i} value={header} sort={sort} dir={dir} />)}
          </tr>
        </thead>
        <tbody>
          {chunk.map(DataTable.renderRow)}
        </tbody>
      </Table>
    );
  }

}

DataTable.propTypes = {headers: instanceOf(List), rows: instanceOf(List), limit: number, activePage: number,
  sort: number, dir: string};
