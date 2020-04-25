const initialState = {
  update: ""
};

export default (state = initialState, action) => {
  console.log("PAYLOAD", action);
  console.log("STATE", state);
  switch (action.type) {
    case 'UPDATE_STATE':
      return {
        ...state,
        update: action.state.update

      };
    default:
      return state;
  }
}