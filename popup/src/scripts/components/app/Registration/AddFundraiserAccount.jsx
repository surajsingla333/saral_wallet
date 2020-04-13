import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { unlockFundraiserIdentity } from '../../../../../../API/src/generatefromMnemonic/account';
import { calling } from '../../../../../../API/src/TESTING/send';
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';
import Body from '../Body';
import Cookies from 'js-cookie';


class AddAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      click: false,
      error: false,
      public: "",
      private: "",
      pkh: "",
      mnemonic: "",
      gotoBody: false
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
    console.log("PROPS", this.props);
    console.log("COUNT", this.props.count);
    console.log("FILE", this.props.file);
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

  addAccount(e) {

    e.preventDefault();

    this.state.click = true;

    console.log("THIS PROPS", this.props);

    console.log("Getting from form", this.refs.privateKey);

    var k = this.refs.privateKey.value;
    var pass = this.refs.password.value;
    var email = this.refs.email.value;

    console.log(k.toString());


    // setTimeout(async () => {

    console.log("GOT PRIVATE KEY TO ADD", k)

    // this.state.file = rr;

    console.log("CLICKED");

    setTimeout(async () => {

      let result = await unlockFundraiserIdentity(k.toString(), email.toString(), pass.toString());
      // localStorage.setItem("USER WALLET", rr);
      console.log("result", result);
      console.log("result", typeof (result));

      if (typeof (result) === 'object') {

        var p = Cookies.get('password');
        
        console.log("PUBLICKEYHASH", result.publicKeyHash);
        console.log("PRIVATE", result.privateKey);
        console.log("PUBLIC", result.publicKey);

        var pub = encryptKeys(result.publicKey, p);
        var priv = encryptKeys(result.privateKey, p);
        var pkh2 = encryptKeys(result.publicKeyHash, p);
        var mnemo = encryptKeys(k.toString(), p);

        this.state.public = pub;
        this.state.private = priv;
        this.state.pkh = pkh2;
        this.state.mnemonic = mnemo;
        this.state.storeType = result.storeType;


        // this.state.public = result.publicKey;
        // this.state.private = result.privateKey;
        // this.state.pkh = result.publicKeyHash;
        // this.state.mnemonic = k.toString();
        // this.state.gotoBody = true;

        console.log("SENDING", this.state);

        this.props.addFundraiserAccWithMnemonic(this.state);

        var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

        Cookies.set("password", p, {
          expires: inThirtyMinutes
        });
        Cookies.set("pkh", result.publicKeyHash, {
          expires: inThirtyMinutes
        });
        Cookies.set("publicKey", pub, {
          expires: inThirtyMinutes
        });
        Cookies.set("privateKey", priv, {
          expires: inThirtyMinutes
        });
        Cookies.set("name", `ACCOUNT ${(this.props.data.listAccountsNames.length) + 1}`, {
          expires: inThirtyMinutes
        });
        Cookies.set("storeType", result.storeType, {
          expires: inThirtyMinutes
        });

        this.setState({
          gotoBody: true,
        });

      }
      else if (typeof (result) === 'string') {
        this.state.error = true;
      }
      else {
        this.state.error = true;
      }
    }, 500);

    // }, 500)



    // this.props.dispatch({
    //   type: "SAVE_FILE"
    // })
    // localStorage.setItem("File Stored", "this.refs.file.files[0]")
    // chrome.storage.local.set({"FILE3": this.refs.file.files[0]})
  }


  gotoPass() {
    this.setState({ gotoBody: true });
  }

  render() {
    console.log("IN RENDER", this.state);

    if (this.state.error === true) {
      this.state.error = false;
      alert("WRONG JSON FILE");
      return (
        <div>
          {this.main()}
        </div>
      );
    }

    else if (this.state.gotoBody === true) {
      this.state.gotoBody = false;
      console.log("GOING TO PASWORD")
      return (
        <Body />
      )
      // alert("WRONG JSON FILE");
    }
    else if (this.state.click === false) {
      console.log("IN ELSE");
      return (
        <div>
          {this.main()}
        </div>
      );

    }
  }

  main() {
    return (
      <Container>
        <Row>
        <Col>
        <h2>Enter mnemonic</h2>
        </Col>
        </Row>
        <Row>
          <Col>
        <Form onSubmit={this.addAccount.bind(this)}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="3" ref="privateKey" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref="email" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" ref="password" />
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
    data: state.getLocalStorage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFundraiserAccWithMnemonic: (newState) => dispatch({ type: "STORE_ACCOUNT", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);

// deputy kitten mobile since nest art jelly bubble truck ensure uphold parent artwork sweet approve blur spider trigger wealth travel margin north law soda


// search hawk raven mass lens goddess nice infant wrestle chaos air eagle throw person muscle
// xoxrntzn.itknteka@tezos.example.org
// Egfv8dVbfk