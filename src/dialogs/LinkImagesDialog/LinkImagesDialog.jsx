import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import without from 'lodash/without';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import validation from '../../js/validation';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import accessibleModules from '../../js/constants/accesibleModules';
import ImageDetailsDialog from './ImageDetailsDialog/ImageDetailsDialog';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { inputStyle } from '../../js/constants/styles';
import { EditDialog } from '../../js/globalStyles';
import { Container, Checkboxes, StyledCheckbox, Types, Type, LabelHeader, Elements, Element, ElementOptionsOverlay, ElementOptions } from './LinkImagesDialog_styles';

export default class LinkImagesDialog extends Component {
  constructor(props) {
    super(props);
    const { _id, content, title, color, type, startGray, rowsLimit, randomize } = this.props.data;
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
    this.isEditModal = !!_id;
    this.validate = {
      title: { required: true },
      content: { noEmptyArr: 'Musisz dodać co najmniej jeden element do galerii' },
      rowsLimit: { required: true, naturalNumber: true },
    };
    this.actions = renderActionButtons(this.props.closeDialog, this.submit);
  }

  componentWillMount() {
    const { closeDialog, data: { _id }, setModalFunctions } = this.props;
    const { submit, remove, openColorsDialog } = this;
    setModalFunctions(_id, submit, closeDialog, remove, openColorsDialog);
    this.types = accessibleModules.find(el => el.kind === 'LinkImages').types;
  }

  submit = () => {
    const validateValues = pick(this.state, keys(this.validate));
    validation(this.validate, validateValues, this.validateFailed, this.validateSuccess);
  }

  validateSuccess = () => {
    const values = pick(this.state, ['content', 'title', 'color', 'type', 'startGray', 'rowsLimit', 'randomize']);
    console.log(values);
    this.props.closeDialog();
  }

  validateFailed = (errors) => {
    this.setState({ errors });
  }

  remove = () => {
    console.log('removed!');
  }

  closeDialog = () => {
    this.setState({ dialog: false, dialogData: null });
  }

  addDetails = () => {
    this.setState({
      dialog: 'elementDetails',
      dialogData: null,
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
    const imgSrc = (typeof el.src === 'string') ? el.src : el.src.preview;
    return (
      <Element key={index}>
        <img src={imgSrc} alt={el.name || 'Element galerii'} />
        <ElementOptionsOverlay>
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
        </ElementOptionsOverlay>
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
    const { dialog, dialogData, content } = this.state;
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
        title={this.isEditModal ? 'Edytuj moduł „Galeria”' : 'Dodaj moduł „Galeria”'}
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
            names={['Kolor obramowania (typ 2)']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'elementDetails' &&
          <ImageDetailsDialog
            submit={this.modifyElements}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
