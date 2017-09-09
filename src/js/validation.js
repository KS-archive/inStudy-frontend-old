import pick from 'lodash/pick';
import keys from 'lodash/keys';
import { hasAnyValue } from './utils';

const validation = {
  required: (value, message) => {
    if (!value || !value.toString().trim()) {
      return (typeof message === 'string')
        ? message
        : 'To pole jest wymagane';
    }
    return null;
  },
  noEmptyArr: (values) => {
    if (!values || values.length === 0) {
      return 'Musisz dodać co najmniej jeden element';
    }
    return null;
  },
  naturalNumber: (value) => {
    const naturalReg = /^(0|([1-9]\d*))$/;
    if (!naturalReg.test(value)) {
      return 'Wartość w tym polu musi być liczbą naturalną';
    }
    return null;
  },
};

// export default (validate, values, haveErrors, noErrors) => {
export default (comp, successCallback) => {
  const toValidate = pick(comp.state, keys(comp.toValidate));
  const errors = {};
  Object.keys(comp.toValidate).map((key) => {
    errors[key] = null;
    Object.keys(comp.toValidate[key]).map((innerKey) => {
      if (!errors[key]) {
        errors[key] = validation[innerKey](toValidate[key], comp.toValidate[key][innerKey]);
      }
    });
  });
  if (hasAnyValue(errors)) {
    comp.setState({ errors });
  } else {
    const valuesToSubmit = pick(comp.state, comp.values);
    successCallback(valuesToSubmit);
  }
};
