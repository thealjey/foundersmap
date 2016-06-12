/* @flow */

import React, {Component, PropTypes} from 'react';
import Editor from './Editor';
import DataGrid from './DataGrid';
import ErrorMessages from './ErrorMessages';
import GoogleMap from './GoogleMap';
import {Map} from 'immutable';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';

/* eslint-disable require-jsdoc */

const {instanceOf, func} = PropTypes,
  defaultEditorHeight = 50;

export default class Application extends Component {

  static propTypes: Object;

  static childContextTypes: Object;

  props: Object;

  shouldComponentUpdate(props: Object): boolean {
    return props.state !== this.props.state;
  }

  getChildContext() {
    return {dispatch: this.props.dispatch};
  }

  render(): any {
    const {state} = this.props,
      errors = state.get('errors'),
      data = state.get('data'),
      activePage = state.get('grid_page', 1),
      editorHeight = state.get('editor_height', defaultEditorHeight),
      filter = state.get('grid_filter', ''),
      sort = state.get('grid_sort'),
      dir = state.get('grid_dir'),
      delimiter = state.get('delimiter', ','),
      labelField = state.get('label_field', ''),
      latitudeField = state.get('latitude_field', ''),
      longitudeField = state.get('longitude_field', '');

    return (
      <Grid fluid>
        <PageHeader>Founder's Map <small>start by entering arbitrary CSV text</small></PageHeader>
        {errors && errors.size ? <ErrorMessages messages={errors} /> : null}
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Editor text={state.get('text')} delimiter={delimiter} editorHeight={editorHeight} />
          </Col>
          <Col lg={8} md={6} sm={12}>
            {data ? <GoogleMap
              data={data}
              labelField={labelField}
              latitudeField={latitudeField}
              longitudeField={longitudeField}
            /> : null}
          </Col>
        </Row>
        {data ? <DataGrid
          data={data}
          activePage={activePage}
          filter={filter}
          sort={sort}
          dir={dir}
          labelField={labelField}
          latitudeField={latitudeField}
          longitudeField={longitudeField}
        /> : null}
      </Grid>
    );
  }

}

Application.propTypes = {state: instanceOf(Map), dispatch: func};
Application.childContextTypes = {dispatch: func};
