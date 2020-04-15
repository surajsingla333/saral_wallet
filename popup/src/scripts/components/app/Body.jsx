import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

import Cookies from 'js-cookie';

import { activateAccount } from '../../../../../API/src/activation/activateFundraiser';
import { revealAccount } from '../../../../../API/src/reveal/reveal';
import { decryptKeys } from '../../../../../API/src/encryption/decryptAES';

import { accountBalance } from '../../../../../API/src/retrieveFunds/index';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: Cookies.get('name'),
      network: Cookies.get("network") || props.network
    };
  }

  componentWillMount() {
    setTimeout(async () => {
      var res = await accountBalance(this.state.network, Cookies.get('pkh'));
      console.log("ACCOUNT BALANCE: ", res);
    }, 500);

  }

  componentDidMount() {
    setTimeout(() => {
      console.log("IN BODY PROPS", this.props);

    }, 500);

  }

  activate(e) {
    e.preventDefault();

    var activSecret = this.refs.secret.value;
    var pass = Cookies.get('password');

    var public_key = decryptKeys(Cookies.get('publicKey'), pass);
    var private_key = decryptKeys(Cookies.get('privateKey'), pass);

    console.log(activSecret, pass, public_key, private_key);

    var activatedRes = activateAccount(public_key, private_key, Cookies.get('pkh'), Cookies.get('storeType'), activSecret, this.state.network);

    console.log(activatedRes);

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

    var revealedRes = revealAccount(public_key, private_key, Cookies.get('pkh'), Cookies.get('storeType'), this.state.network);

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
      <Container>
        <Row>
          <Col>
            {this.props.children}
          </Col>
        </Row>
        <Row>
          <Col>
            {Cookies.get("pkh")}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.buttons()}
          </Col>
        </Row>
      </Container>
    );
  }

  // main(){
  //   if(this.props.body){
  //     return(
  //       <Container>
  //         <Row>
  //         <Col>
  //           {Cookies.get("pkh")}
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col>
  //           {this.buttons()}
  //         </Col>
  //       </Row>
  //       </Container>
  //     )
  //   }
  // }

  buttons() {
    if (Cookies.get("name")) {
      return (

        <div>
          <Form onSubmit={this.activate.bind(this)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Secret</Form.Label>
              <Form.Control type="text" placeholder="Enter fundraiser secret" ref="secret" />
            </Form.Group>
            <Button type="submit" variant="primary" ref="method" value="activate">
              Activate Account
        </Button>
          </Form>
          <hr></hr>
          <Button variant="primary" ref="method" value="reveal" onClick={this.reveal.bind(this)}>
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


// camera shop kitchen nuclear mass news brick half beach outer shield chat blame host gap
// ruplxuwv.edfqicqp@tezos.example.org
// qpUcKjxOAI
//   "secret": "fa8e481afc56cc020ae027b7d0bcf732e539c360",
  // "amount": "7483770027",
  // "pkh": "tz1Uy5NhhNkH9R7E5hrCJ9agLYAXud5gqAVQ",