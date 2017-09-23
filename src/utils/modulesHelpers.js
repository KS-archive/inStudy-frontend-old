import accessibleModules from './constants/accesibleModules';
import validate from './validation';
import { renderActionButtons } from './renderHelpers';

export const initializeDialog = (comp, kind, valuesConfig, withTypes = false) => {
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

  // Set types of module if they exist.
  if (withTypes) {
    comp.types = accessibleModules.find(el => el.kind === kind).types;
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

export const sth = () => {
  console.log('obj');
};
