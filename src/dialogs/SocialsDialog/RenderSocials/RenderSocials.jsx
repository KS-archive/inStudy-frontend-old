import React, { Component } from 'react';
import Field from 'redux-form/lib/Field';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import socials from '../../../js/socials';
import './renderSocials.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

export default class renderSocials extends Component {
  componentWillMount() {
    this.props.initialize.map((social, index) => {
      this.props.fields.insert(index, social);
    });
  }

  renderTextField = (name, label) => (
    <Field
      className="renderSocials__field"
      name={name}
      component={TextField}
      floatingLabelText={label}
      floatingLabelFocusStyle={{ fontWeight: 500 }}
      floatingLabelShrinkStyle={{ fontWeight: 900 }}
      style={{ fontWeight: 500 }}
      validate={required}
    />
  );

  renderSelectField = (name, label, items) => {
    if (items && items.length !== 0) {
      return (
        <Field
          className="renderSocials__field"
          name={name}
          component={SelectField}
          floatingLabelText={label}
          floatingLabelFocusStyle={{ fontWeight: 500 }}
          floatingLabelShrinkStyle={{ fontWeight: 900 }}
          style={{ fontWeight: 500 }}
          validate={required}
        >
          {Object.keys(items).map(key => <MenuItem key={key} value={key} primaryText={items[key].name} />)}
        </Field>
      );
    }
    return (
      <Field
        className="renderSocials__field"
        name={name}
        component={SelectField}
        floatingLabelText={label}
        floatingLabelFocusStyle={{ fontWeight: 500 }}
        floatingLabelShrinkStyle={{ fontWeight: 900 }}
        style={{ fontWeight: 500 }}
        disabled
      />
    );
  };

  render() {
    const fields = this.props.fields;
    return (
      <div>
        {fields.map((social, index) => (
          <li className="renderSocials__social" key={index}>
            {this.renderSelectField(`${social}.name`, 'Typ aktywności', socials)}
            {this.renderTextField(`${social}.link`, 'Link do profilu')}
            <div className="renderSocials__deleteSocial" onClick={() => fields.remove(index)}>
              <i className="fa fa-times" aria-hidden="true" />
            </div>
          </li>
        ))}
        <div className="renderSocials__add" onClick={() => fields.push({})}>
          <i className="fa fa-plus" aria-hidden="true" />
        </div>
      </div>
    );
  }
}
