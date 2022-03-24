import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

export const getStudents = () => {
  return async () => {
    try {
      const response = await axios.get("/api/students");
      const data = response.data;
      console.log("student thunk response", data);
      store.dispatch({ type: "STUDENTS", students: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCampus = () => {
  return async () => {
    try {
      const response = await axios.get("/api/campus");
      const data = response.data;
      console.log("campus thunk", data);
      store.dispatch({ type: "CAMPUS", campus: data });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = { students: [], campus: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENTS":
      state = { ...state, students: action.students };
      console.log("studnt case state", state);
      return state;
    case "CAMPUS":
      state = { ...state, campus: action.campus };
      console.log("campus case state", state);
      return state;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
