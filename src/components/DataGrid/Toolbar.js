/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {findDOMNode} from 'react-dom';
import FormControl from 'react-bootstrap/lib/FormControl';
import debounce from 'lodash/debounce';
import {batch, selectPage, setFilter, setLabelField, setLatitudeField, setLongitudeField} from '../../actions';
import {List} from 'immutable';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {string, func, instanceOf} = PropTypes,
  delay = 500;

export default class Toolbar extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  filterField: any;

  setFilterField: (field: any) => void;

  handleFilterChange: () => void;

  handleLabelFieldChange: (e: any) => void;

  handleLatitudeFieldChange: (e: any) => void;

  handleLongitudeFieldChange: (e: any) => void;

  constructor(props: Object) {
    super(props);
    this.handleFilterChange = debounce(this.handleFilterChange.bind(this), delay);
    this.setFilterField = this.setFilterField.bind(this);
    this.handleLabelFieldChange = this.handleLabelFieldChange.bind(this);
    this.handleLatitudeFieldChange = this.handleLatitudeFieldChange.bind(this);
    this.handleLongitudeFieldChange = this.handleLongitudeFieldChange.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  setFilterField(field: any) {
    this.filterField = findDOMNode(field);
  }

  handleFilterChange() {
    this.context.dispatch(batch([
      selectPage(1),
      setFilter(this.filterField.value)
    ]));
  }

  handleLabelFieldChange(e: any) {
    this.context.dispatch(setLabelField(e.target.value));
  }

  handleLatitudeFieldChange(e: any) {
    this.context.dispatch(setLatitudeField(e.target.value));
  }

  handleLongitudeFieldChange(e: any) {
    this.context.dispatch(setLongitudeField(e.target.value));
  }

  renderColumnOptions() {
    return this.props.headers.map((header, i) => <option key={i} value={i}>{header}</option>);
  }

  render(): any {
    const {filter, labelField, latitudeField, longitudeField} = this.props,
      columnOptions = this.renderColumnOptions();

    return (
      <div className="x-grid-toolbar">
        <FormControl
          defaultValue={filter}
          ref={this.setFilterField}
          type="text"
          placeholder="Filter..."
          onChange={this.handleFilterChange}
        />
        <FormControl onChange={this.handleLabelFieldChange} value={labelField} componentClass="select" required>
          <option value="" disabled>Marker label... *</option>
          {columnOptions}
        </FormControl>
        <FormControl onChange={this.handleLatitudeFieldChange} value={latitudeField} componentClass="select" required>
          <option value="" disabled>Latitude... *</option>
          {columnOptions}
        </FormControl>
        <FormControl onChange={this.handleLongitudeFieldChange} value={longitudeField} componentClass="select" required>
          <option value="" disabled>Longitude... *</option>
          {columnOptions}
        </FormControl>
      </div>
    );
  }

}

Toolbar.propTypes = {filter: string, headers: instanceOf(List), labelField: string, latitudeField: string,
  longitudeField: string};
Toolbar.contextTypes = {dispatch: func};
