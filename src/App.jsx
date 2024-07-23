import { useEffect, useState } from "react";
import "./App.css";
import ListItem from "./assets/Components/ListItem";

let first = true;

function App() {
  const [toDos, setToDos] = useState([
    { content: "make a react component", id: 12313213, done: false },
    { content: "make a angular state", id: 34532, done: false },
  ]);

  const doneToDos = toDos.filter((toDo) => toDo.done === true);

  const [filteredResults, setFilteredResults] = useState([]);
  const doneFilteredToDos = filteredResults.filter(
    (filItem) => filItem.done === true
  );

  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("submit");
  const [previousMode, setPreviousMode] = useState('');
  const [editId, setEditId] = useState(null);

 function addToDoHandler(e) {
    e.preventDefault();

    if (mode === "search") {
      if (filteredResults.length > 0) {
        const updatedFilteredResults = toDos.map((toDo) => {
          const updatedToDo = filteredResults.find(
            (filteredItem) => toDo.id === filteredItem.id
          );
          return updatedToDo ? { ...toDo, ...updatedToDo } : toDo;
        });
        const filteredToDos = updatedFilteredResults.filter((item) =>
          item.content.includes(value)
        );
        setFilteredResults(filteredToDos);
      } else {
        const filteredToDos = toDos.filter((item) =>
          item.content.includes(value)
        );
        setFilteredResults(filteredToDos);
      }
      return;
    }

    if (value.trim() !== "") {
      if (mode === "submit") {
        setToDos([
          ...toDos,
          { content: value, id: new Date().getTime(), done: false },
        ]);
        setError(null);
      } else if (mode === "edit") {
        if (previousMode === "search") {
          setFilteredResults((state) =>
            state.map((item) => {
              if (item.id === editId) {
                return { ...item, content: value };
              }
              return item;
            })
          );
          setError(null);
          setMode("search");
          return;
        }
        setToDos((state) =>
          state.map((item) => {
            if (item.id === editId) {
              return { ...item, content: value };
            }
            return item;
          })
        );
        setError(null);
        setMode("submit");
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
    setPreviousMode(mode);
    console.log(mode);
    setMode("edit");
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
    if (mode !== "search") {
      setToDos((state) =>
        state.map((item) => {
          if (item.id === id) {
            return { ...item, done: !item.done };
          }
          return item;
        })
      );
    } else if (mode === "search") {
      setFilteredResults((state) =>
        state.map((item) => {
          if (item.id === id) {
            return { ...item, done: !item.done };
          }
          return item;
        })
      );
    }
  }

  function markAllHandler() {
    if (mode !== "search") {
      if (doneToDos.length < toDos.length) {
        setToDos((state) => state.map((toDo) => ({ ...toDo, done: true })));
      } else if (doneToDos.length === toDos.length) {
        setToDos((state) => state.map((toDo) => ({ ...toDo, done: false })));
      }
    } else if (mode === "search") {
      if (doneFilteredToDos.length < filteredResults.length) {
        setFilteredResults((state) =>
          state.map((toDo) => ({ ...toDo, done: true }))
        );
      } else if (doneFilteredToDos.length === filteredResults.length) {
        setFilteredResults((state) =>
          state.map((toDo) => ({ ...toDo, done: false }))
        );
      }
    }
  }

  function searchHandler() {
    setMode("search");
    const updatedFilteredResults = toDos.map((toDo) => {
      const updatedToDo = filteredResults.find(
        (filteredItem) => toDo.id === filteredItem.id
      );
      return updatedToDo ? { ...toDo, ...updatedToDo } : toDo;
    });
    setFilteredResults(updatedFilteredResults);
  }

  function clearListHandler() {
    if (mode !== "search") {
      setToDos([]);
    } else if (mode === "search") {
      setFilteredResults([]);
    }
  }

  function goBackToAddHandler() {
    const updatedToDos = toDos.map((toDo) => {
      const updatedItem = filteredResults.find(
        (filteredItem) => toDo.id === filteredItem.id
      );
      return updatedItem ? { ...toDo, ...updatedItem } : toDo;
    });
    // const total = [];
    // toDos.map((toDo) => {
    //   filteredResults.map((filteredResult) => {
    //     if (toDo.id === filteredResult.id) {
    //       total.push({ ...toDo, ...filteredResult });
    //     } else if (toDo.id !== filteredResult.id) {
    //       return;
    //     }
    //   });
    // });
    setToDos(updatedToDos);
    setFilteredResults([]);
    setValue("");
    setMode("submit");
  }

  return (
    <>
      <h1
        className="h1"
        onClick={() => {
          console.log(
            "toDos, ",
            toDos,
            " filtered Todos ",
            filteredResults,
            "mode",
            mode
          );
        }}
      >
        To Do List
      </h1>
      <form onSubmit={addToDoHandler} className="form">
        <input
          className={
            error && error.type && value === "" ? "input error" : "input"
          }
          type="text"
          value={value}
          onChange={changeHandler}
          placeholder={`${
            mode === "submit"
              ? "Enter your To Dos"
              : mode === "edit"
              ? "Entered edited toDo"
              : "Search by content"
          }`}
        />
        <button
          className="button"
          style={
            mode === "edit"
              ? {
                  backgroundColor: "rgb(148, 196, 77)",
                  padding: "0.5rem 0.3rem",
                }
              : mode === "search"
              ? {
                  backgroundColor: "yellow",
                  color: "grey",
                }
              : {}
          }
          type="submit"
        >
          {mode === "submit"
            ? "Add to Do"
            : mode === "edit"
            ? "Save Changes"
            : "Search"}
        </button>
        {mode === "submit" && toDos.length >0 && (
          <button
            className="button"
            style={{
              backgroundColor: "yellow",
              color: "grey",
              paddingRight: '1.2rem'
            }}
            onClick={searchHandler}
          >
            Search&nbsp;Tasks
          </button>
        )}
        {mode === "search" && (
          <button
            className="button"
            style={{
              backgroundColor: "orange",
              padding: "0.4rem 0.2rem",
            }}
            onClick={goBackToAddHandler}
          >
            Add New Task
          </button>
        )}
      </form>
      {error && <p className="errorText">{error.text}</p>}
      {
        <>
          {mode === "submit" && (
              <ul className="ul">
                {toDos.map((toDo) => (
                  <ListItem
                    key={toDo.id}
                    toDo={toDo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    disabled={mode === "edit"}
                    markDone={markDoneHandler}
                    setError={() => {
                      setError({
                        text: "Please save changes before deleting any task",
                      });
                    }}
                  />
                ))}
              </ul>
            )}
          {mode === "search" && filteredResults.length > 0 && (
              <ul className="ul">
                {filteredResults.map((toDo) => (
                  <ListItem
                    key={toDo.id}
                    toDo={toDo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    disabled={mode === "edit"}
                    markDone={markDoneHandler}
                    setError={() => {
                      setError({
                        text: "Please save changes before deleting any task",
                      });
                    }}
                  />
                ))}
              </ul>
            )}
            {mode === "edit" && previousMode==='submit' && (
              <ul className="ul">
                {toDos.map((toDo) => (
                  <ListItem
                    key={toDo.id}
                    toDo={toDo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    disabled={mode === "edit"}
                    markDone={markDoneHandler}
                    setError={() => {
                      setError({
                        text: "Please save changes before deleting any task",
                      });
                    }}
                  />
                ))}
              </ul>
            )}
            {mode === "edit" && previousMode==='search' && (
              <ul className="ul">
                {filteredResults.map((toDo) => (
                  <ListItem
                    key={toDo.id}
                    toDo={toDo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    disabled={mode === "edit"}
                    markDone={markDoneHandler}
                    setError={() => {
                      setError({
                        text: "Please save changes before deleting any task",
                      });
                    }}
                  />
                ))}
              </ul>
            )}
          {filteredResults.length === 0 && mode === "search" && (
            <p className="errorText">No Results Found !</p>
          )}
          {toDos.length === 0 && (
            <p className="errorText">You have no tasks, please add some !</p>
          )}
          {mode === "submit" && doneToDos.length > 0 && (
            <p style={{marginTop: 0}}>{`You have done ${0 + doneToDos.length}/${
              toDos.length
            } tasks`}</p>
          )}
          {mode === "search" && doneFilteredToDos.length > 0 && (
            <p style={{marginTop: 0}}>{`You have done ${0 + doneFilteredToDos.length}/${
              filteredResults.length
            } tasks`}</p>
          )}
          {mode === "edit" && previousMode ==='search' && doneFilteredToDos.length > 0 && (
            <p style={{marginTop: 0}}>{`You have done ${0 + doneFilteredToDos.length}/${
              toDos.length
            } tasks`}</p>
          )}
          {mode === "edit" && previousMode ==='submit' && doneToDos.length > 0 && (
            <p style={{marginTop: 0}}>{`You have done ${0 + doneToDos.length}/${
              toDos.length
            } tasks`}</p>
          )}
          {toDos.length>0 && <div className="btnContainer">
            <button className="clearlistBtn btn" onClick={clearListHandler}>
              Clear List
            </button>
            <button className="delDoneBtn btn" onClick={delDoneHandler}>
              Delete Tasks which are marked done
            </button>
            <button className="markAllBtn btn" onClick={markAllHandler}>
              {mode !== "search"
                ? doneToDos.length < toDos.length
                  ? "Mark All as Done"
                  : "Mark All as UnDone"
                : doneFilteredToDos.length < filteredResults.length
                ? "Mark All as Done"
                : "Mark All as UnDone"}
            </button>
          </div>}
        </>
   }
    </>
  );
}

export default App;
