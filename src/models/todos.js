import { nanoid } from "nanoid";

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })
}

const store = {
  namespace: "todos",
  state: [
    { id: 1, text: "hello", completed: true },
    { id: 2, text: "hwllo2", completed: false },
  ],
  reducers: {
    del(state, { payload: { id } }) {
      return state.filter((item) => item.id !== id);
    },
    add(state, { payload: { text } }) {
      return [...state, { id: nanoid(), text, completed: false }];
    },
    complete(state, { payload: { id } }) {
      return state.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
    },
  },
  effects: {
    *asyncAdd({ payload }, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: "add", payload });
    },
  },
};

export default store;