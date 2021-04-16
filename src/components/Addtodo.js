import React, { useState } from "react";
import PropTypes from "prop-types";

const Addtodo = ({ addTodo, asyncAdd }) => {
  const [value, setValue] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo({ text: value });
    setValue("");
  };

  const handleAsyncAdd = (e) => {
    e.preventDefault();
    if (!value) return;

    console.log(asyncAdd);
    asyncAdd({ text: value });
    setValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onClick}>添加</button>
      <button onClick={handleAsyncAdd}>异步添加</button>
    </div>
  );
};
Addtodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Addtodo;
