const initialState = {
  bodyContent: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_BODY':
      console.log("PAYLOAD", action);
      console.log("STATE", state);
      return {
        ...state,
        bodyContent: action.state.bodyContent
      };
    default:
      return state;
  }
}