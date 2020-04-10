const initialState = {
  currentNet: "",
  currentAccountName: "",
  activated: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVATE_ACCOUNT':
      console.log("IN ACTIVATE_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);

      var newState = {
        ...state,
        currentNet: action.state.network,
        currentAccountName: action.state.account,
        activated: action.state.activated
      };

      var stored = JSON.parse(localStorage.getItem("DATA"));

      stored.accounts[stored.listAccountsNames.indexOf(this.newState.currentAccountName)].activate[`${this.newState.currentNet}`] = true;

      localStorage.setItem("DATA", JSON.stringify(stored));

      // var id = `ACCOUNT ${stored.listAccountsNames.length + 1}`;

      // var data = {
      //   name: id,
      //   pkh: newState.pkh,
      //   public: newState.public,
      //   private: newState.private,
      //   mnemonic: newState.mnemonic,
      //   active: {
      //     "https://tezos-dev.cryptonomic-infra.tech:443/": false,
      //     "https://conseil-dev.cryptonomic-infra.tech:443/": false
      //   },
      //   reveal: {
      //     "https://tezos-dev.cryptonomic-infra.tech:443/": false,
      //     "https://conseil-dev.cryptonomic-infra.tech:443/": false
      //   }
      // }

      // stored.listAccountsNames.push(id);
      // stored.accounts.push(data);

      // localStorage.setItem("DATA", JSON.stringify(stored));

      return newState;

    default:
      return state;
  }
}