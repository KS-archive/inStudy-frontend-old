import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import without from 'lodash/without';
import indexOf from 'lodash/indexOf';
import AddIconText from './AddIconText/AddIconText';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import validation from '../../js/validation';
import { inputStyle } from '../../js/constants/styles';
import { EditDialog } from '../../js/globalStyles';
import { Container, StyledTextField, ElementsList, Card, Content, Title, Description, Icons, Icon, AddElement, IconImageWrapper, IconImage } from './IconTextDialog_styles';

export default class IconTextDialog extends Component {
  constructor(props) {
    super(props);
    const { _id, content, title, color } = this.props.data;
    this.state = {
      content: content || [],
      title: title || undefined,
      color: color || 2,
      dialog: false,
      dialogData: null,
      errors: {},
    };
    this.isEditModal = !!_id;
    this.validate = {
      title: { required: true },
      content: { noEmptyArr: true },
    };
  }

  componentWillMount() {
    this.props.setModalFunctions({
      submit: this.handleSubmit,
      cancel: this.props.closeDialog,
      remove: this.props.data._id ? this.remove : null,
      changeColors: this.openColorsDialog,
    });
  }

  handleSubmit = () => {
    const { content, title, color } = this.state;
    const values = { content, title };
    validation(
      this.validate,
      values,
      (errors) => { this.setState({ errors }); },
      () => {
        console.log({ content, title, color });
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
      <IconImageWrapper>
        <IconImage className={`fa fa-${el.icon}`} aria-hidden="true" />
      </IconImageWrapper>
      <Content>
        <Title>{el.title}</Title>
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
    const { closeDialog, open, sidebar, colors } = this.props;
    const { dialog, dialogData, title, content, errors } = this.state;
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
        onTouchTap={this.handleSubmit}
        primary
      />,
    ];

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={this.isEditModal ? 'Edytuj moduł „Kolumny tekstowe”' : 'Dodaj moduł „Kolumny tekstowe”'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <StyledTextField
            value={title}
            onChange={(e) => { this.setState({ title: e.target.value }); }}
            floatingLabelText="Tytuł (nagłówek modułu)"
            errorText={errors.title || errors.content}
            {...inputStyle}
          />
          <ElementsList>
            {content && content.map(this.renderElement)}
          </ElementsList>
          <AddElement onClick={() => { this.setState({ dialog: 'element' }); }}>
            + Dodaj nowy element
          </AddElement>
        </Container>
        {dialog === 'element' &&
          <AddIconText
            submit={(el) => { this.changeList(el, dialogData); }}
            {...dialogAttrs}
          />
        }
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(color) => { this.setState({ color: color[0] }); }}
            names={['Kolor ikony']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
