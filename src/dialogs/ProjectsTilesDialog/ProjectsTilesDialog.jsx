import React, { Component } from 'react';
import without from 'lodash/without';
import validate from '../../js/validation';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import accessibleModules from '../../js/constants/accesibleModules';
import ProjectDetailsDialog from './ProjectDetailsDialog/ProjectDetailsDialog';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Container, Checkboxes, StyledCheckbox, LabelHeader, Elements, Element, ElementContent, Name, ElementOptions } from './ProjectsTilesDialog_styles';

export default class ProjectsTilesDialog extends Component {
  constructor(props) {
    super(props);
    const { _id, content, title, colors, startGray, rowsLimit, randomize } = this.props.data;
    this.state = {
      content: content || [],
      title: title || undefined,
      colors: colors || [2, 2, 4, 2, 2],
      startGray: startGray || false,
      rowsLimit: rowsLimit || 1,
      randomize: randomize || false,
      dialog: false,
      dialogData: null,
      errors: {},
    };
    this.isEditModal = !!_id;
    this.toValidate = {
      title: { required: true },
      content: { noEmptyArr: true },
      rowsLimit: { required: true, naturalNumber: true },
    };
    this.values = ['content', 'title', 'colors', 'startGray', 'rowsLimit', 'randomize'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  componentWillMount() {
    const { closeDialog, data: { _id }, setModalFunctions } = this.props;
    const { handleSubmit, remove, openColorsDialog } = this;
    setModalFunctions(_id, handleSubmit, closeDialog, remove, openColorsDialog);
    this.types = accessibleModules.find(el => el.kind === 'MembersTiles').types;
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    const { data: { _id }, kind, closeDialog } = this.props;
    const extendValues = { ...values, _id, kind };
    console.log(extendValues);
    closeDialog();
  }

  remove = () => {
    console.log('removed!');
  }

  closeDialog = () => {
    this.setState({ dialog: false, dialogData: null });
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
    this.setState({ dialog: 'colors', dialogData: [this.state.colors] });
  }

  renderElement = (el, index) => {
    const { coverImage, _id, name } = el;
    const imgSrc = (typeof coverImage === 'string') ? coverImage : coverImage.preview;
    return (
      <Element key={_id || name}>
        <img src={imgSrc} alt="" />
        <ElementContent>
          <Name>
            {`${name.length > 60
              ? `${name.substring(0, 60)}...`
              : name}`}
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
    const { closeDialog, open, sidebar } = this.props;
    const { dialog, dialogData, content } = this.state;
    const dialogAttrs = {
      sidebar,
      open: true,
      closeDialog: this.closeDialog,
      data: dialogData,
    };
    const colorNames = ['Aktywny filtr', 'Filtr „Aktualne”', 'Filtr „Archiwalne”', 'Filtr „Otwarte”', 'Filtr „Cykliczne”'];
    const dialogTitle = this.isEditModal ? 'Edytuj moduł „Kafelki projektowe' : 'Dodaj moduł „Kafelki projektowe';
    console.log(this.props);
    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title={dialogTitle}
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
            mainColors={this.props.colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'projectDetails' &&
          <ProjectDetailsDialog
            submit={this.modifyElements}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
