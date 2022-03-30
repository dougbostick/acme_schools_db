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

export const deleteCampus = (id) => {
  return async () => {
    await axios.delete(`/api/campus/${id}`);
    store.dispatch({ type: "DELETE_CAMPUS", id });
  };
};

export const deleteStudent = (id) => {
  return async () => {
    await axios.delete(`/api/students/${id}`);
    store.dispatch({ type: "DELETE_STUDENT", id });
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

export const updateCampus = (campus, history) => {
  return async () => {
    const response = await axios.put(`/api/campus/${campus.id}`, campus);
    const updated = response.data;
    console.log("updated", updated);
    store.dispatch({ type: "UPDATE_CAMPUS", updated });
    history.push("/campuses");
  };
};

export const updateStudent = (student, history) => {
  return async () => {
    const response = await axios.put(`/api/student/${student.id}`, student);
    const updated = response.data;
    store.dispatch({ type: "UPDATE_STUDENT", updated });
    history.push("/students");
  };
};

export const unregister = (student, history) => {
  const id = student.campusId;
  return async (dispatch) => {
    const response = await axios.put(
      `/api/student/unresgister/${student.id}`,
      student
    );
    const unregistered = response.data;
    console.log("unregistered", unregistered);
    dispatch({ type: "UNREGISTER", unregistered });
    history.push(`/campuses`);
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
    case "DELETE_CAMPUS":
      const filteredCampus = state.campus.filter(
        (campus) => campus.id !== action.id
      );
      state = { ...state, campus: filteredCampus };
      return state;
    case "DELETE_STUDENT":
      const filteredStudents = state.students.filter(
        (student) => student.id !== action.id
      );
      state = { ...state, students: filteredStudents };
      return state;
    case "UPDATE_CAMPUS":
      const updatedCampus = state.campus.map((campus) =>
        campus.id === action.updated.id ? action.updated : campus
      );
      state = { ...state, campus: updatedCampus };
      return state;
    case "UPDATE_STUDENT":
      const updatedStudent = state.students.map((student) =>
        student.id === action.updated.id ? action.updated : student
      );
      state = { ...state, students: updatedStudent };
      return state;
    case "UNREGISTER":
      const target = state.students.map((student) =>
        student.id === action.unregistered.id ? action.unregistered : student
      );
      state = { ...state, students: target };
      console.log("ungerister state", state);
      return state;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
