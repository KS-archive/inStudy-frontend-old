import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import without from 'lodash/without';
import indexOf from 'lodash/indexOf';
import NewNumber from './NewNumber/NewNumber';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import { hasAnyValue } from '../../js/utils';
import { inputStyle } from '../../js/constants/styles';
import { EditDialog } from '../../js/globalStyles';
import { Container, StyledTextField, ElementsList, Card, Content, Title, Description, Icons, Icon, AddElement } from './NumbersDialog_styles';

export default class SocialsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.data.content || [],
      title: this.props.data.title || undefined,
      color: this.props.data.color,
      dialog: false,
      dialogData: null,
      errors: {
        title: null,
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
  }

  validate = (callback) => {
    const errors = { ...this.state.errors };
    const { title, content } = this.state;
    errors.title = null;
    if (!title || !title.trim()) errors.title = 'To pole jest wymagane';
    else if (!content || content.length === 0) errors.title = 'Musisz dodać co najmniej jeden element do listy';
    if (hasAnyValue(errors)) this.setState({ errors });
    else callback();
  }

  submit = () => {
    this.validate(() => {
      console.log(this.state.content);
      this.props.closeDialog();
    });
  }

  remove = () => {
    console.log('removed!');
  }

  closeDialog = () => {
    this.setState({ dialog: false, dialogData: null });
  }

  deleteElement = (el) => {
    const content = without(this.state.content, el);
    this.setState({ content });
  }

  changeList = (el, dialogData) => {
    let content;
    const actualContent = this.state.content;
    if (dialogData) {
      const index = indexOf(actualContent, dialogData);
      content = actualContent.map((item, i) => {
        if (i === index) item = el;
        return item;
      });
    } else {
      content = [...actualContent, el];
    }
    this.setState({ content });
  }

  openColorsDialog = () => {
    this.setState({ dialog: 'colors', dialogData: [this.state.color] });
  }

  renderElement = (el, index) => (
    <Card key={index}>
      <Content>
        <Title>{el.number}</Title>
        <Description>
          {`${el.description.length > 100
            ? `${el.description.substring(0, 100)} ...`
            : el.description}`}
        </Description>
      </Content>
      <Icons>
        <Icon
          className="fa fa-pencil-square-o"
          aria-hidden="true"
          onClick={() => { this.setState({ dialog: 'element', dialogData: el }); }}
        />
        <Icon
          className="fa fa-trash-o"
          aria-hidden="true"
          onClick={() => { this.deleteElement(el); }}
        />
      </Icons>
    </Card>
  );

  render() {
    const { closeDialog, open, sidebar } = this.props;
    const { dialog, dialogData } = this.state;
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
        title={this.isEditModal ? 'Edytuj moduł liczbowy' : 'Dodaj moduł liczbowy'}
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
          <ElementsList>
            {this.state.content && this.state.content.map(this.renderElement)}
          </ElementsList>
          <AddElement onClick={() => { this.setState({ dialog: 'element' }); }}>
            + Dodaj nowy element
          </AddElement>
        </Container>
        {dialog === 'element' &&
          <NewNumber
            submit={(el) => { this.changeList(el, dialogData); }}
            {...dialogAttrs}
          />
        }
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(colors) => { this.setState({ color: colors[0] }); }}
            names={['Kolor liczby']}
            mainColors={this.props.colors}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
