import React, { useEffect, useState } from 'react'
import NewTaskForm from './NewTaskForm'
import AddList from './List'
import { useDispatch, useSelector } from 'react-redux'
import "../styles/Board.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from './Lists';
import { getAllListAsyncData, movecardposition } from '../action';
import store from '../store';
import throttle from 'lodash.throttle';
import AddIcon from '@mui/icons-material/Add';



const Board = () => {
  const dispatch = useDispatch();

  const [listdata] = useSelector(state => state.taskreducer.listAlldata);

  const [state, setState] = useState({ addingList: false });

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  const saveState = (state) => {
    console.log("saveState",state.taskreducer);
    };
  
  console.log(store.getState());


  const toggleAddingList = async () => {
    setState({ addingList: !state.addingList });
  }
  const handleDragEnd = async ({ source, destination, type }) => {
    if (!destination) return;
    if (source.index !== destination.index ||
      source.droppableId !== destination.droppableId) {
    
        const data = {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        }
      dispatch(movecardposition(data));
    }
  }
  const { addingList } = state;

  useEffect(() => {
    dispatch(getAllListAsyncData());

  }, [])
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="Board" ref={provided.innerRef}>
              {listdata?.map((val, index) => {
                return <List listId={val._id} data={val} key={val._id} index={index} />;
              })}

              {provided.placeholder}

              <div className="Add-List">
                {addingList ? (
                  <AddList toggleAddingList={toggleAddingList} />
                ) : (
                  <div
                    onClick={toggleAddingList}
                    className="Add-List-Button"
                  >
                    <AddIcon sx={{mr:1}} /> Add a list
                  </div>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Board