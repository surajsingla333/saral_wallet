import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

import { Container, Row, Col, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { decryptKeys } from '../../../../../API/src/encryption/decryptAES';
// import '../../../styles/content/Header/index.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: props
    }

  }

  componentDidMount() {

    console.log("NETWORK IS:", this.props.network);
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);


  }

  onRadioChange(e) {
    console.log(e.target.value);
    console.log(e.target);
    // console.log(e.target.variant);
    // e.target.variant = "success";
    Cookies.set('network', e.target.value);
    this.setState({ network: e.target.value });
    this.props.changeNetwork(this.state.network);
  }

  onRadioChangeAccount(e) {
    e.preventDefault(e);
    console.log(e.target.value);
    console.log(e.target.val2);
    console.log(e.target);

    var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
    var stored = JSON.parse(localStorage.getItem('DATA'));

    var changedAccount = stored.accounts[stored.listAccountsNames.indexOf(e.target.value)];

    var p = Cookies.get("password");
    var pkh = decryptKeys(changedAccount.pkh, p);

    Cookies.set("password", p, {
      expires: inThirtyMinutes
    });
    Cookies.set("pkh", pkh, {
      expires: inThirtyMinutes
    });
    Cookies.set("publicKey", changedAccount.public, {
      expires: inThirtyMinutes
    });
    Cookies.set("privateKey", changedAccount.private, {
      expires: inThirtyMinutes
    });
    Cookies.set("name", e.target.value, {
      expires: inThirtyMinutes
    });
    Cookies.set("storeType", changedAccount.storeType, {
      expires: inThirtyMinutes
    });


    console.log("UPDATING HOME FROM HEADER");
    this.props.updateHome();
  
  }

  render() {

    var listOfAccounts = [];
    
    var storage = JSON.parse(localStorage.getItem('DATA'));

    if (storage) {
      var accounts = storage.listAccountsNames;

      listOfAccounts = accounts.map((account, key) =>

        <option key={key} val2={key} value={account}>
          {account}
        </option>
      )
    }

    return (
      <Container style={{backgroundColor:"blue", padding: '15px', textAlign:"center"}}>
        <Row className="header">
          <Col>
            <Button type="secondary" onClick={this.props.backHome}>Back</Button>
          </Col>
          <Col style={{textAlign:"center"}}>
            <h6>SARAL WALLET</h6>
          </Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
        {this.networkOptions(listOfAccounts)}
        </Row>
      </Container>
    );
  }

  networkOptions(accounts) {
    if (Cookies.get('name')) {
      // console.log("ACCOUNTs", accounts);
      return (
        <Container>
          <Row>
            <Col>
              <Form onChange={this.onRadioChange.bind(this)}>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                  <Form.Control as="select" value={Cookies.get("network")} size="sm" custom>
                    <option value="carthagenet">Carthagenet TestNet</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <Form onChange={this.onRadioChangeAccount.bind(this)}>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                  <Form.Control as="select" value={Cookies.get("name")} size="sm" custom>
                    {accounts}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <DropdownButton size="sm" title="Acc">
                <Dropdown.Item onClick={this.props.addAccount}>Add Account with pk</Dropdown.Item>
                <Dropdown.Item onClick={this.props.addFundraiserAccount}>Add Fundraiser Account with mnemonic</Dropdown.Item>
                <Dropdown.Divider />
              </DropdownButton>
            </Col>

          </Row>

        </Container>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    count: state.count.file,
    file: state.file.file,
    network: state.getNetwork.network,
    getLocalStorage: state.getLocalStorage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNetwork: newNetwork => dispatch({ type: "CHANGE_NETWORK", state: newNetwork })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);