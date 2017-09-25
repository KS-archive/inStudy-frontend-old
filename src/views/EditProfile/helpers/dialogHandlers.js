export default (comp) => {
  comp.openDialog = (name, data) => {
    comp.setState({ dialog: name, dialogData: data });
  };

  comp.closeDialog = () => {
    comp.setState({
      dialog: null,
      editingModule: null,
      mode: 'Moduły',
      modalFunctions: {
        submit: null,
        cancel: null,
        remove: null,
        changeColors: null,
        changeOrder: null,
      },
    });
  };
};
