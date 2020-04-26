const initialState = {
  currentAccount: ""
};

export default (state = initialState, action) => {
  console.log("PAYLOAD", action);
  console.log("STATE", state);
  switch (action.type) {
    case 'SEND_ACCOUNT':
      return {
        ...state,
        currentAccount: action.state.pkh,
      };
    default:
      return state;
  }
}