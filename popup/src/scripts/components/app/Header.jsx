import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

import { Container, Row, Col, Button, Form, ButtonGroup, ToggleButton, Navbar, NavDropdown, Nav, Dropdown, DropdownType, DropdownButton } from 'react-bootstrap';

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

  render() {
    return (
      <Container>
        <Row className="header">
          {/* <div className="logo"></div> */}
          <Col md={{ span: 6, offset: 3 }}>
            <h6>SARAL WALLET</h6>
            {this.networkOptions()}
          </Col>
        </Row>
      </Container>
    );
  }

  networkOptions() {
    if (Cookies.get('name')) {
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
            changeNetwork: (newNetwork) => dispatch({ type: "CHANGE_NETWORK", state: newNetwork })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);