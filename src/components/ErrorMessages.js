/* @flow */

import React, {Component, PropTypes} from 'react';
import {clearErrors} from '../actions';
import Alert from 'react-bootstrap/lib/Alert';
import {List} from 'immutable';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {func, instanceOf} = PropTypes;

export default class ErrorMessages extends Component {

  static contextTypes: Object;

  static propTypes: Object;

  props: Object;

  context: Object;

  handleDismiss: () => void;

  constructor(props: Object) {
    super(props);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  shouldComponentUpdate(props: Object): boolean {
    return props.messages !== this.props.messages;
  }

  handleDismiss() {
    this.context.dispatch(clearErrors());
  }

  render(): any {
    return (
      <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
        <ul>
          {this.props.messages.map((message, i) => <li key={i}>{message}</li>)}
        </ul>
      </Alert>
    );
  }

}

ErrorMessages.propTypes = {messages: instanceOf(List)};
ErrorMessages.contextTypes = {dispatch: func};
