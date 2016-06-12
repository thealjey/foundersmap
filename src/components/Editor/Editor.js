/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {findDOMNode} from 'react-dom';
import {setText, addError, setData, selectPage, setEditorHeight, batch} from '../../actions';
import Panel from 'react-bootstrap/lib/Panel';
import FormControl from 'react-bootstrap/lib/FormControl';
import parse from 'csv-parse';
import debounce from 'lodash/debounce';
import trim from 'lodash/trim';
import Delimiter from './Delimiter';

/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */

const {func, string, number} = PropTypes,
  delay = 500;

export default class Editor extends Component {

  static contextTypes: Object;

  static propTypes: Object;

  props: Object;

  context: Object;

  field: any;

  handleChange: () => void;

  setField: (field: any) => void;

  constructor(props: Object) {
    super(props);
    this.handleChange = debounce(this.handleChange.bind(this), delay);
    this.setField = this.setField.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  setField(field: any) {
    this.field = findDOMNode(field);
  }

  handleChange() {
    const {field} = this,
      text = trim(field.value);

    if (!text) {
      return;
    }

    parse(text, {trim: true, delimiter: this.props.delimiter, auto_parse: true}, (err, output) => {
      const {dispatch} = this.context;

      if (err) {
        return dispatch(addError(err));
      }

      const {height} = field.style;

      field.style.height = '5px';

      const {scrollHeight} = field;

      field.style.height = height;

      dispatch(batch([
        setEditorHeight(scrollHeight),
        setText(text),
        selectPage(1),
        setData(output)
      ]));
    });
  }

  render(): any {
    const {text, editorHeight, delimiter} = this.props;

    return (
      <Panel className="x-csv-editor" header={<Delimiter onChange={this.handleChange} value={delimiter} />}>
        <FormControl
          style={{height: editorHeight}}
          ref={this.setField}
          defaultValue={text}
          onChange={this.handleChange}
          componentClass="textarea"
        />
      </Panel>
    );
  }

}

Editor.propTypes = {text: string, editorHeight: number, delimiter: string};
Editor.contextTypes = {dispatch: func};
