import React, { Component } from 'react';
import { AutoComplete, IconButton, Paper } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { grey500 } from 'material-ui/styles/colors';
import './searchBar.scss';

const getStyles = (props, state) => {
  const { value } = state;
  const nonEmpty = value.length > 0;

  return {
    root: {
      height: 60,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconButtonClose: {
      style: {
        transform: nonEmpty ? 'scale(1, 1)' : 'scale(0, 0)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      iconStyle: {
        opacity: nonEmpty ? 1 : 0,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
    iconButtonSearch: {
      style: {
        transform: nonEmpty ? 'scale(0, 0)' : 'scale(1, 1)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        marginRight: -48,
      },
      iconStyle: {
        opacity: nonEmpty ? 0 : 1,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
    searchContainer: {
      margin: 'auto 16px',
      width: '100%',
    },
  };
};

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      active: false,
      value: '',
    };
  }

  onRequestSearch() {
    console.log('onRequestSearch');
  }

  handleFocus = () => {
    this.setState({ focus: true });
  }

  handleBlur = () => {
    this.setState({ focus: false });
    if (this.state.value.trim().length === 0) {
      this.setState({ value: '' });
    }
  }

  handleInput = (e) => {
    this.setState({ value: e });
  }

  handleCancel = () => {
    this.setState({ active: false, value: '' });
  }

  handleKeyPressed = (e) => {
    if (e.charCode === 13) {
      this.onRequestSearch();
    }
  }

  render() {
    const styles = getStyles(this.props, this.state);
    const { value } = this.state;
    const data = ['Koło Naukowe Web Designu', 'Koło Naukowe Design Thinking', 'Koło Noukowe Brandico', 'Forum Edukacji Biznesowej', 'Hossa Pro Capital', 'WIGGOR']

    return (
      <Paper zDepth={1} style={{ ...styles.root }} >
        <div style={styles.searchContainer}>
          <AutoComplete
            onBlur={() => this.handleBlur()}
            searchText={value}
            onUpdateInput={this.handleInput}
            onKeyPress={this.handleKeyPressed}
            onFocus={() => this.handleFocus()}
            fullWidth
            underlineShow={false}
            // filter={AutoComplete.noFilter} Odkomentowac jak sugestie będą z backendu.
            filter={AutoComplete.fuzzyFilter}
            maxSearchResults={3}
            dataSource={data}
            hintText="Wyszukaj inicjatywy"
          />
        </div>
        <IconButton
          onTouchTap={this.onRequestSearch}
          iconStyle={styles.iconButtonSearch.iconStyle}
          style={styles.iconButtonSearch.style}
        >
          <SearchIcon color={grey500} />
        </IconButton>
        <IconButton
          onTouchTap={() => this.handleCancel()}
          iconStyle={styles.iconButtonClose.iconStyle}
          style={styles.iconButtonClose.style}
        >
          <CloseIcon color={grey500} />
        </IconButton>
      </Paper>
    );
  }
}
