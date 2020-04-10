const initialState = {
  // public: "",
  // private: "",
  // pkh: "",
  // mnemonic: "",
  hashArray: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_WALLET':
      console.log("IN SAVE_WALLET");
      console.log("PAYLOAD", action);
      console.log("STATE", state);

      var newState = {
        ...state,
        public: action.state.public,
        private: action.state.private,
        pkh: action.state.pkh,
        mnemonic: action.state.mnemonic,
        hashArray: action.state.hashArray,
        storeType: action.state.storeType,
      };

      var data = {
        passwordHash: newState.hashArray[0],
        salt: newState.hashArray[1],
        listAccountsNames: ['ACCOUNT 1'],
        accounts: [
          {
            name: "ACCOUNT 1",
            pkh: newState.pkh,
            public: newState.public,
            private: newState.private,
            mnemonic: newState.mnemonic,
            storeType: newState.storeType,
            active: {
              "https://tezos-dev.cryptonomic-infra.tech:443/": false,
              "https://conseil-dev.cryptonomic-infra.tech:443/": false
            },
            reveal: {
              "https://tezos-dev.cryptonomic-infra.tech:443/": false,
              "https://conseil-dev.cryptonomic-infra.tech:443/": false
            }
          }
        ]
      }

      localStorage.setItem("DATA", JSON.stringify(data));

      return newState;

    default:
      return state;
  }
}