import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { initAccount } from '../../../../../../API/src/registration/loadWallet';
import { calling } from '../../../../../../API/src/TESTING/send';

import * as Signups from '../Registration/index';

class Reveal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      stored: null,
      result: null,
      option: '',
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
    // this.props.dispatch({
    //   type: "SAVE_FILE"
    // })
    // localStorage.setItem("File Stored", "this.refs.file.files[0]")
    // chrome.storage.local.set({"FILE3": this.refs.file.files[0]})
  }



  render() {

    console.log("STATE", this.state.option);

    return (
      <div>
        {this.card()}
        {this.renderOption(this.state.option)}
        <Button variant="primary" onClick={(e) => { this.setState({ option: "" }) }}>
              Back
            </Button>
      </div>
    );
  }

  card() {
    if(!(this.state.option)){
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Saral Wallet</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Choose Registration</Card.Subtitle>
          <Card.Text>
            <Button variant="primary" ref="method" value="Mnemonic" onClick={(e) => { this.setState({ option: "Mnemonic" }) }}>
              With Mnemonic
            </Button>
            <Button variant="primary" ref="method" value="New" onClick={(e) => { this.setState({ option: "New" }) }}>
              New Wallet
            </Button>
            <Button variant="primary" ref="method" value="Json" onClick={(e) => { this.setState({ option: "Json" }) }}>
              With JSON File
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    );
    }
    else{
      return <div></div>
    }
  }

  renderOption(option) {
    if (!option) {
      return <div></div>
    }
    const Signup = Signups[option];

    return <Signup />
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
    makeWallet: (newState) => dispatch({ type: "SAVE_FILE", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reveal);
