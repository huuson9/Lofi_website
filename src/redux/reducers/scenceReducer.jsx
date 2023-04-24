import { SET_SCENCE } from "../constantsType/actionType";

const INITIAL_STATE = {
  mode: "day",
};

const scenceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SCENCE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
};

export default scenceReducer;
