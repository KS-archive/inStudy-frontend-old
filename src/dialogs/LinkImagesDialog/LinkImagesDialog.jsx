import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import without from 'lodash/without';
import pick from 'lodash/pick';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import accessibleModules from '../../js/constants/accesibleModules';
import ImageDetailsDialog from './ImageDetailsDialog/ImageDetailsDialog';
import { hasAnyValue } from '../../js/utils';
import { inputStyle } from '../../js/constants/styles';
import { EditDialog } from '../../js/globalStyles';
import { Container, StyledTextField, Checkboxes, StyledCheckbox, Types, Type, LabelHeader, Elements, Element, ElementOptionsOverlay, ElementOptions } from './LinkImagesDialog_styles';

export default class LinkImagesDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.data.content || [],
      title: this.props.data.title || undefined,
      color: this.props.data.color,
      type: this.props.data.type || 0,
      startGray: this.props.data.startGray || false,
      rowsLimit: this.props.data.rowsLimit || 1,
      randomize: this.props.data.randomize || false,
      dialog: false,
      dialogData: null,
      errors: {
        title: null,
        rowsLimit: null,
      },
    };
    this.isEditModal = !!this.props.data._id;
  }

  componentWillMount() {
    this.props.setModalFunctions({
      submit: this.submit,
      cancel: this.props.closeDialog,
      remove: this.props.data._id ? this.remove : null,
      changeColors: this.openColorsDialog,
    });
    this.types = accessibleModules.find(el => el.kind === 'LinkImages').types;
  }

  validate = (callback) => {
    const errors = { ...this.state.errors };
    const { title, content, rowsLimit } = this.state;
    const naturalReg = /^(0|([1-9]\d*))$/;

    errors.title = null;
    errors.rowsLimit = null;

    if (!title || !title.trim()) errors.title = 'To pole jest wymagane';
    else if (!content || content.length === 0) errors.title = 'Musisz dodać co najmniej jeden element do galerii';
    if (!rowsLimit || !rowsLimit.toString().trim()) errors.rowsLimit = 'To pole jest wymagane';
    else if (!naturalReg.test(rowsLimit)) errors.rowsLimit = 'Wartość w tym polu musi być liczbą naturalną';

    if (hasAnyValue(errors)) this.setState({ errors });
    else callback();
  }

  submit = () => {
    this.validate(() => {
      const data = pick(this.state, ['content', 'title', 'color', 'type', 'startGray', 'rowsLimit', 'randomize']);
      console.log(data);
      this.props.closeDialog();
    });
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

    if (index) { // Edit
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

  render() {
    const { closeDialog, open, sidebar } = this.props;
    const { dialog, dialogData, randomize, startGray } = this.state;
    const dialogAttrs = {
      sidebar,
      open: true,
      closeDialog: this.closeDialog,
      data: dialogData,
    };
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
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={this.isEditModal ? 'Edytuj galerię' : 'Dodaj moduł galerii'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <StyledTextField
            value={this.state.title}
            onChange={(e) => { this.setState({ title: e.target.value }); }}
            floatingLabelText="Tytuł (nagłówek modułu)"
            errorText={this.state.errors.title}
            {...inputStyle}
          />
          <StyledTextField
            value={this.state.rowsLimit}
            onChange={(e) => { this.setState({ rowsLimit: e.target.value }); }}
            floatingLabelText="Liczba wierszy (0 = wszystkie)"
            errorText={this.state.errors.rowsLimit}
            {...inputStyle}
          />
          <Checkboxes>
            <StyledCheckbox
              label="Losowa kolejność"
              checked={randomize}
              onCheck={() => { this.setState({ randomize: !randomize }); }}
            />
            <StyledCheckbox
              label="Szare przed najechaniem"
              checked={startGray}
              onCheck={() => { this.setState({ startGray: !startGray }); }}
            />
          </Checkboxes>
          <LabelHeader>Typ</LabelHeader>
          <Types>
            {this.types.map((type, i) => this.renderType(type, i))}
          </Types>
          <LabelHeader>Elementy</LabelHeader>
          <Elements>
            {this.state.content.map((el, i) => this.renderElement(el, i))}
            <Element onClick={this.addDetails}>
              <i className="fa fa-plus" aria-hidden="true" />
            </Element>
          </Elements>
        </Container>
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(colors) => { this.setState({ color: colors[0] }); }}
            names={['Kolor obramowania (typ 2)']}
            mainColors={this.props.colors}
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
