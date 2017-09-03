import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import without from 'lodash/without';
import indexOf from 'lodash/indexOf';
import AddCollapsiblee from './AddCollapsible/AddCollapsible';
import { inputStyle } from '../../js/constants/styles';
import { EditDialog } from '../../js/globalStyles';
import { Container, StyledTextField, ElementsList, Card, Content, Title, Description, Icons, Icon, AddElement } from './CollapsibleDialog_styles';

export default class SocialsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.data.content || [],
      dialog: false,
      dialogData: null,
    };
    this.isEditModal = !!this.props.data._id;
  }

  submit = () => {
    console.log('submit');
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

  renderElement = (el, index) => (
    <Card key={index}>
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
          onClick={() => { this.setState({ dialog: true, dialogData: el }); }}
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
    const { dialogData } = this.state;
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
    console.log(this.props);
    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={this.isEditModal ? 'Edytuj listę rozwijaną' : 'Dodaj listę rozwijaną'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <StyledTextField
            value={this.props.data.title}
            floatingLabelText="Tytuł (nagłówek modułu)"
            {...inputStyle}
          />
          <ElementsList>
            {this.state.content && this.state.content.map(this.renderElement)}
          </ElementsList>
          <AddElement onClick={() => { this.setState({ dialog: true }); }}>
            + Dodaj nowy element
          </AddElement>
        </Container>
        {this.state.dialog &&
          <AddCollapsiblee
            open
            sidebar={sidebar}
            closeDialog={this.closeDialog}
            submit={(el) => { this.changeList(el, dialogData); }}
            data={dialogData}
          />
        }
      </EditDialog>
    );
  }
}
