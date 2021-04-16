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
    *asyncAdd({ payload }, effect) {
      console.log(effect);
      const { call, put } = effect;

      yield call(delay, 1000);
      yield put({ type: "add", payload });
    },
  },
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
