/* @flow */

import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import isImage from 'is-image';
import isUrl from 'is-url';
import Image from 'react-bootstrap/lib/Image';

/* eslint-disable require-jsdoc */

const {instanceOf} = PropTypes;

export default class Cell extends Component {

  static propTypes: Object;

  props: Object;

  shouldComponentUpdate(props: Object): boolean {
    return props.cell !== this.props.cell;
  }

  renderContent(): any {
    const value = this.props.cell.get('value');

    if (isImage(value)) {
      return <Image src={value} responsive />;
    }
    if (isUrl(value)) {
      return <a href={value}>{value}</a>;
    }

    return value;
  }

  render(): any {
    return <td>{this.renderContent()}</td>;
  }

}

Cell.propTypes = {cell: instanceOf(Map)};
