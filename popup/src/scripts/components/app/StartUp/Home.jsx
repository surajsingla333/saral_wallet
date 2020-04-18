import React, { Component } from 'react';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { initAccount } from '../../../../../../API/src/registration/loadWallet';
import { calling } from '../../../../../../API/src/TESTING/send';

import { checkHash } from '../../../../../../API/src/encryption/encryptBcrypt';
import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES';
import Body from '../Body';

import * as HomeOptions from '../Transaction/index';


import Cookies from 'js-cookie';


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      stored: null,
      result: null,
      option: null,
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
    console.log("PROPS IN HOME", this.props);
  }

  settingHomeBase(){

    console.log("IN SETTING BASE");

    this.setState({
      option: null
    })
  }

  render() {

    console.log("STATE IN HOME", this.state);
    console.log("Props IN HOME", this.props);
    // if (this.state.loggedIn) {
    //   return (<Body />)
    // }
// No Option
    if(this.props.changeOptions === "No Option"){
      console.log("CHANGING OPTIONS")
      
      this.props.changeOptions = null;

      this.setState({
        option: null,
      })
      // this.state.;
    }

    return (
      <div>
        {this.mainCard()}
        {this.renderOption(this.state.option)}
      </div>
    );
  }

  mainCard() {
    if (!(this.state.option))
    {
      return (
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>NAME : {Cookies.get('name')}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{Cookies.get('pkh')}</Card.Subtitle>
              <Card.Text>
      {/* <h2>{this.props.balance}</h2> */}

                <Container>
                  <Row>
                    <Button variant="primary" onClick={(e) => { this.setState({ option: "SendFunds" }) }}>
                      Send Tez
                  </Button>
                  </Row>
                  <Row>
                    <Button variant="primary" onClick={(e) => { this.setState({ option: "Activate" }) }}>
                      Activate Account
                  </Button>
                  </Row>
                  <Row>
                    <Button variant="primary" onClick={(e) => { this.setState({ option: "Reveal" }) }}>
                      Reveal Account
                  </Button>

                  </Row>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )
    }
  }

  renderOption(option) {
    if (!option) {
      return <div></div>
    }
    else {
      const HomeOption = HomeOptions[option];

      return <HomeOption />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.getLocalStorage,
    public: state.saveWallet.public,
    private: state.saveWallet.private,
    pkh: state.saveWallet.pkh,
    mnemonic: state.saveWallet.mnemonic,
    storeType: state.saveWallet.storeType,
    hashArray: state.saveWallet.hashArray,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeWallet: (newState) => dispatch({ type: "SAVE_FILE", state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
7