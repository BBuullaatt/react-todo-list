import React, { useState, useEffect } from "react";
import "./App.css";
import ToDoListItem from "./components/ToDoListItem/ToDoListItem";
import EditPage from "./components/EditPage/EditPage";

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const getDate = () => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    return dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
  };

  const setToLS = (key, value) => {
    return localStorage.setItem(`${key}`, JSON.stringify(value));
  };

  const gefFromLS = (key) => {
    return JSON.parse(localStorage.getItem(`${key}`));
  };

  function handleAddTodo (returnedTodo='') {
     let newTodoItem=null;
    
     console.log('returnedTodo',returnedTodo);
    if (returnedTodo) {
      newTodoItem = returnedTodo;
      console.log(returnedTodo);
    } else {
      newTodoItem = {
        title: newTitle,
        description: newDescription,
      };
    } 

      /* console.log(returnedTodo);
       let newTodoItem = {
        title: newTitle,
        description: newDescription,
      };  */

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    setToLS("todoList", updatedTodoArr);

    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    setToLS("todoList", reducedTodo);
    setAllTodos(reducedTodo);
  };

  const handleCompleteTodo = (index) => {
    let completedOn = getDate();

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    setToLS("completedTodos", updatedCompletedArr);
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    setToLS("completedTodos", reducedTodo);
    setCompletedTodos(reducedTodo);
  };

  const handleEdit = (index, item) => {
    console.log(index);
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = (index) => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;

    let completedOn = getDate();

    newToDo[currentEdit].isUpdated = completedOn;

    setAllTodos(newToDo);
    setCurrentEdit("");
    setToLS("todoList", newToDo);
  };

  const returnTodo = (index) => {
    /* let completedTodo = [...completedTodos]; */
    let todo = completedTodos[index];

    console.log(todo);
    handleAddTodo(todo);
    handleDeleteCompletedTodo(index); 
  };

  useEffect(() => {
    let savedTodo = gefFromLS("todoList");
    let savedCompletedTodo = gefFromLS("completedTodos");
    if (savedTodo) setAllTodos(savedTodo);
    if (savedCompletedTodo) setCompletedTodos(savedCompletedTodo);
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Whats's the task title?"
            ></input>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Whats's the task description?"
            ></input>
          </div>
          <div className="todo-input-item">
            <button
              className="primaryBtn"
              onClick={() => handleAddTodo()}
              type="button"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <EditPage
                    currentEditedItem={currentEditedItem}
                    handleUpdateTitle={handleUpdateTitle}
                    handleUpdateDescription={handleUpdateDescription}
                    handleUpdateToDo={handleUpdateToDo}
                    setCurrentEdit={setCurrentEdit}
                    key={index}
                  />
                );
              } else {
                return (
                  <ToDoListItem
                    item={item}
                    index={index}
                    isCompletedList={false}
                    handleDeleteTodo={handleDeleteTodo}
                    handleCompleteTodo={handleCompleteTodo}
                    handleEdit={handleEdit}
                    key={index}
                  />
                );
              }
            })}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <ToDoListItem
                  item={item}
                  index={index}
                  isCompletedList={true}
                  handleDeleteCompletedTodo={handleDeleteCompletedTodo}
                  returnTodo={returnTodo}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
