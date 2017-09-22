import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import MenuItem from 'material-ui/MenuItem';
import validate from '../../utils/validation';
import { cities, types, categories } from '../../utils/constants/filterData';
import { renderActionButtons } from '../../utils/renderHelpers';
import { changeCardData } from '../../actions/circleEdit';
import { addNotification } from '../../actions/notifications';
import { EditDialog } from '../../utils/globalStyles';
import { inputStyle } from '../../utils/constants/styles';
import { StyledTextField, StyledSelectField, Form } from './CardEditDialog_styles';

class CardEditDialog extends Component {
  constructor(props) {
    super(props);
    const { name, type, category, subcategory, city, university, email, phone, dateCreated, motto } = this.props.data;
    this.state = {
      name,
      type,
      category,
      subcategory,
      city,
      university,
      email,
      phone: phone || undefined,
      dateCreated: dateCreated || undefined,
      motto: motto || undefined,
      errors: {},
      universities: cities[this.props.city].universities,
      subcategories: categories[this.props.category].subcategories,
    };
    this.toValidate = {
      name: { required: true },
      type: { required: true },
      category: { required: true },
      subcategory: { required: true },
      city: { required: true },
      university: { required: true },
      email: { required: true },
    };
    this.values = ['name', 'type', 'category', 'subcategory', 'city', 'university', 'email', 'phone', 'dateCreated', 'motto'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  setUniversities = (cityId) => {
    const universities = cities[cityId].universities;
    this.setState({ universities, university: undefined });
  }

  setSubcategories = (categoryId) => {
    const subcategories = categories[categoryId].subcategories;
    this.setState({ subcategories, subcategory: undefined });
  }

  submit = (values) => {
    this.props.changeCardData(
      values,
      () => { this.props.addNotification('Zaktualizowano!', 'Podstawowe dane koła zostały zmienione', 'success'); this.props.closeDialog(); this.props.renderCircle(); },
      () => { this.props.addNotification('Wystąpił błąd', 'Podstawowe dane koła nie zostały zmienione', 'error'); },
    );
  }

  handleSubmit = () => { validate(this, this.submit); }

  renderTextField(name, label) {
    const { errors } = this.state;
    const attrs = {
      floatingLabelText: label,
      value: this.state[name],
      onChange: (e) => { this.setState({ [name]: e.target.value }); },
      errorText: errors[name],
      ...inputStyle,
    };
    return <StyledTextField {...attrs} />;
  }

  renderSelectField(name, floatingLabelText, items, changeFc = () => {}) {
    const { errors } = this.state;
    const onChange = (event, index, value) => {
      this.setState({ [name]: value }, () => { changeFc(value); });
    };
    const value = this.state[name] && this.state[name].toString();
    const errorText = errors[name];
    const attrs = { floatingLabelText, errorText, value, onChange, ...inputStyle };

    return (
      <StyledSelectField {...attrs}>
        {Object.keys(items).map(key => (
          <MenuItem key={items[key].id} value={items[key].id} primaryText={items[key].name} />
        ))}
      </StyledSelectField>
    );
  }

  render() {
    const { closeDialog, open, sidebar } = this.props;
    const { universities, subcategories } = this.state;
    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Edytuj podstawowe dane"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form>
          {this.renderTextField('name', 'Nazwa aktywności')}
          {this.renderSelectField('type', 'Typ aktywności', types)}
          {this.renderSelectField('category', 'Kategoria', categories, this.setSubcategories)}
          {this.renderSelectField('subcategory', 'Podkategoria', subcategories)}
          {this.renderSelectField('city', 'Miasto', cities, this.setUniversities)}
          {this.renderSelectField('university', 'Uczelnia', universities)}
          {this.renderTextField('email', 'E-mail')}
          {this.renderTextField('phone', 'Telefon')}
          {this.renderTextField('dateCreated', 'Data założenia')}
          {this.renderTextField('motto', 'Motto')}
        </Form>
      </EditDialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCardData, addNotification }, dispatch);
}

export default connect(null, mapDispatchToProps)(CardEditDialog);
