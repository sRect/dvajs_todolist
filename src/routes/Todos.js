import { connect } from "dva";
import TodoListItem from "../components/TodoListItem";
import AddTodo from "../components/Addtodo";

const Todos = (props) => {
  const { todos, delTodo, completeTodo, addTodo, asyncAdd } = props;
  return (
    <div>
      <h1>TodoList</h1>
      <div>
        {todos.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              delTodo={delTodo}
              completeTodo={completeTodo}
            />
          );
        })}
      </div>
      <AddTodo addTodo={addTodo} asyncAdd={asyncAdd} />
    </div>
  );
};

export default connect(
  ({ todos }) => ({ todos }),
  (dispatch) => ({
    delTodo(id) {
      dispatch({
        type: "todos/del",
        payload: {
          id,
        },
      });
    },
    addTodo({ text }) {
      dispatch({
        type: "todos/add",
        payload: {
          text,
        },
      });
    },
    asyncAdd({ text }) {
      dispatch({
        type: "todos/asyncAdd",
        payload: {
          text,
        },
      });
    },
    completeTodo(id) {
      dispatch({
        type: "todos/complete",
        payload: {
          id,
        },
      });
    },
  })
)(Todos);
