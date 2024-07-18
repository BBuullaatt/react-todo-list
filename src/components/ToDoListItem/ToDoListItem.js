import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import './ToDoListItem.css';

function ToDoListItem({
  item,
  index,
  isCompletedList,
  handleDeleteTodo,
  handleCompleteTodo,
  handleEdit,
  handleDeleteCompletedTodo,
  returnTodo
}) {

  return (
    <div className="todo-list-item">
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.isUpdated && (
          <p>
            <small>Last edited on: {item.isUpdated}</small>
          </p>
        )}
      </div>

      {!isCompletedList && (
        <div className="todo-list-buttons"> 
          <AiOutlineDelete
            className="icon"
            onClick={() => handleDeleteTodo(index)}
            title="Delete"
          />
          <BsCheckLg
            className="check-icon"
            onClick={() => handleCompleteTodo(index)}
            title="Complete"
          />
          <AiOutlineEdit
            className="check-icon"
            onClick={() => handleEdit(index, item)}
            title="Edit"
          />
        </div>
      )}

      {isCompletedList && (
        <div className="todo-list-buttons">
          <AiOutlineDelete
            className="icon"
            onClick={() => handleDeleteCompletedTodo(index)}
            title="Delete"
          />
          <RiArrowGoBackFill
            className="check-icon"
            onClick={() => returnTodo(index)}
            title="Return the todo back"
          />
        </div>
      )}
    </div>
  );
}

export default ToDoListItem;
