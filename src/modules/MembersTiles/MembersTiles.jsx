import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import MembersTile from '../MembersTile/MembersTile';
import MembersTile2 from '../MembersTile2/MembersTile2';
import MembersTile3 from '../MembersTile3/MembersTile3';
import MembersDialog from '../../dialogs/MembersDialog/MembersDialog';
import './membersTiles.scss';

export default class MembersTiles extends Component {
  constructor(props) {
    super(props);
    const { randomize, content, startGray, rowsLimit, type } = this.props;
    switch (type) {
      case 0: this.type = {
        memberComponent: MembersTile,
      }; break;
      case 1: this.type = {
        memberComponent: MembersTile2,
      }; break;
      default: this.type = {
        memberComponent: MembersTile3,
      }; break;
    }

    this.state = {
      showAll: false,
      noLimit: content.length <= 4 * rowsLimit,
      elements: randomize ? shuffle(content) : content,
      grayScale: startGray,
      dialog: false,
      dialogData: {},
    };
  }

  openDialog = (id) => {
    const dialogData = this.props.content.filter(tile => (tile._id === id));
    this.setState({ dialog: true, dialogData: dialogData[0] });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  renderTiles = () => {
    const { rowsLimit, mainColors, color } = this.props;
    const { elements, showAll, grayScale } = this.state;
    const MemberComponent = this.type.memberComponent;

    return elements.map((tile, index) => {
      const isInLimit = (index < rowsLimit * 4 || showAll || !rowsLimit);
      const openDialog = () => { this.openDialog(tile._id); };
      const attrs = { grayScale, mainColors, openDialog, roleColor: color, ...tile };

      return (isInLimit) && <MemberComponent key={tile._id} {...attrs} />;
    });
  }

  render() {
    const { title, rowsLimit, mainColors, color } = this.props;
    const { showAll, dialog, dialogData } = this.state;

    return (
      <div className="membersTiles__wrapper">
        <h1 className="body__sectionHeader">{title}</h1>
        <div className="membersTiles__list">
          {this.renderTiles()}
        </div>
        {(!showAll && rowsLimit !== 0) &&
          <div className="membersTiles__more" onClick={() => { this.setState({ showAll: true }); }}>...</div>
        }
        <MembersDialog
          closeDialog={this.closeDialog}
          open={dialog}
          color={mainColors[color]}
          {...dialogData}
        />
      </div>
    );
  }
}
