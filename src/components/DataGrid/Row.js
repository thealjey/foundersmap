/* @flow */

import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import Cell from './Cell';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import {setRowChecked} from '../../actions';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {instanceOf, func} = PropTypes;

export default class Row extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  handleChange: (e: any) => void;

  static renderCell(cell: Map, i: number): any {
    return <Cell key={i} cell={cell} />;
  }

  constructor(props: Object) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(props: Object): boolean {
    return props.row !== this.props.row;
  }

  handleChange(e: any) {
    this.context.dispatch(setRowChecked(this.props.row.get('index'), e.target.checked));
  }

  render(): any {
    const {row} = this.props;

    return (
      <tr>
        <td><Checkbox onChange={this.handleChange} checked={row.get('checked')} /></td>
        {row.get('cells').map(Row.renderCell)}
      </tr>
    );
  }

}

Row.propTypes = {row: instanceOf(Map)};
Row.contextTypes = {dispatch: func};
