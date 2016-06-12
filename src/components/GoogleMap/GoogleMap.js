/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import ReactGoogleMap from 'react-google-maps/lib/GoogleMap';
import Marker from 'react-google-maps/lib/Marker';
import {Map, List} from 'immutable';
import isFinite from 'lodash/isFinite';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {instanceOf, string} = PropTypes,
  defaultCenter = {lat: 49.8397, lng: 24.0297};

export default class GoogleMap extends Component {

  static propTypes: Object;

  props: Object;

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  getFilteredRows(): ?List {
    const {data, labelField, latitudeField, longitudeField} = this.props;

    if (!labelField || !latitudeField || !longitudeField) {
      return;
    }

    return data.get('rows').filter(row => {
      const cells = row.get('cells');

      return row.get('checked') && isFinite(cells.get(latitudeField).get('value')) &&
        isFinite(cells.get(longitudeField).get('value'));
    });
  }

  getCenter(rows: ?List): {lat: number, lng: number} {
    if (!rows || !rows.size) {
      return defaultCenter;
    }
    const {latitudeField, longitudeField} = this.props,
      cells = rows.first().get('cells');

    return {lat: cells.get(latitudeField).get('value'), lng: cells.get(longitudeField).get('value')};
  }

  renderMarkers(rows: ?List): ?List {
    if (!rows || !rows.size) {
      return null;
    }
    const {labelField, latitudeField, longitudeField} = this.props;

    return rows.map((row, i) => {
      const cells = row.get('cells');

      return (
        <Marker
          key={i}
          label={cells.get(labelField).get('value')}
          position={{lat: cells.get(latitudeField).get('value'), lng: cells.get(longitudeField).get('value')}}
        />
      );
    });
  }

  render(): any {
    const rows = this.getFilteredRows();

    return (
      <ScriptjsLoader hostname="maps.googleapis.com" pathname="/maps/api/js"
        query={{key: 'AIzaSyCwwfps8VIJohOQkOKxnBk7PnKLG5PyV-s'}}
        loadingElement={null}
        containerElement={<div className="x-google-map panel panel-default" />}
        googleMapElement={
          <ReactGoogleMap
            options={{scrollwheel: false}}
            zoom={12}
            center={this.getCenter(rows)}
          >
            {this.renderMarkers(rows)}
          </ReactGoogleMap>
        }
      />
    );
  }

}

GoogleMap.propTypes = {data: instanceOf(Map), labelField: string, latitudeField: string, longitudeField: string};
