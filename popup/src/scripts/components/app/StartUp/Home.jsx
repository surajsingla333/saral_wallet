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
  }


  render() {

    console.log("STATE", this.state);
    // if (this.state.loggedIn) {
    //   return (<Body />)
    // }

    return (
      <div>
        {this.mainCard()}
        {this.renderOption(this.state.option)}
      </div>
    );
  }

  mainCard(){
    
    <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{Cookies.get('name')}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{Cookies.get('pkh')}</Card.Subtitle>
            <Card.Text>

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
  }

  renderOption(option) {
    if (!option) {
      return <div></div>
    }
    const HomeOption = HomeOptions[option];

    return <HomeOption />
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
7