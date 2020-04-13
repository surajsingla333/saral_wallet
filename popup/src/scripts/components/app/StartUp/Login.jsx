import React, { Component } from 'react';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { initAccount } from '../../../../../../API/src/registration/loadWallet';
import { calling } from '../../../../../../API/src/TESTING/send';

import { checkHash } from '../../../../../../API/src/encryption/encryptBcrypt';
import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES';
import Body from '../Body';

import * as Signups from '../Registration/index';

import Cookies from 'js-cookie';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      stored: null,
      result: null,
      option: '',
      loggedIn: false,
      passHash: "",
      salt: "",
    }
  }

  // componentWillMount() {
  //   let stored = localStorage.getItem("USER WALLET");
  //   console.log("stored", stored);
  //   if (stored && stored !== "") {
  //     console.log("IN IF", !stored);
  //     console.log("IN IF 2", stored);
  //     this.state.stored = JSON.parse(stored);
  //     this.state.result = initAccount(this.state.stored);
  //   }
  //   console.log("state", this.state);
  // }


  componentDidMount() {
    // this.setState({file: localStorage.getItem("File Storage")});
    // console.log(localStorage.getItem("File Storage"))
    console.log("PROPS", this.props);
    // console.log("COUNT", this.props.count);
    // console.log("FILE", this.props.file);

    // this.setState({
    this.state.passHash = this.props.data.passwordHash;
    this.state.salt = this.props.data.salt;
    // })

    console.log("STAE", this.state);
    //  


    calling();

    console.log(this.state.result);
    // let stored = localStorage.getItem("USER WALLET");
    // console.log("stored", stored);
    // if (stored !== "") {
    //   this.state.stored = JSON.parse(stored);
    // }
    // console.log("state", this.state);

    // alert(this.props.file);
  }

  login(e) {

    e.preventDefault();

    console.log("LOGGING IN");

    var password = this.refs.pass.value;

    console.log("PASSWORD", password);
    console.log("SALT", this.state.salt);
    console.log("PASSHASH", this.state.passHash);

    var hash = checkHash(password, this.state.salt);

    console.log("HASH", hash);

    if (hash === this.state.passHash) {

      var PKH = decryptKeys(this.props.data.accounts[0].pkh, password);

      var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

      Cookies.set("password", password, {
        expires: inThirtyMinutes
      });
      Cookies.set("pkh", PKH, {
        expires: inThirtyMinutes
      });
      Cookies.set("publicKey", this.props.data.accounts[0].public, {
        expires: inThirtyMinutes
      });
      Cookies.set("privateKey", this.props.data.accounts[0].private, {
        expires: inThirtyMinutes
      });
      Cookies.set("name", this.props.data.accounts[0].name, {
        expires: inThirtyMinutes
      });
      Cookies.set("storeType", this.props.data.accounts[0].storeType, {
        expires: inThirtyMinutes
      });

      this.setState({
        loggedIn: true,
      })

    }
    else {
      this.setState({
        loggedIn: false,
      })
    }

  }



  render() {

    console.log("STATE", this.state);
    if (this.state.loggedIn) {
      return (<Body />)
    }

    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Saral Wallet</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Choose Registration</Card.Subtitle>
            <Card.Text>

              <Container>
                <Row>
                  <Form onSubmit={this.login.bind(this)}>
                    <Form.Group controlId="input">
                      <Form.Label>Enter your password</Form.Label>
                      <Form.Control type="password" ref="pass" placeholder="Your password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                </Button>
                  </Form>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  // card() {
  //   return (
  //     <Card style={{ width: '18rem' }}>
  //       <Card.Body>
  //         <Card.Title>Saral Wallet</Card.Title>
  //         <Card.Subtitle className="mb-2 text-muted">Choose Registration</Card.Subtitle>
  //         <Card.Text>

  //           <Form onSubmit={this.login.bind(this)}>
  //             <Form.Group controlId="input">
  //               <Form.Label>Enter your password</Form.Label>
  //               <Form.Control type="password" ref="pass" placeholder="Your password" />
  //             </Form.Group>

  //             <Button variant="primary" type="submit">
  //               Submit
  //               </Button>

  //           </Form>
  //         </Card.Text>
  //       </Card.Body>
  //     </Card>
  //   );
  // }

  // renderOption(option) {
  //   if (!option) {
  //     return <div></div>
  //   }
  //   const Signup = Signups[option];

  //   return <Signup />
  // }
}

const mapStateToProps = (state) => {
  return {
    data: state.getLocalStorage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeWallet: (newState) => dispatch({ type: "SAVE_FILE", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
