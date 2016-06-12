/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {List} from 'immutable';
import Pagination from 'react-bootstrap/lib/Pagination';
import {selectPage} from '../../actions';

/* eslint-disable require-jsdoc */

const {instanceOf, number, func} = PropTypes;

export default class Pager extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  handleSelect: (page: number) => void;

  constructor(props: Object) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  handleSelect(page: number) {
    this.context.dispatch(selectPage(page));
  }

  render(): any {
    const {rows, limit, activePage} = this.props;

    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={Math.ceil(rows.size / limit)}
        maxButtons={5}
        activePage={activePage}
        onSelect={this.handleSelect}
      />
    );
  }

}

Pager.propTypes = {rows: instanceOf(List), limit: number, activePage: number};
Pager.contextTypes = {dispatch: func};
