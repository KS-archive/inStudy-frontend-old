import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import { cities, types, categories } from '../../js/constants/filterData';
import { changeCardData } from '../../actions/circles';
import './cardEditDialog.scss';

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
      const { name, email, phone, date, motto, city, university, type, category, subcategory, dateCreated } = this.props;

      this.props.initialize({ name, email, phone, date, motto, city, university, type, category, subcategory, dateCreated });

      this.initialized = true;
    }
  }

  onSubmit = (values) => {
    const { changeCardData, closeDialog } = this.props;
    changeCardData(values, closeDialog);
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

  renderTextField(name, label, type, isRequired) {
    return (
      <Field
        className="cardEditDialog__field"
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
      className: 'cardEditDialog__field',
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
        <Field {...fieldAttrs}>
          {Object.keys(items).map(key =>
            <MenuItem key={key} value={key} primaryText={items[key].name} />)
          }
        </Field>
      )
      : <Field {...fieldAttrs} disabled />;
  }

  render() {
    const { handleSubmit, open, closeDialog } = this.props;
    const dialogStyle = this.props.sidebar ? { width: 'calc(100vw - 150px)', marginLeft: 150 } : {};

    return (
      <Dialog
        open={open}
        onRequestClose={closeDialog}
        className="modal__container edit"
        bodyClassName="cardEditDialog__container"
        style={dialogStyle}
        autoScrollBodyContent
      >
        <form className="cardEditDialog__form" onSubmit={handleSubmit(this.onSubmit)}>
          <h1 className="cardEditDialog__header">Edytuj podstawowe dane</h1>
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
          <div className="cardEditDialog__buttonContainer">
            <FlatButton
              className="cardEditDialog__button"
              label="Anuluj"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              onClick={closeDialog}
            />
            <RaisedButton
              className="cardEditDialog__button"
              label="Zapisz zmiany"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              type="submit"
              primary
            />
          </div>
        </form>
      </Dialog>
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
