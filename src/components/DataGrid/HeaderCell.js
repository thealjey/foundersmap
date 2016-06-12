/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {batch, selectPage, sortGrid} from '../../actions';

/* eslint-disable require-jsdoc */

const {func, string, number} = PropTypes;

export default class HeaderCell extends Component {

  static contextTypes: Object;

  static propTypes: Object;

  props: Object;

  context: Object;

  handleClick: () => void;

  static getIconClass(dir: string): string {
    if ('asc' === dir) {
      return 'sort-by-alphabet';
    }
    if ('desc' === dir) {
      return 'sort-by-alphabet-alt';
    }

    return '';
  }

  constructor(props: Object) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  handleClick() {
    const {sort, dir, index} = this.props;

    this.context.dispatch(batch([
      selectPage(1),
      sortGrid(sort, index, dir)
    ]));
  }

  render(): any {
    const {value, sort, dir, index} = this.props;

    return (
      <th className="x-header-cell" onClick={this.handleClick}>
        {value}
        {index === sort && dir ? <Glyphicon glyph={HeaderCell.getIconClass(dir)} /> : null}
      </th>
    );
  }

}

HeaderCell.propTypes = {value: string, sort: number, dir: string, index: number};
HeaderCell.contextTypes = {dispatch: func};
