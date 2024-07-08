
import "../styles/ListEditor.css";
import React from 'react'
import TextareaAutosize from "react-textarea-autosize";

const NewTaskForm = (props) => {
    const { title,handleChangeTitle ,deleteList} = props;
    const ref = React.createRef();


    const onEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        props.saveList();
      }
    };
    
    return (
        <div className="List-Title-Edit" ref={ref}>
        <TextareaAutosize
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={onEnter}
          style={{ width: deleteList ? 220 : 245 }}
        />
        {deleteList && <ion-icon name="trash" onClick={deleteList} />}
      </div>

    )
}

export default NewTaskForm