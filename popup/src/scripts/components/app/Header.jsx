import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

import { Container, Row, Col, Button, Form, ButtonGroup, ToggleButton, Navbar, NavDropdown, Nav, Dropdown, DropdownType, DropdownButton } from 'react-bootstrap';
import {decryptKeys} from '../../../../../API/src/encryption/decryptAES';
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

  onRadioChangeAccount(e){
    e.preventDefault(e);
    console.log(e.target.value);
    console.log(e.target.val2);
    console.log(e.target);

    var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

    var changedAccount = this.props.getLocalStorage.accounts[this.props.getLocalStorage.listAccountsNames.indexOf(e.target.value)];

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


  }

  render() {


    var accounts = this.props.getLocalStorage.listAccountsNames;

    const listOfAccounts = accounts.map((account, key) =>

      <option key={key} val2={key} value={account}>
        {account}
      </option>
    )

    return (
      <Container>
        <Row className="header">
          <Col md={{ span: 10, offset: 1 }}>
            <h6>SARAL WALLET</h6>
            {this.networkOptions(listOfAccounts)}
          </Col>
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
                    <option value="https://tezos-dev.cryptonomic-infra.tech:443">Tezos Dev</option>
                    <option value="https://conseil-dev.cryptonomic-infra.tech:443">Conseil Dev</option>
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeNetwork: (newNetwork) => dispatch({ type: "CHANGE_NETWORK", state: newNetwork })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);