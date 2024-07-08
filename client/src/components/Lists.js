import "../styles/List.css";

import React, { Component, memo, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

// import Card from "./Card";
// import CardEditor from "./CardEditor";
// import ListEditor from "./ListEditor";
// import AddIcon from '@mui/icons-material/Add';

import shortid from "shortid";
import axios from "axios";
import { set } from "mongoose";
import NewTaskForm from "./NewTaskForm";
import CardEditor from "./CardEditor";
import Card from "./Card";
import { addCardAsyncData, getAllCardAsyncData } from "../action";
import store from "../store";
import AddIcon from '@mui/icons-material/Add';
// import { getAllAsyncData } from "../Action";
// import { getAllAsyncData } from "../Action";

function List(props) {

  const [card] = useSelector(state => state.taskreducer.cardalldata);


  const { listId, index, data } = props;
  const dispatch = useDispatch()

  const [state, setState] = useState({
    editingTitle: false,
    title: data.title,
    addingCard: false
  });
  const { editingTitle, addingCard, title } = state;

  const [carddata, setCarddata] = useState(false)


  const toggleAddingCard = () =>

    setState({ addingCard: !state.addingCard });



  const cardId = shortid.generate();
  const addCard = async (cardText) => {
    toggleAddingCard();

    const data = {
      cardText,
      cardId,
      listId
    }

    dispatch(addCardAsyncData(data));

  };
  const toggleEditingTitle = () =>
    setState({ editingTitle: !state.editingTitle });

  const handleChangeTitle = e => setState({ title: e.target.value });

  const editListTitle = async () => {
    const { listId, dispatch } = props;
    const { title } = state;
    toggleEditingTitle();
    // dispatch({
    //   type: "CHANGE_LIST_TITLE",
    //   payload: { listId, listTitle: title }
    // });
  };

  const deleteList = async () => {

    if (window.confirm("Are you sure to delete this list?")) {
      //   dispatch({
      //     type: "DELETE_LIST",
      //     payload: { listId, cards: list.cards }
      //   });
    }
  };
  const filteredCards = card?.filter(card => card.listId === listId);


  useEffect(() => {
    dispatch(getAllCardAsyncData());
  }, [carddata])


  return (

    <Draggable draggableId={data._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <NewTaskForm
              //   list={list}
              title={data.title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />

          ) : (
            <div className="List-Title" onClick={toggleEditingTitle}>
              {data.title}
            </div>
          )}

          <Droppable droppableId={data._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {filteredCards &&
                  filteredCards.map((val, index) => (
                    <Card
                      key={val}
                      cardId={val}
                      index={index}
                      listId={val._id}
                    />
                  ))}

                {provided.placeholder}

                {addingCard ? (

                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                    <AddIcon sx={{mr:1}} />Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}


export default memo(List);
