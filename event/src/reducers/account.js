const initialState = {
  public: "",
  private: "",
  pkh: "",
  mnemonic: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_ACCOUNT':
      console.log("IN SAVE_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);
      return {
        ...state,
        public: action.state.public,
        private: action.state.private,
        pkh: action.state.pkh,
        mnemonic: action.state.mnemonic
      };
    default:
      return state;
  }
}