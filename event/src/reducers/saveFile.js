const initialState = {
  file: "null"
};

export default (state = initialState, action) => {
  console.log("PAYLOAD", action);
  console.log("STATE", state);
  switch (action.type) {
    case 'SAVE_FILE':
      return {
        ...state,
        file: action.state.file

      };
    default:
      return state;
  }
}