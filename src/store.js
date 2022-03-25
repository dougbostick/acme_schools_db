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

export const addCampus = (name, address) => {
  return async () => {
    try {
      const response = await axios.post("/api/campus", {
        name,
        address,
      });
      const data = response.data;
      console.log("addcampus thunk data", data);
      store.dispatch({ type: "ADD_CAMPUS", data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addStudent = (firstName, lastName, email) => {
  return async () => {
    try {
      const response = await axios.post("/api/students", {
        firstName,
        lastName,
        email,
      });
      const data = response.data;
      store.dispatch({ type: "ADD_STUDENT", data });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  students: [],
  campus: [],
  loadedStudents: false,
  loadedCampus: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENTS":
      state = { ...state, students: action.students, loadedStudents: true };
      console.log("studnt case state", state);
      return state;
    case "CAMPUS":
      state = { ...state, campus: action.campus, loadedCampus: true };
      console.log("campus case state", state);
      return state;
    case "ADD_CAMPUS":
      console.log("add campus case", action);
      state = { ...state, campus: [...state.campus, action.data] };
      return state;
    case "ADD_STUDENT":
      state = { ...state, students: [...state.students, action.data] };
      return state;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
