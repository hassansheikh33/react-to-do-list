import { useState } from "react";
import "./App.css";
import ListItem from "./assets/Components/ListItem";

function App() {
  const [toDos, setToDos] = useState(["learn react", "make a todo app"]);

  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  function addToDoHandler(e) {
    e.preventDefault();

    if (value.trim() !== "") {
      if (submit) {
        setToDos([...toDos, value]);
        setHasError(false);
      } else {
        setToDos((state) =>
          state.map((item, index) => {
            if (index === editIndex) {
              return value;
            }
            return item;
          })
        );
        setHasError(false);
        setSubmit(true);
      }
    } else {
      setHasError(true);
    }
    setValue("");
  }

  function changeHandler(e) {
    setValue(e.target.value);
  }

  function onEdit(val, itemIndex) {
    setSubmit(false);
    setValue(val);
    setEditIndex(itemIndex);
  }

  function onDelete(itemIndex) {
    setToDos((state) => state.filter((i, index) => index !== itemIndex));
  }

  return (
    <>
      <h1 className="h1">To Do List</h1>

      <form onSubmit={addToDoHandler} className="form">
        <input
          className={hasError && value === "" ? "input error" : "input"}
          type="text"
          value={value}
          onChange={changeHandler}
          placeholder="Enter your To Dos"
        />
        <button
          className="button"
          style={
            !submit
              ? { backgroundColor: "greenyellow", padding: "0.5rem 0.3rem" }
              : {}
          }
          type="submit"
        >
          {submit ? "Add to Do" : "Save Changes"}
        </button>
      </form>
      {hasError && value === "" && (
        <p className="errorText">Please enter a valid input</p>
      )}
      {hasError && value !== "" && !submit && (
        <p className="errorText">
          Please save changes before deleting any task
        </p>
      )}
      {toDos.length !== 0 && (
        <>
          <ul className="ul">
            {toDos.map((toDo, index) => (
              <ListItem
                key={index}
                index={index}
                content={toDo}
                onEdit={onEdit}
                onDelete={onDelete}
                disabled={!submit}
                setError={setHasError}
              />
            ))}
          </ul>
          <button className="clearlistBtn" onClick={() => setToDos([])}>
            Clear List
          </button>
        </>
      )}
      {toDos.length === 0 && (
        <p className="errorText">You have no tasks, please add some</p>
      )}
    </>
  );
}

export default App;
