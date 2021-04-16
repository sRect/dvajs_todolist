## dvajs

### 1. 项目结构
```
├── node_modules
├── package.json
├── public
|  ├── favicon.ico
|  ├── index.html
|  ├── logo192.png
|  ├── logo512.png
|  ├── manifest.json
|  └── robots.txt
├── README.md
├── src
|  ├── components
|  |  ├── Addtodo.js
|  |  └── TodoListItem.js
|  ├── index.js
|  ├── models
|  |  ├── count.js
|  |  └── todos.js
|  ├── router.js
|  └── routes
|     ├── Count.js
|     └── Todos.js
└── yarn.lock
```

### 2. 入口`index.js`
```javascript
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
```

### 3. 路由`router.js`
```javascript
import { Route, Router, Switch, Link } from "dva/router";
import Todos from "./routes/Todos";
import Count from './routes/Count';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <>
        <Link to="/">home</Link> | <Link to="/count">count</Link>
        <Switch>
          <Route path="/" exact component={Todos} />
          <Route path="/count" exact component={Count} />
        </Switch>
      </>
    </Router>
  );
}

export default RouterConfig;
```

### 4. `models > count`模型
```javascript
const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
};

const countStore = {
  namespace: "count",
  state: {
    count: 1,
  },
  reducers: {
    add(state, { payload }) {
      return { count: state.count + (payload?.num || 1) };
    },
    minus(state) {
      return { count: state.count - 1 };
    },
  },
  effects: {
    // 异步添加
    *asyncAdd({ payload }, effect) {
      const { call, put } = effect;

      yield call(delay, 1000);
      yield put({ type: "add", payload });
    },
  },
  // 订阅
  subscriptions: {
    setup(props) {
      const { history, dispatch } = props;
      return history.listen(({ pathname }) => {
        if (pathname === "/count") {
          alert("subscriptions");
          dispatch({
            type: "asyncAdd",
            payload: {
              num: 1,
            },
          });
        }
      });
    },
  },
};

export default countStore;
```

### 5. `routes > Count`页面
```javascript
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

```