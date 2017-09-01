import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { updateFilter } from '../../actions/filters';

class Filter extends Component {
  changeHandler = (event, key, value) => {
    const { updateFilter, changeHandler, id } = this.props;
    updateFilter(id, value);
    if (changeHandler) changeHandler(value);
  }

  render() {
    const { label, items, multiple } = this.props;
    const filterValue = this.props.filters[this.props.id];
    const isActive = (filterValue && !Array.isArray(filterValue)) || (Array.isArray(filterValue) && filterValue.length > 0);
    const underlineStyle = (isActive)
      ? { borderBottomWidth: '2px', borderBottomColor: '#303F9F' }
      : { borderBottomWidth: '1px', borderBottomColor: '#bbbbbb' };

    return (
      <SelectField
        floatingLabelText={label}
        floatingLabelStyle={(isActive) ? { fontWeight: '500', color: '#303F9F' } : {}}
        onChange={this.changeHandler}
        value={filterValue}
        multiple={multiple}
        style={{ minWidth: 200, margin: '0 20px 20px' }}
        underlineStyle={underlineStyle}
        disabled={!items}
      >
        {items && Object.keys(items).map(key =>
          <MenuItem key={key} value={items[key].id} primaryText={items[key].name} />,
        )}
      </SelectField>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
