const initialState = {
  public: "",
  private: "",
  pkh: "",
  mnemonic: "",
  storeType: '',
  activated: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_ACCOUNT':
      console.log("IN SAVE_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);
      if(action.state.activated == true){
        return {
          ...state,
          public: action.state.public,
          private: action.state.private,
          pkh: action.state.pkh,
          mnemonic: action.state.mnemonic,
          storeType: action.state.storeType,
          activated: true,
        };
      }

      else{
        return {
          ...state,
          public: action.state.public,
          private: action.state.private,
          pkh: action.state.pkh,
          mnemonic: action.state.mnemonic,
          storeType: action.state.storeType,
          activated: false,
        };
      }
      s
    default:
      return state;
  }
}