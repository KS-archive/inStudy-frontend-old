import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import { initializeDialog, extendByBasicList } from '../../utils/modulesHelpers';
import ColorsDialog from '../../dialogs/ColorsDialog/ColorsDialog';
import ReorderDialog from '../../dialogs/ReorderDialog/ReorderDialog';
import RemovingConfirm from '../../dialogs/RemovingConfirm/RemovingConfirm';
import DiscardChangesConfirm from '../../dialogs/DiscardChangesConfirm/DiscardChangesConfirm';
import ImageDetailsDialog from './ImageDetailsDialog/ImageDetailsDialog';
import { renderTextField } from '../../utils/renderHelpers';
import { EditDialog, LabelHeader, Image, ImageOverlay, ImageOptions } from '../../utils/globalStyles';
import { Container, Checkboxes, StyledCheckbox, Types, Type, Elements } from './LinkImagesDialog_styles';

export default class LinkImagesDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'LinkImages', valuesConfig, ['colors', 'reorder', 'types']);
    extendByBasicList(this);
  }

  addDetails = () => {
    this.setState({
      dialog: 'elementDetails',
      dialogData: {},
    });
  }

  editDetails = (el, index) => {
    this.setState({
      dialog: 'elementDetails',
      dialogData: { ...el, index },
    });
  }

  renderType = (type, index) => (
    <Type
      key={type.name}
      selected={(index === this.state.type)}
      onClick={() => { this.setState({ type: index }); }}
    >
      <img src={`/img/types_icons/${type.icon}`} alt={type.name} />
    </Type>
  );

  renderElement = (el, index) => (
    <Image key={index}>
      <img src={el.src} alt="" />
      <ImageOverlay>
        <ImageOptions>
          <i
            className="fa fa-pencil-square-o"
            aria-hidden="true"
            onClick={() => { this.editDetails(el, index); }}
          />
          <i
            className="fa fa-trash-o"
            aria-hidden="true"
            onClick={() => { this.deleteElement(el); }}
          />
        </ImageOptions>
      </ImageOverlay>
    </Image>
  );

  renderCheckbox = (label, stateName) => {
    const checked = this.state[stateName];
    const onCheck = () => { this.setState({ [stateName]: !checked }); };
    const attrs = { label, checked, onCheck };
    return <StyledCheckbox {...attrs} />;
  }

  render() {
    const { open, sidebar, colors } = this.props;
    const { dialog, dialogData, content, id } = this.state;
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
          {renderTextField(this, 'Liczba wierszy (0 = wszystkie)', 'rowsLimit')}
          <Checkboxes>
            {this.renderCheckbox('Losowa kolejność', 'randomize')}
            {this.renderCheckbox('Szare przed najechaniem', 'startGray')}
          </Checkboxes>
          <LabelHeader>Typ</LabelHeader>
          <Types>
            {this.types.map((type, i) => this.renderType(type, i))}
          </Types>
          <LabelHeader>Elementy</LabelHeader>
          <Elements>
            {content.map((el, i) => this.renderElement(el, i))}
            <Image onClick={this.addDetails}>
              <i className="fa fa-plus" aria-hidden="true" />
            </Image>
          </Elements>
        </Container>
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(newColors) => { this.setState({ color: newColors[0] }); }}
            names={['Kolor obramowania (typ 2)']}
            mainColors={colors}
            {...dialogAttrs}
          />
        }
        {dialog === 'reorder' &&
          <ReorderDialog
            {...dialogAttrs}
            submitFunction={this.reorderElements}
            title="Zmień kolejność elementów galerii"
            displayBy="link"
          />
        }
        {dialog === 'elementDetails' &&
          <ImageDetailsDialog
            submit={(el) => { this.changeList(el, dialogData); }}
            id={id}
            {...dialogAttrs}
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
