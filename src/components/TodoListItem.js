import PropTypes from "prop-types";

const TodoListItem = ({ todo, delTodo, completeTodo }) => {
  return (
    <ul>
      <li style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.text}
        <button onClick={() => delTodo(todo.id)}>刪除</button>
        <button onClick={() => completeTodo(todo.id)}>完成</button>
      </li>
    </ul>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completeTodo: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
