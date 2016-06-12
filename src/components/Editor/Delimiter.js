/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import {setDelimiter} from '../../actions';
import noop from 'lodash/noop';

/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */

const {func, string} = PropTypes;

export default class Delimiter extends Component {

  static contextTypes: Object;

  static propTypes: Object;

  static defaultProps: Object;

  props: Object;

  context: Object;

  handleChange: (e: any) => void;

  constructor(props: Object) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  handleChange(e: any) {
    this.context.dispatch(setDelimiter(e.target.value));
    this.props.onChange();
  }

  render(): any {
    return (
      <FormGroup className="x-delimiter-select">
        <ControlLabel>Delimiter:</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.props.value} componentClass="select">
          <option value=",">Comma</option>
          <option value=";">Semicolon</option>
          <option value={'\t'}>Tab</option>
        </FormControl>
      </FormGroup>
    );
  }

}

Delimiter.propTypes = {value: string, onChange: func};
Delimiter.defaultProps = {onChange: noop};
Delimiter.contextTypes = {dispatch: func};
