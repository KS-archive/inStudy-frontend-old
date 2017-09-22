import React, { Component } from 'react';
import without from 'lodash/without';
import validate from '../../js/validation';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import ReorderDialog from '../../dialogs/ReorderDialog/ReorderDialog';
import accessibleModules from '../../js/constants/accesibleModules';
import ImageDetailsDialog from './ImageDetailsDialog/ImageDetailsDialog';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { EditDialog, LabelHeader, Image, ImageOverlay, ImageOptions } from '../../js/globalStyles';
import { Container, Checkboxes, StyledCheckbox, Types, Type, Elements } from './LinkImagesDialog_styles';

export default class LinkImagesDialog extends Component {
  constructor(props) {
    super(props);
    const { id, content, title, color, type, startGray, rowsLimit, randomize } = this.props.data;
    this.state = {
      content: content || [],
      title: title || undefined,
      color: color || 2,
      type: type || 0,
      startGray: startGray || false,
      rowsLimit: rowsLimit || 1,
      randomize: randomize || false,
      dialog: false,
      dialogData: null,
      errors: {},
    };
    this.isEditModal = !!id;
    this.moduleName = accessibleModules.find(m => m.kind === 'LinkImages').name;
    this.toValidate = {
      title: { required: true },
      content: { noEmptyArr: 'Musisz dodać co najmniej jeden element do galerii' },
      rowsLimit: { required: true, naturalNumber: true },
    };
    this.values = ['content', 'title', 'color', 'type', 'startGray', 'rowsLimit', 'randomize'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  componentWillMount() {
    const { closeDialog, data, setModalFunctions } = this.props;
    const { handleSubmit, remove, openColorsDialog, openReorderDialog } = this;
    const id = data.id || Date.now();
    setModalFunctions(id, handleSubmit, closeDialog, remove, openColorsDialog, openReorderDialog);
    this.types = accessibleModules.find(el => el.kind === 'LinkImages').types;
    this.setState({ id });
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
      dialog: 'elementDetails',
      dialogData: {},
    });
  }

  editDetails = (el, index) => {
    this.setState({
      dialog: 'elementDetails',
      dialogData: { ...el, index },
    });
  }

  modifyElements = (values) => {
    this.closeDialog();
    const { index, link, name, src } = values;
    const content = [...this.state.content];

    if (index || index === 0) { // Edit
      content[index] = { name, src, link };
    } else { // Add
      content.push({ name, src, link });
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

  reorderImages = (values) => {
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

  renderElement = (el, index) => (
    <Image key={index}>
      <img src={el.src} alt="" />
      <ImageOverlay>
        <ImageOptions>
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
        </ImageOptions>
      </ImageOverlay>
    </Image>
  );

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
            <Image onClick={this.addDetails}>
              <i className="fa fa-plus" aria-hidden="true" />
            </Image>
          </Elements>
        </Container>
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(newColors) => { this.setState({ color: newColors[0] }); }}
            names={['Kolor obramowania (typ 2)']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'reorder' &&
          <ReorderDialog
            {...dialogAttrs}
            submitFunction={this.reorderImages}
            title="Zmień kolejność elementów galerii"
            displayBy="link"
          />
        }
        {dialog === 'elementDetails' &&
          <ImageDetailsDialog
            submit={this.modifyElements}
            id={id}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
