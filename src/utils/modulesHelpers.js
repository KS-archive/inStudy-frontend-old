import accessibleModules from './constants/accesibleModules';
import { renderActionButtons } from './renderHelpers';

export const initializeDialog = (comp, kind, valuesConfig, withTypes = false) => {
  // Set name of dialog.
  comp.moduleName = accessibleModules.find(m => m.kind === kind).name;

  // Set action buttons for save and cancel changes.
  comp.actions = renderActionButtons(comp.props.closeDialog, comp.handleSubmit);

  // Determine is modal for edit contern or for add content.
  comp.isEditModal = !!comp.props.id;

  // Set types of module if they exist.
  if (withTypes) {
    comp.types = accessibleModules.find(el => el.kind === kind).types;
  }

  // Set modal functions accessible by EditSidebar.
  const { closeDialog, data, setModalFunctions } = comp.props;
  const id = data.id || Date.now();
  const { handleSubmit, remove, openColorsDialog, openReorderDialog } = comp;
  setModalFunctions(id, handleSubmit, closeDialog, remove, openColorsDialog, openReorderDialog);

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

  // Initialize state of module.
  comp.setState({
    id,
    dialog: false,
    dialogData: null,
    errors: {},
    ...state,
  });
};

export const sth = () => {
  console.log('obj');
};
