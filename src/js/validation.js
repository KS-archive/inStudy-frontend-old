import mapKeys from 'lodash/mapKeys';

export default (validate, callback) => {
  const errors = {};
  Object.keys(validate).map((key) => {
    errors[key] = null;
    Object.keys(validate[key]).map((innerKey) => {
      if (!errors[key]) {
        validation[innerKey](validate[key][innerKey]);
      }
    });
  });
};

const validation = (value) => {

}
