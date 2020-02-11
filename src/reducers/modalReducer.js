const initialState = {
  show: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL_SHOW":
      return {
        ...state,
        show: action.payload
      };
    case "MODAL_HIDE":
      return {
        ...state,
        show: action.payload
      };
    default:
      return state;
  }
};
export default modalReducer;
