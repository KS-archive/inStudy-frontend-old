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
    this.state = {
      showAll: false,
      firstLoad: true,
      elements: [],
      grayScale: { filter: 'grayscale(0)' },
      dialog: false,
      dialogData: {},
    };
  }

  componentWillMount() {
    if (this.state.grayScale.filter === 'grayscale(0)' && this.props.startGray) this.setState({ grayScale: { filter: 'grayscale(1)' } });
    const elements = (this.props.randomize && this.state.firstLoad) ? shuffle(this.props.tiles) : this.props.tiles;
    this.setState({ firstLoad: false, elements });
  }

  openDialog = (id) => {
    const dialogData = this.props.tiles.filter(tile => (tile._id === id));
    this.setState({ dialog: true, dialogData: dialogData[0] });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  renderTiles = () => {
    let Members;
    switch (this.props.type) {
      case 1: Members = MembersTile; break;
      case 2: Members = MembersTile2; break;
      case 3: Members = MembersTile3; break;
      default: Members = null;
    }
    return this.state.elements.map((tile, index) => {
      if (index < this.props.rowsLimit * 4 || this.state.showAll || !this.props.rowsLimit) {
        return (<Members
          key={tile._id}
          grayScale={this.state.grayScale}
          mainColors={this.props.mainColors}
          roleColor={this.props.color}
          openDialog={() => { this.openDialog(tile._id); }}
          {...tile}
        />);
      }
      return null;
    });
  }

  render() {
    return (
      <div className="membersTiles__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="membersTiles__list">
          {this.renderTiles()}
        </div>
        {(!this.state.showAll && this.props.rowsLimit !== 0) &&
          <div className="membersTiles__more" onClick={() => { this.setState({ showAll: true }); }}>...</div>
        }
        <MembersDialog
          closeDialog={this.closeDialog}
          open={this.state.dialog}
          color={this.props.mainColors[this.props.color]}
          {...this.state.dialogData}
        />
      </div>
    );
  }
}
