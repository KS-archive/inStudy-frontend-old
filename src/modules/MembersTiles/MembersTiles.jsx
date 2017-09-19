import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import MembersTile from '../MembersTile/MembersTile';
import MembersTile2 from '../MembersTile2/MembersTile2';
import MembersTile3 from '../MembersTile3/MembersTile3';
import MembersDialog from '../../dialogs/MembersDialog/MembersDialog';
import { SectionHeader } from '../../js/globalStyles';
import { List, More } from './MembersTiles_styles';

export default class MembersTiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false,
      dialog: false,
      dialogData: {},
    };
  }

  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  initialize = (props) => {
    const { randomize, content, startGray, rowsLimit, type } = props;
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
    this.setState({
      noLimit: content.length <= 4 * rowsLimit,
      elements: randomize ? shuffle(content) : content,
      grayScale: startGray,
    });
  }

  openDialog = (id) => {
    const dialogData = this.props.content.filter(tile => (tile.id === id));
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
      const openDialog = () => { this.openDialog(tile.id); };
      const attrs = { grayScale, mainColors, openDialog, roleColor: color, ...tile };
      return (isInLimit) && <MemberComponent key={tile.id} {...attrs} />;
    });
  }

  render() {
    const { title, rowsLimit, mainColors, color } = this.props;
    const { showAll, dialog, dialogData, noLimit } = this.state;

    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <List>
          {this.renderTiles()}
        </List>
        {(!showAll && rowsLimit !== 0 && !noLimit) &&
          <More onClick={() => { this.setState({ showAll: true }); }}>...</More>
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
