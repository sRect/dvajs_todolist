import dva from "dva";
import router from "./router";

const allModel = require.context('./models', true, /\.js$/);

// 1.init
const app = dva();

// 2.定义Model
// app.model(require("./models/todos").default);
allModel.keys().forEach((key) => {
  // console.log("allModel(key).default", allModel(key).default);
  app.model(allModel(key).default);
});

// 3.Router
app.router(router);
// 4.Start
app.start("#root");

// import React from 'react';
// import dva, {connect} from 'dva';
// import {delay} from 'lodash';

// // 初始化
// const app = dva();

// console.log(app._store); // 顶部的 state 数据

// // Model
// app.model({
//   namespace: "count",
//   state: 0,
//   reducers: {
//     add: (count) => count + 1,
//     minus: (count) => count - 1,
//   },
//   effects: {
//     *addAfter1Second(action, {call, put}) {
//       yield call(delay, 1000);
//       yield put({type: 'add'})
//     }
//   }
// });

// // View
// const App = connect(({ count }) => ({ count }))((props) => (
//   <div>
//     <h2>{props.count}</h2>
//     <button
//       key="add"
//       onClick={() => {
//         props.dispatch({ type: "count/add" });
//       }}
//     >
//       +
//     </button>
//     <button
//       key="addAfter1Second"
//       onClick={() => {
//         props.dispatch({ type: "count/addAfter1Second" });
//       }}
//     >
//       async +
//     </button>
//     <button
//       key="minus"
//       onClick={() => {
//         props.dispatch({ type: "count/minus" });
//       }}
//     >
//       -
//     </button>
//   </div>
// ));

// // 4. Router
// app.router(() => <App />);

// // 5. Start
// app.start('#root');
