import classes from "./ListItem.module.css";

export default function ListItem(props) {
  const handleDelete = () => {
    if (props.disabled) {
      props.setError();
      return;
    }
    props.onDelete(props.toDo.id);
  };

  function markDoneHandler(e) {
    if (e.target.children.length >= 2) {
      props.markDone(props.toDo.id);
    }
  }

  const handleEdit = () => props.onEdit(props.toDo.content, props.toDo.id);

  return (
    <div
      className={`${classes.itemContainer} ${
        props.toDo.done ? classes.done : ""
      }`}
      onClick={markDoneHandler}
    >
      <p className={classes.content}>{props.toDo.content}</p>
      <div className={classes.btnContainer}>
        <button
          onClick={handleEdit}
          className={`${classes.editBtn} ${classes.btn}`}
        >
          Edit
        </button>
        <div
          onClick={handleDelete}
          className={`${classes.delBtn} ${classes.btn}`}
          disabled={props.disabled}
        >
          Delete
        </div>
      </div>
    </div>
  );
}
