import React, { Component } from 'react';
import without from 'lodash/without';
import valuesConfig from './valuesConfig';
import { initializeDialog } from '../../utils/modulesHelpers';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import ReorderDialog from '../../dialogs/ReorderDialog/ReorderDialog';
import ProjectDetailsDialog from './ProjectDetailsDialog/ProjectDetailsDialog';
import { renderTextField } from '../../utils/renderHelpers';
import { EditDialog } from '../../utils/globalStyles';
import { Container, Checkboxes, StyledCheckbox, LabelHeader, Types, Type, Elements, Element, ElementContent, Name, ElementOptions } from './ProjectsTilesDialog_styles';

export default class ProjectsTilesDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingIndex: null,
    };
  }

  componentWillMount() {
    initializeDialog(this, 'ProjectsTiles', valuesConfig, true);
  }

  closeDialog = () => {
    this.setState({
      dialog: false,
      dialogData: null,
      editingIndex: null,
    });
  }

  addDetails = () => {
    this.setState({
      dialog: 'projectDetails',
      dialogData: {},
    });
  }

  editDetails = (el, index) => {
    this.setState({
      dialog: 'projectDetails',
      dialogData: el,
      editingIndex: index,
    });
  }

  modifyElements = (values) => {
    this.closeDialog();
    const { editingIndex } = this.state;
    const content = [...this.state.content];

    if (editingIndex || editingIndex === 0) { // Edit
      content[editingIndex] = values;
    } else { // Add
      content.push(values);
    }

    this.setState({ content });
  }

  deleteElement = (el) => {
    const content = without(this.state.content, el);
    this.setState({ content });
  }

  openColorsDialog = () => {
    this.setState({ dialog: 'colors', dialogData: [this.state.colors] });
  }

  openReorderDialog = () => {
    this.setState({ dialog: 'reorder', dialogData: this.state.content });
  }

  reorderTiles = (values) => {
    this.setState({ content: values }, () => { this.closeDialog(); });
  }

  renderType = (type, index) => (
    <Type
      key={type.name}
      selected={(index === this.state.type)}
      onClick={() => { this.setState({ type: index }); }}
    >
      <img src={`/img/types_icons/${type.icon}`} alt={type.name} />
    </Type>
  );

  renderElement = (el, index) => {
    const { coverImage, id, title } = el;
    return (
      <Element key={id}>
        <img src={coverImage} alt="" />
        <ElementContent>
          <Name>
            {`${title.length > 60
              ? `${title.substring(0, 60)}...`
              : title}`}
          </Name>
        </ElementContent>
        <ElementOptions>
          <i
            className="fa fa-pencil-square-o"
            aria-hidden="true"
            onClick={() => { this.editDetails(el, index); }}
          />
          <i
            className="fa fa-trash-o"
            aria-hidden="true"
            onClick={() => { this.deleteElement(el); }}
          />
        </ElementOptions>
      </Element>
    );
  }

  renderCheckbox = (label, stateName) => {
    const checked = this.state[stateName];
    const onCheck = () => { this.setState({ [stateName]: !checked }); };
    const attrs = { label, checked, onCheck };
    return <StyledCheckbox {...attrs} />;
  }

  render() {
    const { closeDialog, open, sidebar, colors } = this.props;
    const { dialog, dialogData, content, id } = this.state;
    const dialogAttrs = {
      sidebar,
      open: true,
      closeDialog: this.closeDialog,
      data: dialogData,
    };
    const colorNames = ['Aktywny filtr', 'Filtr „Aktualne”', 'Filtr „Archiwalne”', 'Filtr „Otwarte”', 'Filtr „Cykliczne”'];

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title={`${this.isEditModal ? 'Edytuj' : 'Dodaj'} moduł „${this.moduleName}”`}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {renderTextField(this, 'Tytuł (nagłówek modułu)', 'title')}
          {renderTextField(this, 'Liczba wierszy (0 = wszystkie)', 'rowsLimit')}
          <Checkboxes>
            {this.renderCheckbox('Losowa kolejność', 'randomize')}
            {this.renderCheckbox('Szare przed najechaniem', 'startGray')}
          </Checkboxes>
          <LabelHeader>Typ</LabelHeader>
          <Types>
            {this.types.map((type, i) => this.renderType(type, i))}
          </Types>
          <LabelHeader>Elementy</LabelHeader>
          <Elements>
            {content.map((el, i) => this.renderElement(el, i))}
            <Element onClick={this.addDetails}>
              <i className="fa fa-plus" aria-hidden="true" />
            </Element>
          </Elements>
        </Container>
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(newColors) => { this.setState({ colors: newColors }); }}
            names={colorNames}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'reorder' &&
          <ReorderDialog
            {...dialogAttrs}
            submitFunction={this.reorderTiles}
            title="Zmień kolejność kafelków projektowych"
            displayBy="title"
          />
        }
        {dialog === 'projectDetails' &&
          <ProjectDetailsDialog
            submit={this.modifyElements}
            id={id}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
