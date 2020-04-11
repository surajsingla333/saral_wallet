import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import Cookies from 'js-cookie';

import { activateAccount } from '../../../../../API/src/activation/activate';
import { revealAccount } from '../../../../../API/src/reveal/reveal';
import { decryptKeys } from '../../../../../API/src/encryption/decryptAES';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: Cookies.get('name'),
      network: props.network
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("IN BODY PROPS", this.props);

    }, 500);

  }

  activate(e) {
    e.preventDefault();

    var pass = Cookies.get('password');

    var public_key = decryptKeys(Cookies.get('publicKey'), pass)
    var private_key = decryptKeys(Cookies.get('privateKey'), pass)

    var activatedRes = activateAccount(public_key, private_key, Cookies.get('pkh'), Cookies.get('storeType'), this.props.network);

    if (activatedRes) {
      this.setState({
        activated: true
      })

      this.props.changeActivationStatus(this.state)
    }
    else {
      console.log("Error In Activation");
      this.setState({
        activated: false
      })
    }

  }

  reveal(e) {
    e.preventDefault();

    var pass = Cookies.get('password');

    var public_key = decryptKeys(Cookies.get('publicKey'), pass)
    var private_key = decryptKeys(Cookies.get('privateKey'), pass)

    var revealedRes = revealAccount(public_key, private_key, Cookies.get('pkh'), Cookies.get('storeType'), this.props.network);

    if (revealedRes) {

      this.setState({
        revealed: true
      })

      this.props.changeRevealStatus(this.state)
    }

    else {
      console.log("Error In Reveal");
      this.setState({
        revealed: false
      })
    }

  }

  render() {
    return (
      <div style={{ backgroundColor: "#ad62aa", padding: '10px' }}>
        {this.props.children}

        {Cookies.get("pkh")}
        {this.buttons()}

      </div>
    );
  }

  buttons() {
    if (Cookies.get("name")) {
      return (
        <div>
          <Button variant="primary" ref="method" value="Json" onClick={this.activate.bind(this)}>
            Activate Account
        </Button>
          <Button variant="primary" ref="method" value="Json" onClick={this.reveal.bind(this)}>
            Reveal Account
        </Button>
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    count: state.count.file,
    file: state.file.file,
    public: state.saveWallet.public,
    private: state.saveWallet.private,
    pkh: state.saveWallet.pkh,
    mnemonic: state.saveWallet.mnemonic,
    storeType: state.saveWallet.storeType,
    hashArray: state.saveWallet.hashArray,
    network: state.getNetwork.network
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeActivationStatus: (newState) => dispatch({ type: "ACTIVATE_ACCOUNT", state: newState }),
    changeRevealStatus: (newState) => dispatch({ type: "REVEAL_ACCOUNT", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
