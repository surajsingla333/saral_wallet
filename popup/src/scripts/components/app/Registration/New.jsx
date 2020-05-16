import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { generateAccount } from '../../../../../../API/src/registration/generateWallet';
import { calling } from '../../../../../../API/src/TESTING/send';
import Password from './Password';
import LandingPage from '../StartUp/Signup';


class New extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      stored: null,
      result: null,
      error: false,
      public: "",
      private: "",
      pkh: "",
      mnemonic: "",
      gotoPassword: false
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

    // console.log("Getting from form", this.refs.mnemonic);

    // var k = this.refs.mnemonic.value;

    // console.log(k.toString());


    // this.props.dispatch({
    //   type: "SAVE_FILE"
    // })
    // localStorage.setItem("File Stored", "this.refs.file.files[0]")
    // chrome.storage.local.set({"FILE3": this.refs.file.files[0]})
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

    setTimeout(async () => {


      console.log("GOT NO MNEMONIC")

      // this.state.file = rr;

      console.log("CLICKED");

      let result = await generateAccount("", "New Wallet");

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
          mnemonic: result.mnemonic,
          storeType: result.storeType,
          gotoPassword: true,
          activated: true
        })
        // this.state.public = result.publicKey;
        // this.state.private = result.privateKey;
        // this.state.pkh = result.publicKeyHash;
        // this.state.mnemonic = result.mnemonic;
        // this.state.gotoPassword = true;

        console.log("SENDING", this.state);
        this.props.makeNewWallet(this.state)
      }
      else if (typeof (result) === 'string') {
        this.state.error = true;
      }
      else{
        this.state.error = true;
      }
    }, 500)
    
  }

  // createWallet(e) {
  //   e.preventDefault();
  //   console.log(this.refs.file);
  //   console.log(this.refs.file.files);
  //   console.log(this.refs.file.files[0]);
  //   var k = this.refs.file.files[0];
  //   console.log(k.toString());
  //   console.log(k.name);

  //   let reader = new FileReader();

  //   reader.readAsText(k);

  //   let rr;

  //   reader.onload = function () {
  //     rr = reader.result;
  //     console.log(rr);
  //   }

  //   setTimeout(() => {

  //     console.log("GOT RR", rr)

  //     this.state.file = rr;

  //     console.log("CLICKED");
  //     console.log(this.state);
  //     console.log("RR", rr);
  //     this.props.makeNewWallet(this.state);

  //     let obj = JSON.parse(rr);
  //     localStorage.setItem("USER WALLET", rr);

  //   }, 500)
  // }

  render() {
    console.log("IN RENDER", this.state);
    if (this.state.error === true) {
      this.state.error = false;
      alert("WRONG JSON FILE");
      <LandingPage/>
    }
    else if (this.state.gotoPassword === true) {
      this.state.gotoPassword = false;
      return (
        <Password />
      )
      // alert("WRONG JSON FILE");
    }
    return(
      <div>LOADING...</div>
    )
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
    makeNewWallet: (newState) => dispatch({ type: "SAVE_ACCOUNT", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
