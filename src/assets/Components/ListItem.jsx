import classes from "./ListItem.module.css";

export default function ListItem(props) {
  const handleDelete = () => {
    if (props.disabled) {
      props.setError(true);
      return;
    }
    props.onDelete(props.index);
  };

  const handleEdit = () => props.onEdit(props.content, props.index);

  return (
    <div className={classes.itemContainer}>
      <p className={classes.content}>{props.content}</p>
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
