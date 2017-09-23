import without from 'lodash/without';
import indexOf from 'lodash/indexOf';
import isEmpty from 'lodash/isEmpty';
import accessibleModules from './constants/accesibleModules';
import validate from './validation';
import { renderActionButtons } from './renderHelpers';

export const initializeDialog = (comp, kind, valuesConfig, extend = []) => {
  // Set form values and validation.
  let state = {};
  comp.values = [];
  comp.toValidate = {};
  Object.keys(valuesConfig).map((name) => {
    const el = valuesConfig[name];
    comp.values.push(name);
    state[name] = comp.props.data[name] || el.default;
    if (el.validate) {
      comp.toValidate[name] = el.validate;
    }
  });

  // Validation with submit callback.
  comp.handleSubmit = () => { validate(comp, comp.submit); };

  // Set name of dialog.
  comp.moduleName = accessibleModules.find(m => m.kind === kind).name;

  // Set action buttons for save and cancel changes.
  comp.actions = renderActionButtons(comp.props.closeDialog, comp.handleSubmit);

  // Determine is modal for edit contern or for add content.
  comp.isEditModal = !!comp.props.data.id;

  // Set types, reorder and colors change of module if they exist.
  if (extend.includes('types')) {
    comp.types = accessibleModules.find(el => el.kind === kind).types;
  }
  if (extend.includes('reorder')) {
    comp.openReorderDialog = () => {
      comp.setState({ dialog: 'reorder', dialogData: comp.state.content });
    };

    comp.reorderElements = (values) => {
      comp.setState({ content: values }, () => { comp.closeDialog(); });
    };
  }
  if (extend.includes('colors')) {
    comp.openColorsDialog = () => {
      comp.setState({ dialog: 'colors', dialogData: [comp.state.color] });
    };
  }

  // Submit function.
  comp.submit = (values) => {
    const { kind, submit } = comp.props;
    const idObj = comp.isEditModal ? { id: comp.props.data.id } : {};
    const extendValues = { ...values, ...idObj, kind };
    submit(extendValues);
  };

  // Remove function.
  comp.remove = () => {
    comp.props.remove(comp.props.data.id);
    comp.props.closeDialog();
  };

  // Set modal functions accessible by EditSidebar.
  const { closeDialog, data, setModalFunctions } = comp.props;
  const id = data.id || Date.now();
  const { handleSubmit, remove, openColorsDialog, openReorderDialog } = comp;
  setModalFunctions(id, handleSubmit, closeDialog, remove, openColorsDialog, openReorderDialog);

  // Initialize state of module.
  comp.setState({
    id,
    dialog: false,
    dialogData: null,
    errors: {},
    ...state,
  });
};

export const extendByBasicList = (comp) => {
  comp.closeDialog = () => {
    comp.setState({ dialog: false, dialogData: null });
  };

  comp.deleteElement = (el) => {
    const content = without(comp.state.content, el);
    comp.setState({ content });
  };

  comp.changeList = (el, dialogData) => {
    let content;
    const actualContent = comp.state.content;
    if (isEmpty(dialogData)) {
      content = [...actualContent, el];
    } else {
      const index = (dialogData.index === 0) ? 0 : dialogData.index || indexOf(actualContent, dialogData);
      content = actualContent.map((item, i) => {
        if (i === index) item = el;
        return item;
      });
    }
    comp.setState({ content }, () => { comp.closeDialog(); });
  };
};
