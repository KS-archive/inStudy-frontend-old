import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import { fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories } from '../../actions/helpers';
import './cardEditDialog.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class CardEditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  componentWillMount() {
    this.props.fetchCities();
    this.props.fetchTypes();
    this.props.fetchCategories();
  }

  componentDidUpdate() {
    const { name, email, phone, date, motto, selectHelpers } = this.props;
    if (!selectHelpers.universities && selectHelpers.cities && this.props.city && selectHelpers.categories && this.props.category) {
      this.props.fetchUniversities(this.getIdByName('cities', 'city'));
      this.props.fetchSubactegories(this.getIdByName('categories', 'category'));
    }
    if (!this.state.initialized && name && selectHelpers.universities && selectHelpers.subcategories) {
      const city = this.getIdByName('cities', 'city');
      const university = this.getIdByName('universities', 'university');
      const type = this.getIdByName('types', 'type');
      const category = this.getIdByName('categories', 'category');
      const subcategory = this.getIdByName('subcategories', 'subcategory');
      this.props.initialize({ name, email, phone, date, motto, city, university, type, category, subcategory });
      this.setState({ initialized: true });
    }
  }

  onSubmit = (values) => {
    console.log(values);
  }

  getIdByName = (arrName, elName) => {
    let id;
    this.props.selectHelpers[arrName].map((el) => { if (el.name === this.props[elName]) id = el.id; });
    return id;
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

  renderSelectField(name, label, items) {
    if (items && items.length !== 0) {
      return (
        <Field
          className="cardEditDialog__field"
          name={name}
          component={SelectField}
          floatingLabelText={label}
          floatingLabelFocusStyle={{ fontWeight: 500 }}
          floatingLabelShrinkStyle={{ fontWeight: 900 }}
          style={{ fontWeight: 500 }}
          validate={required}
        >
          {Object.keys(items).map(key => <MenuItem key={key} value={items[key].id} primaryText={items[key].name} />)}
        </Field>
      );
    }
    return (
      <Field
        className="cardEditDialog__field"
        name={name}
        component={SelectField}
        floatingLabelText={label}
        floatingLabelFocusStyle={{ fontWeight: 500 }}
        floatingLabelShrinkStyle={{ fontWeight: 900 }}
        style={{ fontWeight: 500 }}
        disabled
      />
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const dialogStyle = this.props.sidebar ? { width: 'calc(100vw - 150px)', marginLeft: 150 } : {};
    console.log(this.props);

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        className="modal__container edit"
        bodyClassName="cardEditDialog__container"
        style={dialogStyle}
        autoScrollBodyContent
      >
        <form className="cardEditDialog__form" onSubmit={handleSubmit(this.onSubmit)}>
          <h1 className="cardEditDialog__header">Edytuj podstawowe dane</h1>
          {this.renderTextField('name', 'Nazwa aktywności', 'text', true)}
          {this.renderSelectField('type', 'Typ aktywności', this.props.selectHelpers.types)}
          {this.renderSelectField('category', 'Kategoria', this.props.selectHelpers.categories)}
          {this.renderSelectField('subcategory', 'Podkategoria', this.props.selectHelpers.subcategories)}
          {this.renderSelectField('university', 'Uczelnia', this.props.selectHelpers.universities)}
          {this.renderSelectField('city', 'Miasto', this.props.selectHelpers.cities)}
          {this.renderTextField('email', 'E-mail', 'text', true)}
          {this.renderTextField('phone', 'Telefon', 'text')}
          {this.renderTextField('date', 'Data założenia', 'text')}
          {this.renderTextField('motto', 'Motto', 'text')}
          <div className="cardEditDialog__buttonContainer">
            <FlatButton
              className="cardEditDialog__button"
              label="Anuluj"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              type="submit"
            />
            <RaisedButton
              className="cardEditDialog__button"
              label="Zapisz zmiany"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
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
  return bindActionCreators({ fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories }, dispatch);
}

export default reduxForm({
  validate,
  form: 'CardEditDialogForm',
})(connect(mapStateToProps, mapDispatchToProps)(CardEditDialog));
