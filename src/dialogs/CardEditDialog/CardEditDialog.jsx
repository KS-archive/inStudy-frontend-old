import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import omit from 'lodash/omit';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import { cities, types, categories } from '../../js/constants/filterData';
import { changeCardData } from '../../actions/circleEdit';
import { EditDialog } from '../../js/globalStyles';
import { StyledField, Form } from './CardEditDialog_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class CardEditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: cities[this.props.city].universities,
      subcategories: categories[this.props.category].subcategories,
    };
    this.initialized = false;
  }

  componentDidUpdate() {
    if (!this.initialized) {
      const { name, email, phone, date, motto, dateCreated } = this.props;
      const city = this.props.city.toString();
      const university = this.props.city.toString();
      const type = this.props.city.toString();
      const category = this.props.city.toString();
      const subcategory = this.props.city.toString();

      this.props.initialize({ name, email, phone, date, motto, city, university, type, category, subcategory, dateCreated });

      this.initialized = true;
    }
  }

  onSubmit = (values) => {
    const { changeCardData, closeDialog } = this.props;
    changeCardData(omit(values, 'date'), closeDialog);
  }

  setUniversities = (cityId) => {
    this.props.change('university', null);
    const universities = cities[cityId].universities;
    this.setState({ universities });
  }

  setSubcategories = (categoryId) => {
    this.props.change('subcategory', null);
    const subcategories = categories[categoryId].subcategories;
    this.setState({ subcategories });
  }

  makeActivityInfoUpdateHandler = () => {
    this.activityFormButton.click();
  }

  renderTextField(name, label, type, isRequired) {
    return (
      <StyledField
        name={name}
        type={type}
        component={TextField}
        floatingLabelText={label}
        floatingLabelFocusStyle={{ fontWeight: 500 }}
        floatingLabelShrinkStyle={{ fontWeight: 900 }}
        style={{ fontWeight: 500 }}
        validate={isRequired ? required : null}
      />
    );
  }

  renderSelectField(name, label, items, changefc) {
    const fieldAttrs = {
      name,
      component: SelectField,
      floatingLabelText: label,
      floatingLabelFocusStyle: { fontWeight: 500 },
      floatingLabelShrinkStyle: { fontWeight: 500 },
      style: { fontWeight: 500 },
      onChange: changefc,
      validate: required,
    };
    return (items && items.length !== 0)
      ? (
        <StyledField {...fieldAttrs}>
          {Object.keys(items).map(key =>
            <MenuItem key={key} value={key} primaryText={items[key].name} />)
          }
        </StyledField>
      )
      : <StyledField {...fieldAttrs} disabled />;
  }

  render() {
    const { handleSubmit, closeDialog, submitting, pristine, destroy, open, sidebar } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        disabled={pristine || submitting}
        onTouchTap={() => { closeDialog(); destroy(); }}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.makeActivityInfoUpdateHandler}
        disabled={submitting}
        primary
      />,
    ];

    return (
      <EditDialog
        open={open}
        onRequestClose={() => { closeDialog(); destroy(); }}
        actions={actions}
        title="Edytuj podstawowe dane"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderTextField('name', 'Nazwa aktywności', 'text', true)}
          {this.renderSelectField('type', 'Typ aktywności', types)}
          {this.renderSelectField('category', 'Kategoria', categories, (e, key) => { this.setSubcategories(key); })}
          {this.renderSelectField('subcategory', 'Podkategoria', this.state.subcategories)}
          {this.renderSelectField('city', 'Miasto', cities, (e, key) => { this.setUniversities(key); })}
          {this.renderSelectField('university', 'Uczelnia', this.state.universities)}
          {this.renderTextField('email', 'E-mail', 'text', true)}
          {this.renderTextField('phone', 'Telefon', 'text')}
          {this.renderTextField('dateCreated', 'Data założenia', 'text')}
          {this.renderTextField('motto', 'Motto', 'text')}
          <button style={{ visibility: 'hidden', position: 'fixed' }} type="submit" ref={(button) => { this.activityFormButton = button; }} />
        </Form>
      </EditDialog>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres email';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    selectHelpers: state.selectHelpers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCardData }, dispatch);
}

export default reduxForm({
  validate,
  form: 'CardEditDialogForm',
})(connect(mapStateToProps, mapDispatchToProps)(CardEditDialog));
