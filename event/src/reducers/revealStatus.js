const initialState = {
  currentNet: "",
  currentAccountName: "",
  revealed: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REVEAL_ACCOUNT':
      console.log("IN REVEAL_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);

      var newState = {
        ...state,
        currentNet: action.state.network,
        currentAccountName: action.state.account,
        revealed: action.state.revealed
      };

      var stored = JSON.parse(localStorage.getItem("DATA"));

      stored.accounts[stored.listAccountsNames.indexOf(this.newState.currentAccountName)].reveal[`${this.newState.currentNet}`] = true;

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