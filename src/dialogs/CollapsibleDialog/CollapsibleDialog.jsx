import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import { initializeDialog, extendByBasicList } from '../../utils/modulesHelpers';
import AddCollapsible from './AddCollapsible/AddCollapsible';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import ReorderDialog from '../../dialogs/ReorderDialog/ReorderDialog';
import RemovingConfirm from '../../dialogs/RemovingConfirm/RemovingConfirm';
import DiscardChangesConfirm from '../../dialogs/DiscardChangesConfirm/DiscardChangesConfirm';
import { renderTextField } from '../../utils/renderHelpers';
import { EditDialog } from '../../utils/globalStyles';
import { Container, ElementsList, Card, Content, Title, Description, Icons, Icon, AddElement } from './CollapsibleDialog_styles';

export default class CollapsibleDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'Collapsible', valuesConfig, ['colors', 'reorder']);
    extendByBasicList(this);
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
    const { open, sidebar, colors } = this.props;
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
        isSidebar={sidebar}
        {...this.dialogArrts}
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
          <AddCollapsible
            submit={(el) => { this.changeList(el, dialogData); }}
            {...dialogAttrs}
          />
        }
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(newColors) => { this.setState({ color: newColors[0] }); }}
            names={['Kolor kafelka']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'reorder' &&
          <ReorderDialog
            {...dialogAttrs}
            submitFunction={this.reorderElements}
            title="Zmień kolejność elementów listy"
            displayBy="title"
          />
        }
        {dialog === 'remove' &&
          <RemovingConfirm
            closeDialog={this.closeDialog}
            remove={this.confirmRemove}
            moduleName={this.moduleName}
            sidebar={sidebar}
          />
        }
        {dialog === 'discardChanges' &&
          <DiscardChangesConfirm
            closeDialog={this.closeDialog}
            discard={this.closeDialogConfirm}
            sidebar={sidebar}
          />
        }
      </EditDialog>
    );
  }
}
