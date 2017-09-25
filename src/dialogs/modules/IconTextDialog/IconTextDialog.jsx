import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import { initializeDialog, extendByBasicList } from '../../../utils/modulesHelpers';
import AddIconText from './AddIconText/AddIconText';
import ColorsDialog from '../../../dialogs/helpers/ColorsDialog/ColorsDialog';
import ReorderDialog from '../../../dialogs/helpers/ReorderDialog/ReorderDialog';
import RemovingConfirm from '../../../dialogs/helpers/RemovingConfirm/RemovingConfirm';
import DiscardChangesConfirm from '../../../dialogs/helpers/DiscardChangesConfirm/DiscardChangesConfirm';
import { renderTextField } from '../../../utils/renderHelpers';
import { EditDialog } from '../../../utils/globalStyles';
import { Container, ElementsList, Card, Content, Title, Description, Icons, Icon, AddElement, IconImageWrapper, IconImage } from './IconTextDialog_styles';

export default class IconTextDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'IconText', valuesConfig, ['colors', 'reorder']);
    extendByBasicList(this);
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
        {dialog === 'reorder' &&
          <ReorderDialog
            {...dialogAttrs}
            submitFunction={this.reorderElements}
            title="Zmień kolejność kolumn"
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
