import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

class Body extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   count: 0
    // };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("IN BODY PROPS", this.props);

    }, 500);

  }

  render() {
    return (
      <div>
        <h1>Body</h1>
        {Cookies.get("pkh")}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    count: state.count.file,
    file: state.file.file,
    public: state.saveAccount.public,
    private: state.saveAccount.private,
    pkh: state.saveAccount.pkh,
    mnemonic: state.saveAccount.mnemonic,
    hashArray: state.saveAccount.hashArray,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     storeData: (newState) => dispatch({ type: "SAVE_DATA", state: newState })
//   }
// }

export default connect(mapStateToProps)(Body);
