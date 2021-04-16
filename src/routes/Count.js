import React from "react";
import { connect } from "dva";

const Count = (props) => {
  const { count, add, minus, asyncAdd } = props;

  return (
    <div>
      count: {count} <br />
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
      <button onClick={() => asyncAdd(10)}>asyncAdd +10</button>
    </div>
  );
};

const mapStateToProps = (state) => state.count;

const mapDispatchToProps = (dispatch) => ({
  add() {
    dispatch({
      type: "count/add",
    });
  },
  minus() {
    dispatch({
      type: "count/minus",
    });
  },
  asyncAdd(num) {
    dispatch({
      type: "count/asyncAdd",
      payload: {
        num,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Count);
