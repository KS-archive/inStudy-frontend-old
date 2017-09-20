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
    const { id, content, title, colors, startGray, rowsLimit, randomize } = this.props.data;
    this.state = {
      content: content || [],
      title: title || undefined,
      colors: colors || [2, 2, 4, 2, 2],
      startGray: startGray || false,
      rowsLimit: rowsLimit || 1,
      randomize: randomize || false,
      dialog: false,
      dialogData: null,
      editingIndex: null,
      errors: {},
    };
    this.isEditModal = !!id;
    this.moduleName = accessibleModules.find(m => m.kind === 'ProjectsTiles').name;
    this.toValidate = {
      title: { required: true },
      content: { noEmptyArr: true },
      rowsLimit: { required: true, naturalNumber: true },
    };
    this.values = ['content', 'title', 'colors', 'startGray', 'rowsLimit', 'randomize'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  componentWillMount() {
    const { closeDialog, data, setModalFunctions } = this.props;
    const id = data.id || Date.now();
    const { handleSubmit, remove, openColorsDialog } = this;
    setModalFunctions(id, handleSubmit, closeDialog, remove, openColorsDialog);
    this.types = accessibleModules.find(el => el.kind === 'ProjectsTiles').types;
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
