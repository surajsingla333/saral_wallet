import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { initAccount } from '../../../../../../API/src/registration/loadWallet';
import { calling } from '../../../../../../API/src/TESTING/send';
import { genHash, checkHash } from '../../../../../../API/src/encryption/encryptBcrypt';
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';
import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES';
import Body from '../Body';
import Cookies from 'js-cookie';

class Password extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      stored: null,
      result: null,
      ps: "",
      match: true,
      gotoBody: false,
    }
  }

  componentWillMount() {
    let stored = localStorage.getItem("USER WALLET");
    console.log("stored", stored);
    if (stored && stored !== "") {
      console.log("IN IF", !stored);
      console.log("IN IF 2", stored);
      this.state.stored = JSON.parse(stored);
      this.state.result = initAccount(this.state.stored);
    }
    console.log("state", this.state);
  }


  componentDidMount() {
    // this.setState({file: localStorage.getItem("File Storage")});
    // console.log(localStorage.getItem("File Storage"))
    setTimeout(() => {
      console.log("PROPS", this.props);
      console.log("COUNT", this.props.count);
      console.log("FILE", this.props.file);
    }, 1000);

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

  createWallet(e) {
    e.preventDefault();
    console.log(this.refs.file);
    console.log(this.refs.file.files);
    console.log(this.refs.file.files[0]);
    var k = this.refs.file.files[0];
    console.log(k.toString());
    console.log(k.name);

    let reader = new FileReader();

    reader.readAsText(k);

    let rr;

    reader.onload = function () {
      rr = reader.result;
      console.log(rr);
    }

    setTimeout(() => {

      console.log("GOT RR", rr)

      this.state.file = rr;

      console.log("CLICKED");
      console.log(this.state);
      console.log("RR", rr);
      this.props.makeWallet(this.state);

      let obj = JSON.parse(rr);
      localStorage.setItem("USER WALLET", rr);

    }, 500)
  }

  setPassword(e) {
    e.preventDefault();
    if (this.state.ps !== this.refs.repassword.value) {
      this.setState({ match: false });
      return "Different passwords"
    }
    else {
      console.log("PASSWORD SET");
      var p = this.state.ps;

      console.log("tHIS SET PASSWORD", this.props);

      var pub = encryptKeys(this.props.public, p);
      var priv = encryptKeys(this.props.private, p);
      var pkh2 = encryptKeys(this.props.pkh, p);
      var mnemo = encryptKeys(this.props.mnemonic, p);

      var hashAndSalt = genHash(p);

      this.setState({ private: priv, public: pub, pkh: pkh2, mnemonic: mnemo, hashArray: hashAndSalt, storeType: this.props.storeType, });

      setTimeout(() => {
        console.log("STATE AFTER ENCRYPTION", this.state);
        console.log("THIS PROPS INS SET PASSWORD", this.props);
        this.props.storeData(this.state);
        

        var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

        Cookies.set("password", p, {
          expires: inThirtyMinutes
        });
        Cookies.set("pkh", this.props.pkh, {
          expires: inThirtyMinutes
        });
        Cookies.set("publicKey", pub, {
          expires: inThirtyMinutes
        });
        Cookies.set("privateKey", priv, {
          expires: inThirtyMinutes
        });
        Cookies.set("name", "ACCOUNT 1", {
          expires: inThirtyMinutes
        });
        Cookies.set("storeType", this.props.storeType, {
          expires: inThirtyMinutes
        });

        this.setState({
          loggedIn: true,
          gotoBody: true
        })
      }, 200);

      // var r = genHash(p); // generating hash
      // console.log("res", r);
      // console.log("resPASS", r[0]);
      // console.log("resSALE", r[1]);
      // var z = checkHash(p, r[1]); // password, salt to check
      // console.log("DECRYPT", z);

      // var m = encryptKeys(p);
      // console.log("AES ENCRYPT", m);

      // var k = decryptKeys(m[0]);
      // var l = decryptKeys(m[1]);
      // console.log("AES DECRYPT", k, "\n", l);
    }

  }

  render() {
    if (this.state.gotoBody && this.state.loggedIn) {
      this.state.gotoBody = false;
      return (
        <Home />
      )
    }
    return (
      <Container>
        <Row>
        <Col>
        <Form onSubmit={this.setPassword.bind(this)}>
          <Form.Group controlId="input">
            <Form.Label>Enter your password</Form.Label>
            <Form.Control type="password" ref="password" placeholder="Your password" onBlur={(e) => { this.setState({ ps: this.refs.password.value }) }} />
          </Form.Group>
          <Form.Group controlId="input">
            <Form.Label>Re-enter your password</Form.Label>
            <Form.Control type="password" ref="repassword" placeholder="Must be same as above" onBlur={(e) => {
              if (this.refs.repassword.value === this.state.ps) {
                this.setState({ match: true })
                console.log("CORRECT", this.state);
              }
              else {
                this.setState({ match: false })
                console.log("WRONG", this.state);
              }
            }} />
            {!(this.state.match) ?
              <Form.Control.Feedback>Password does not match</Form.Control.Feedback> : <div></div>
            }
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
  </Button>
        </Form>
        </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count.file,
    file: state.file.file,
    public: state.account.public,
    private: state.account.private,
    pkh: state.account.pkh,
    mnemonic: state.account.mnemonic,
    storeType: state.account.storeType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (newState) => dispatch({ type: "SAVE_WALLET", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);
