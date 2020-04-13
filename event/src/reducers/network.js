const initialState = {
  network: `https://tezos-dev.cryptonomic-infra.tech:443`
};

// aaa3a4b2-059d-47c8-8d69-7ac3936f4411

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NETWORK':
      console.log("IN SAVE_ACCOUNT");
      console.log("PAYLOAD", action);
      alert(action);
      console.log("STATE", state);
      return {
        ...state,
        network: action.state
      };
    default:
      return state;
  }
}