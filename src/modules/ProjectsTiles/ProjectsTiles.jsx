import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import ProjectsTile from '../ProjectsTile/ProjectsTile';
import ProjectDialog from '../../dialogs/ProjectDialog/ProjectDialog';
import { SectionHeader } from '../../js/globalStyles';
import { Labels, Label, List, More } from './ProjectsTiles_styles';

export default class ProjectsTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {
        wszystkie: [],
      },
      dialog: false,
      dialogData: {},
      showAll: false,
    };
  }

  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  getLabels = (elements) => {
    const labels = {
      wszystkie: [],
      aktualne: [],
      archiwalne: [],
      cykliczne: [],
      otwarte: [],
    };

    elements.map((tile) => {
      const id = tile.id;
      labels.wszystkie.push(id);

      tile.labels.map((label) => {
        if (!labels[label]) {
          labels[label] = [id];
        } else {
          labels[label].push(id);
        }
      });
    });

    return labels;
  }

  setActiveLabel = (activeLabel) => {
    if (this.state.activeLabel !== activeLabel) {
      this.setState({ activeLabel });
    }
  }

  initialize = (props) => {
    const { randomize, content, startGray, rowsLimit } = props;
    const labels = this.getLabels(content);
    this.setState({
      activeLabel: 'wszystkie',
      noLimit: content.length <= 3 * rowsLimit,
      elements: randomize ? shuffle(content) : content,
      grayScale: startGray,
      labels,
    });
  }

  openDialog = (id) => {
    const dialogData = this.state.elements.filter(tile => (tile.id === id));
    this.setState({ dialog: true, dialogData: dialogData[0] });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  renderTiles = () => {
    const { rowsLimit, mainColors, colors } = this.props;
    const { labels, activeLabel, showAll, elements } = this.state;

    return labels[activeLabel].map((id, index) => {
      const tile = elements.filter(el => (el.id === id))[0];
      const key = tile.id;
      const openDialog = () => { this.openDialog(key); };
      const attrs = { key, mainColors, openDialog, labelColors: colors, ...tile };

      return (index < rowsLimit * 3 || showAll || !rowsLimit) && <ProjectsTile {...attrs} />;
    });
  }

  renderLabel = (label, color) => {
    const isActive = label === this.state.activeLabel;
    const setActive = () => { this.setActiveLabel(label); };
    if (this.state.labels[label].length) {
      return <Label key={label} active={isActive} color={color} onClick={setActive}>{label}</Label>;
    }
  }

  render() {
    const { mainColors, colors, title, rowsLimit } = this.props;
    const { labels, showAll, dialog, dialogData, noLimit } = this.state;
    const showAllTiles = () => { this.setState({ showAll: true }); };
    const anyLabels = Object.values(omit(labels, ['wszystkie'])).reduce((acc, curr) => +acc + curr.length);

    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <div>
          {(!!anyLabels) &&
            <Labels>
              {Object.keys(labels).map(label => this.renderLabel(label, mainColors[colors[0]]))}
            </Labels>
          }
          <List>{this.renderTiles()}</List>
          {(!showAll && rowsLimit !== 0 && !noLimit) && <More onClick={showAllTiles}>...</More>}
          {(dialog) && <ProjectDialog open closeDialog={this.closeDialog} {...dialogData} />}
        </div>
      </div>
    );
  }
}
