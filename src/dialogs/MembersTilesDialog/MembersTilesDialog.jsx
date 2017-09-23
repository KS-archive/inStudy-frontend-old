import React, { Component } from 'react';
import without from 'lodash/without';
import valuesConfig from './valuesConfig';
import validate from '../../utils/validation';
import { initializeDialog } from '../../utils/modulesHelpers';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import ReorderDialog from '../../dialogs/ReorderDialog/ReorderDialog';
import MemberDetailsDialog from './MemberDetailsDialog/MemberDetailsDialog';
import { renderTextField } from '../../utils/renderHelpers';
import { EditDialog } from '../../utils/globalStyles';
import { Container, Checkboxes, StyledCheckbox, Types, Type, LabelHeader, Elements, Element, ElementContent, Name, Role, ElementOptions } from './MembersTilesDialog_styles';

export default class MembersTilesDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'MembersTiles', valuesConfig, true);
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    const { kind, submit } = this.props;
    const id = this.state.id;
    const extendValues = { ...values, id, kind };
    submit(extendValues);
  }

  remove = () => {
    this.props.remove(this.props.data.id);
    this.props.closeDialog();
  }

  closeDialog = () => {
    this.setState({ dialog: false, dialogData: null });
  }

  addDetails = () => {
    this.setState({
      dialog: 'memberDetails',
      dialogData: {},
    });
  }

  editDetails = (el, index) => {
    this.setState({
      dialog: 'memberDetails',
      dialogData: { ...el, index },
    });
  }

  modifyElements = (values) => {
    this.closeDialog();
    const { id, index, firstname, surname, role, description, socials, coverImage } = values;
    const content = [...this.state.content];

    if (index || index === 0) { // Edit
      content[index] = { id, firstname, surname, role, description, socials, coverImage };
    } else { // Add
      content.push({ id, firstname, surname, role, description, socials, coverImage });
    }

    this.setState({ content });
  }

  deleteElement = (el) => {
    const content = without(this.state.content, el);
    this.setState({ content });
  }

  openColorsDialog = () => {
    this.setState({ dialog: 'colors', dialogData: [this.state.color] });
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
    const { coverImage, firstname, surname, role, id } = el;
    const fullName = `${firstname} ${surname}`;
    return (
      <Element key={id}>
        <img src={coverImage} alt="" />
        <ElementContent>
          <Name>{fullName}</Name>
          {(role) &&
            <Role>{role}</Role>
          }
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
            submit={(newColors) => { this.setState({ color: newColors[0] }); }}
            names={['Kolor tekstu (typ 2 i 3)']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'memberDetails' &&
          <MemberDetailsDialog
            submit={this.modifyElements}
            id={id}
            {...dialogAttrs}
          />
        }
        {dialog === 'reorder' &&
          <ReorderDialog
            {...dialogAttrs}
            submitFunction={this.reorderTiles}
            title="Zmień kolejność kafelków osobowych"
            displayBy="firstname,surname"
          />
        }
      </EditDialog>
    );
  }
}
