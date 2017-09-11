import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import clone from 'lodash/clone';
import { StyledDialog, Form, Fields, ColorName, ColorValues, ColorValue } from './ColorsDialog_styles';

export default class ColorsDialog extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      colors: (Array.isArray(this.props.data[0])) ? this.props.data[0] : this.props.data,
    };
  }

  submit = () => {
    this.props.submit(this.state.colors);
    this.props.closeDialog();
  }

  changeColor = (arrIndex, colorIndex) => {
    if (this.state.colors[arrIndex] !== colorIndex) {
      const colors = clone(this.state.colors);
      colors[arrIndex] = colorIndex;
      this.setState({ colors });
    }
  }

  renderField = (index) => {
    const name = this.props.names[index];
    const elColor = this.state.colors[index];
    return (
      <Fields key={index}>
        <ColorName>{name}</ColorName>
        <ColorValues>
          {this.props.mainColors.map((color, i) => (
            <ColorValue
              key={color}
              color={color}
              selected={i === elColor}
              onClick={() => { this.changeColor(index, i); }}
            />
          ),
          )}
        </ColorValues>
      </Fields>
    );
  }

  render() {
    const { sidebar, closeDialog, open } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.submit}
        primary
      />,
    ];

    return (
      <StyledDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title="Zmień kolory"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form>
          {this.state.colors.map((el, i) => this.renderField(i))}
        </Form>
      </StyledDialog>
    );
  }
}
