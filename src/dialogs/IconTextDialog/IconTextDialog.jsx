import React, { Component } from 'react';
import without from 'lodash/without';
import indexOf from 'lodash/indexOf';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import validation from '../../js/validation';
import AddIconText from './AddIconText/AddIconText';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Container, ElementsList, Card, Content, Title, Description, Icons, Icon, AddElement, IconImageWrapper, IconImage } from './IconTextDialog_styles';

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
    this.actions = renderActionButtons(this.props.closeDialog, this.submit);
  }

  componentWillMount() {
    const { closeDialog, data: { _id }, setModalFunctions } = this.props;
    const { submit, remove, openColorsDialog } = this;
    setModalFunctions(_id, submit, closeDialog, remove, openColorsDialog);
  }

  submit = () => {
    const validateValues = pick(this.state, keys(this.validate));
    validation(this.validate, validateValues, this.validateFailed, this.validateSuccess);
  }

  validateSuccess = () => {
    const values = pick(this.state, ['content', 'title', 'color']);
    console.log(values);
    this.props.closeDialog();
  }

  validateFailed = (errors) => {
    this.setState({ errors });
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
    const { dialog, dialogData, content } = this.state;
    const dialogAttrs = {
      sidebar,
      open: true,
      closeDialog: this.closeDialog,
      data: dialogData,
    };

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title={this.isEditModal ? 'Edytuj moduł „Kolumny tekstowe”' : 'Dodaj moduł „Kolumny tekstowe”'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {renderTextField(this, 'Tytuł (nagłówek modułu)', 'title')}
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
            submit={(newColors) => { this.setState({ color: newColors[0] }); }}
            names={['Kolor ikony']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
      </EditDialog>
    );
  }
}
