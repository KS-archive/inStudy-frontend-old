import React, { Component } from 'react';
import without from 'lodash/without';
import validate from '../../js/validation';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import accessibleModules from '../../js/constants/accesibleModules';
import MemberDetailsDialog from './MemberDetailsDialog/MemberDetailsDialog';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Container, Checkboxes, StyledCheckbox, Types, Type, LabelHeader, Elements, Element, ElementContent, Name, Role, ElementOptions } from './MembersTilesDialog_styles';

export default class MembersTilesDialog extends Component {
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
    this.toValidate = {
      title: { required: true },
      content: { noEmptyArr: true },
      rowsLimit: { required: true, naturalNumber: true },
    };
    this.values = ['content', 'title', 'color', 'type', 'startGray', 'rowsLimit', 'randomize'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  componentWillMount() {
    const { closeDialog, data, setModalFunctions } = this.props;
    const id = data.id || Date.now();
    const { handleSubmit, remove, openColorsDialog } = this;
    setModalFunctions(id, handleSubmit, closeDialog, remove, openColorsDialog);
    this.types = accessibleModules.find(el => el.kind === 'MembersTiles').types;
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
    console.log(values);
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
    console.log(index);
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
    console.log(this.props);
    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title={this.isEditModal ? 'Edytuj moduł „Kafelki osobowe”' : 'Dodaj moduł „Kafelki osobowe”'}
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
      </EditDialog>
    );
  }
}
