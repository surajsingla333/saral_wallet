import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { initAccount } from '../../../../../../API/src/registration/loadWallet';
import { calling } from '../../../../../../API/src/TESTING/send';
import Password from './Password';


class Json extends Component {

  constructor(props) {
    super(props);

    this.state = {
      public: "",
      private: "",
      pkh: "",
      mnemonic: "",
      gotoPassword: false,
      error: false,
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

    setTimeout(async () => {

      console.log("GOT RR", rr)

      // this.state.file = rr;

      console.log("CLICKED");
      console.log(this.state);
      console.log("RR", rr);

      let obj = JSON.parse(rr);

      let result = await initAccount(obj);

      // localStorage.setItem("USER WALLET", rr);
      console.log("result", result);
      console.log("result", typeof (result));

      if (typeof (result) === 'object') {
        console.log("PUBLIC", result.publicKeyHash);
        console.log("PUBLIC", result.privateKey);
        console.log("PUBLIC", result.publicKey);

        this.setState({
          public: result.publicKey,
          private: result.privateKey,
          pkh: result.publicKeyHash,
          mnemonic: obj.mnemonic.join().split(",").join(" "),
          gotoPassword: true
        })

        console.log("SENDING", this.state);
        this.props.makeWallet(this.state)
      }
      else if (typeof (result) === 'string') {
        this.state.error = true;
      }
      else{
        this.state.error = true;
      }
    }, 500)



    // this.props.dispatch({
    //   type: "SAVE_FILE"
    // })
    // localStorage.setItem("File Stored", "this.refs.file.files[0]")
    // chrome.storage.local.set({"FILE3": this.refs.file.files[0]})
  }

  render() {
    // if (this.state.stored === null) {
    console.log("IN RENDER", this.state);
    if (this.state.error === true) {
      this.state.error = false;
      alert("WRONG JSON FILE");
    }
    else if (this.state.gotoPassword === true) {
      this.state.gotoPassword = false;
      return (
        <Password />
      )
      // alert("WRONG JSON FILE");
    }
    return (
      <div>
        <h1>{this.props.file}</h1>
        <h2>Add your address.json file to load your wallet address.</h2>
        <Form onSubmit={this.createWallet.bind(this)}>
          <Form.Group controlId="input">
            <Form.Control type="file" accept="application/JSON" ref="file" placeholder="Browse File" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
  </Button>
        </Form>
      </div>
    );
    // }
    // else if ((this.state.stored)) {
    //   return (

    //     <div>
    //       <h1>Account Loaded</h1>
    //       <p>Address : <span>{this.state.stored.pkh}</span></p>
    //     </div>
    //   );
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count.file,
    file: state.file.file
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeWallet: (newState) => dispatch({ type: "SAVE_ACCOUNT", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Json);
