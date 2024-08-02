import classes from "./ListItem.module.css";
import { toDo } from "../../tyes";

interface Props {
  toDo: toDo;
  onEdit: (val: string, editId: number) => void;
  disabled?: boolean;
  onDelete: (id: number) => void;
  setError: () => void;
  markDone: (id: number) => void;
}

export default function ListItem(props: Props) {
  const handleDelete = () => {
    if (props.disabled) {
      props.setError();
      return;
    }
    props.onDelete(props.toDo.id);
  };

  function markDoneHandler(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.children.length >= 2) {
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
        <button
          onClick={handleDelete}
          className={`${classes.delBtn} ${classes.btn}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
