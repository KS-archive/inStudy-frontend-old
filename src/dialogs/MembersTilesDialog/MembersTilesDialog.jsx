import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import without from 'lodash/without';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import validation from '../../js/validation';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import accessibleModules from '../../js/constants/accesibleModules';
import MemberDetailsDialog from './MemberDetailsDialog/MemberDetailsDialog';
import { inputStyle } from '../../js/constants/styles';
import { EditDialog } from '../../js/globalStyles';
import { Container, StyledTextField, Checkboxes, StyledCheckbox, Types, Type, LabelHeader, Elements, Element, ElementContent, Name, Role, ElementOptions } from './MembersTilesDialog_styles';

export default class MembersTilesDialog extends Component {
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
      content: { noEmptyArr: true },
      rowsLimit: { required: true, naturalNumber: true },
    };
  }

  componentWillMount() {
    const { closeDialog, data: { _id } } = this.props;
    this.props.setModalFunctions({
      submit: this.submit,
      cancel: closeDialog,
      remove: _id && this.remove,
      changeColors: this.openColorsDialog,
    });
    this.types = accessibleModules.find(el => el.kind === 'MembersTiles').types;
  }

  submit = () => {
    const validateValues = pick(this.state, keys(this.validate));
    validation(
      this.validate,
      validateValues,
      (errors) => { this.setState({ errors }); },
      () => {
        const values = pick(this.state, ['content', 'title', 'color', 'type', 'startGray', 'rowsLimit', 'randomize']);
        console.log(values);
        this.props.closeDialog();
      },
    );
  }

  remove = () => {
    console.log('removed!');
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
    const { index, firstname, surname, role, description, socials, coverImage } = values;
    const content = [...this.state.content];

    if (index || index === 0) { // Edit
      content[index] = { firstname, surname, role, description, socials, coverImage };
    } else { // Add
      content.push({ firstname, surname, role, description, socials, coverImage });
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
    const { coverImage, firstname, surname, role, _id } = el;
    const imgSrc = (typeof coverImage === 'string') ? coverImage : coverImage.preview;
    const fullName = `${firstname} ${surname}`;
    return (
      <Element key={_id || fullName}>
        <img src={imgSrc} alt="" />
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

  render() {
    const { closeDialog, open, sidebar, colors } = this.props;
    const { dialog, dialogData, randomize, startGray, rowsLimit, errors, title, content } = this.state;
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
        title={this.isEditModal ? 'Edytuj moduł „Kafelki osobowe”' : 'Dodaj moduł „Kafelki osobowe”'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <StyledTextField
            value={title}
            onChange={(e) => { this.setState({ title: e.target.value }); }}
            floatingLabelText="Tytuł (nagłówek modułu)"
            errorText={errors.title}
            {...inputStyle}
          />
          <StyledTextField
            value={rowsLimit}
            onChange={(e) => { this.setState({ rowsLimit: e.target.value }); }}
            floatingLabelText="Liczba wierszy (0 = wszystkie)"
            errorText={errors.rowsLimit}
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
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
