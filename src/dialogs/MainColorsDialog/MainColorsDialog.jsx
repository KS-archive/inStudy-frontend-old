import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { changeColors } from '../../actions/circleEdit';
import { renderActionButtons } from '../../utils/renderHelpers';
import { StyledDialog, Form, Cover, StyledChromePicker, ColorValue } from './MainColorsDialog_styles';

class MainColorsDialog extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      colors: this.props.data,
      color: null,
      index: null,
    };
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  handleSubmit = () => {
    this.props.changeColors(this.state.colors);
    this.props.closeDialog();
  }

  changeColor = (color) => {
    const colors = [...this.state.colors];
    colors[this.state.index] = color.hex;
    this.setState({ color: color.hex, colors });
  }

  closeColorDialog = () => {
    this.setState({ color: null, index: null });
  }

  renderField = (el, i) => (
    <ColorValue
      key={i}
      color={el}
      onClick={() => { this.setState({ color: this.state.colors[i], index: i }); }}
    />
  );

  render() {
    const { sidebar, closeDialog } = this.props;
    const { colors, color, index } = this.state;

    return (
      <StyledDialog
        open
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Zmień paletę kolorystyczną"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form>
          {colors.map((el, i) => this.renderField(el, i))}
        </Form>
        {(color) &&
          <div>
            <Cover onClick={this.closeColorDialog} />
            <StyledChromePicker
              moveRight={`${-64 + (index * 70)}px`}
              color={color}
              onChange={this.changeColor}
              disableAlpha
            />
          </div>
        }
      </StyledDialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeColors }, dispatch);
}

export default connect(null, mapDispatchToProps)(MainColorsDialog);
