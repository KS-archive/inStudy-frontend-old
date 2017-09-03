import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import socials from '../../../js/constants/socials';
import { inputStyle } from '../../../js/constants/styles';
import { StyledField, SocialFields, DeleteSocial, AddSocialFields } from './RenderSocials_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

export default class renderSocials extends Component {
  componentWillMount() {
    this.props.initialize.map((social, index) => {
      this.props.fields.insert(index, social);
    });
  }

  renderField = (name, label, items = null) => {
    const isSelectField = !!items;
    const FieldAttrs = {
      name,
      component: isSelectField ? SelectField : TextField,
      floatingLabelText: label,
      validate: required,
      ...inputStyle,
    };
    return (isSelectField)
      ? (
        <StyledField {...FieldAttrs} >
          {Object.keys(items).map(key => (
            <MenuItem
              key={key}
              value={items[key].id}
              primaryText={items[key].name}
            />))
          }
        </StyledField>
      )
      : <StyledField {...FieldAttrs} />;
  }

  render() {
    const fields = this.props.fields;
    return (
      <div>
        {fields.map((social, index) => (
          <SocialFields key={index}>
            {this.renderField(`${social}.id`, 'Typ aktywności', socials)}
            {this.renderField(`${social}.link`, 'Link do profilu')}
            <DeleteSocial onClick={() => fields.remove(index)}>
              <i className="fa fa-times" aria-hidden="true" />
            </DeleteSocial>
          </SocialFields>
        ))}
        <AddSocialFields onClick={() => fields.push({})}>
          <i className="fa fa-plus" aria-hidden="true" />
        </AddSocialFields>
      </div>
    );
  }
}
