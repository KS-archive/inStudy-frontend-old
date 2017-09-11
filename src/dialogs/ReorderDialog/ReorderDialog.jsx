import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { renderActionButtons } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Container, ListContainer, ListElement } from './ReorderDialog_styles';

const SortableItem = SortableElement(({ value }) => (
  <ListElement>
    <i className="fa fa-ellipsis-v" aria-hidden="true" />
    {value}
  </ListElement>
));

export const SortableList = SortableContainer(({ elements, displayBy }) => (
  <ListContainer>
    {elements.map((el, index) => (
      <SortableItem key={`element-${index}`} index={index} value={el[displayBy]} />
    ))}
  </ListContainer>
));

export default class ReorderDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: this.props.data,
    };
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      elements: arrayMove(this.state.elements, oldIndex, newIndex),
    });
  };

  handleSubmit = () => {
    this.props.submitFunction(this.state.elements);
    this.props.closeDialog();
  }

  render() {
    const { closeDialog, sidebar, title } = this.props;

    return (
      <EditDialog
        open
        onRequestClose={closeDialog}
        actions={this.actions}
        title={title}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <SortableList
            elements={this.state.elements}
            displayBy={this.props.displayBy}
            onSortEnd={this.onSortEnd}
            lockAxis="y"
          />;
        </Container>
      </EditDialog>
    );
  }
}
