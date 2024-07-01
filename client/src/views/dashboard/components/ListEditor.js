import "../styles/ListEditor.css";

import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import shortid from "shortid";

class ListEditor extends Component {
  
  ref = React.createRef();
  
  onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.saveList();
    }
  };
  
  handleClick = e => {
    const node = this.ref.current;

    const { dispatch,title } = this.props;

    if (node.contains(e.target)) {
      return;
    }
    dispatch({
      type: "ADD_LIST",
      payload: { listId: shortid.generate(), listTitle: title }
    });
    this.props.onClickOutside();
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  render() {
    const { title, handleChangeTitle, deleteList } = this.props;

    return (
      <div className="List-Title-Edit" ref={this.ref}>
        <TextareaAutosize
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={this.onEnter}
          style={{ width: deleteList ? 220 : 245 }}
        />
        {deleteList && <ion-icon name="trash" onClick={deleteList} />}
      </div>
    );
  }
}

export default ListEditor;
