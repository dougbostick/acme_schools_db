import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

export const getStudents = () => {
  return async () => {
    try {
      const response = await axios.get("/api/students");
      const data = response.data;
      console.log("thunk response", data);
      store.dispatch({ type: "STUDENTS", students: data });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = { students: [], campuses: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENTS":
      state = { students: action.students };
      console.log("redux state", state);
      return state;
    case "CAMPUSES":
      state = { campuses: action.campuses };
      return state;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
