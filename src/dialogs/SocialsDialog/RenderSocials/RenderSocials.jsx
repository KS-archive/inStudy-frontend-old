import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import socials from '../../../utils/constants/socials';
import { inputStyle } from '../../../utils/constants/styles';
import { StyledField, SocialFields, DeleteSocial, AddSocialFields } from './RenderSocials_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);
const link = (value) => {
  const isLinkRegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return value.match(isLinkRegExp) ? undefined : 'Błędny format linku';
};

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
      ...inputStyle,
    };
    return (isSelectField)
      ? (
        <StyledField {...FieldAttrs} validate={required} >
          {Object.keys(items).map(key => (
            <MenuItem
              key={key}
              value={items[key].id}
              primaryText={items[key].name}
            />))
          }
        </StyledField>
      )
      : <StyledField {...FieldAttrs} validate={[required, link]} />;
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
