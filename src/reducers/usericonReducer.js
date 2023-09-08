// eslint-disable-next-line
import { SET_PROGRESS } from "../actionTypes/actionTypes";

// Define your initial state
const initialState = {
  progress: 20,
};

// Define your reducer function
const usericonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROGRESS":
      return {
        ...state,
        progress: state.progress + 20,
      };
    default:
      return state;
  }
};

export default usericonReducer;
