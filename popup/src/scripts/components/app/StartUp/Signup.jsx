import React, { Component } from 'react';
import { Card, Button, Container, Row, Col} from 'react-bootstrap';

import { connect } from 'react-redux';

import { initAccount } from '../../../../../../API/src/registration/loadWallet';
import { calling } from '../../../../../../API/src/TESTING/send';

import * as Signups from '../Registration/index';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      option: '',
    }
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
    if (!(this.state.option)) {
      return (
        <Card style={{ width: '18rem', margin: '20px' }}>
          <Card.Body>
            <Card.Title>Saral Wallet</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Choose Registration</Card.Subtitle>
            <Card.Text>
              <Container>
                <Row>
                  <Col>
                    <Button variant="primary" ref="method" value="Mnemonic" onClick={(e) => { this.setState({ option: "MnemonicFundraiser" }) }}>
                      With Mnemonic (Fundraiser [will require fundraiser email and password])
            </Button>
                  </Col>
                  <Col>
                    <Button variant="primary" ref="method" value="Mnemonic" onClick={(e) => { this.setState({ option: "Mnemonic" }) }}>
                      With Mnemonic (Normal wallet)
            </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="primary" ref="method" value="New" onClick={(e) => { this.setState({ option: "New" }) }}>
                      New Wallet (Mnemonic Wallet)
            </Button>
                  </Col>
                  <Col>
                    <Button variant="primary" ref="method" value="Json" onClick={(e) => { this.setState({ option: "Json" }) }}>
                      With JSON File (Fundraiser)
            </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
    else {
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
