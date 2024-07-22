import { useState } from "react";
import "./App.css";
import ListItem from "./assets/Components/ListItem";

function App() {
  const [toDos, setToDos] = useState([
    { content: "learn react", id: 12312321321, done: false },
    { content: "make a todo app", id: 32432432434, done: false },
  ]);

  const doneToDos = toDos.filter((toDo) => toDo.done === true);

  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [submit, setSubmit] = useState(true);
  const [editId, setEditId] = useState(null);

  function addToDoHandler(e) {
    e.preventDefault();

    if (value.trim() !== "") {
      if (submit) {
        setToDos([
          ...toDos,
          { content: value, id: new Date().getTime(), done: false },
        ]);
        setError(null);
      } else {
        setToDos((state) =>
          state.map((item) => {
            if (item.id === editId) {
              return { ...item, content: value };
            }
            return item;
          })
        );
        setError(null);
        setSubmit(true);
      }
    } else {
      setError({ text: "Please enter valid input!", type: "INPUT" });
    }
    setValue("");
  }

  function changeHandler(e) {
    setValue(e.target.value);
  }

  function onEdit(val, itemId) {
    setSubmit(false);
    setValue(val);
    setEditId(itemId);
  }

  function onDelete(itemId) {
    setToDos((state) => state.filter((toDo) => toDo.id !== itemId));
  }

  function delDoneHandler() {
    if (doneToDos.length > 0) {
      setError(null);
      setToDos((state) => state.filter((item) => item.done !== true));
    } else {
      setError({ text: "There are no tasks marked as done" });
    }
  }

  function markDoneHandler(id) {
    setToDos((state) =>
      state.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  }

  function markAllHandler() {
    if (doneToDos.length < toDos.length) {
      setToDos((state) => state.map((toDo) => ({ ...toDo, done: true })));
    } else if (doneToDos.length === toDos.length) {
      setToDos((state) => state.map((toDo) => ({ ...toDo, done: false })));
    }
  }

  return (
    <>
      <h1 className="h1">To Do List</h1>
      <form onSubmit={addToDoHandler} className="form">
        <input
          className={
            error && error.type && value === "" ? "input error" : "input"
          }
          type="text"
          value={value}
          onChange={changeHandler}
          placeholder="Enter your To Dos"
        />
        <button
          className="button"
          style={
            !submit
              ? {
                  backgroundColor: "rgb(148, 196, 77)",
                  padding: "0.5rem 0.3rem",
                }
              : {}
          }
          type="submit"
        >
          {submit ? "Add to Do" : "Save Changes"}
        </button>
      </form>
      {error && <p className="errorText">{error.text}</p>}
      {toDos.length !== 0 && (
        <>
          <ul className="ul">
            {toDos.map((toDo) => (
              <ListItem
                key={toDo.id}
                toDo={toDo}
                onEdit={onEdit}
                onDelete={onDelete}
                disabled={!submit}
                markDone={markDoneHandler}
                setError={() => {
                  setError({
                    text: "Please save changes before deleting any task",
                  });
                }}
              />
            ))}
          </ul>
          <p>{`You have done ${0 + doneToDos.length}/${toDos.length} tasks`}</p>
          <div className="btnContainer">
            <button className="clearlistBtn btn" onClick={() => setToDos([])}>
              Clear List
            </button>
            <button className="delDoneBtn btn" onClick={delDoneHandler}>
              Delete Tasks which are marked done
            </button>
            <button className="markAllBtn btn" onClick={markAllHandler}>
              {doneToDos.length < toDos.length
                ? "Mark All as Done"
                : "Mark All as UnDone"}
            </button>
          </div>
        </>
      )}
      {toDos.length === 0 && (
        <p className="errorText">You have no tasks, please add some</p>
      )}
    </>
  );
}

export default App;
