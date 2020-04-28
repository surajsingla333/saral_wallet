import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'

import { initAccount } from '../../../../../../API/src/registration/loadWallet'
import { calling } from '../../../../../../API/src/TESTING/send'

import * as Signups from '../Registration/index'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      option: ''
    }
  }

  render() {
    console.log('STATE', this.state.option)

    return (
      <div>
        {this.card()}
        {this.renderOption(this.state.option)}
      </div>
    )
  }

  card() {
    if (!this.state.option) {
      return (
        <Card style={{ margin: '20px', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>Choose Registration</Card.Title>
            <Card.Text>
              <Container>
                <Row className='mb-2 text-muted'><h5>Fundraiser Wallets</h5></Row>
                <Row>
                  <Col style={{ fontSize: '15px' }}>
                    <Button
                      variant='primary'
                      ref='method'
                      value='Mnemonic'
                      onClick={e => {
                        this.setState({ option: 'MnemonicFundraiser' })
                      }}
                    >
                      With Mnemonic
                    </Button>
                  </Col>
                  <Col style={{ fontSize: '15px' }}>
                    <Button
                      variant='primary'
                      ref='method'
                      value='Json'
                      onClick={e => {
                        this.setState({ option: 'Json' })
                      }}
                    >
                      With JSON
                    </Button>
                  </Col>
                </Row>
                <hr></hr>
                <Row className='mb-2 text-muted'><h5>Mnemonic Wallets</h5></Row>
                <Row>
                  <Col style={{ fontSize: '15px' }}>
                    <Button
                      variant='primary'
                      ref='method'
                      value='New'
                      onClick={e => {
                        this.setState({ option: 'New' })
                      }}
                    >
                      New Wallet
                    </Button>
                  </Col>
                  <Col style={{ fontSize: '15px' }}>
                    <Button
                      variant='primary'
                      ref='method'
                      value='Mnemonic'
                      onClick={e => {
                        this.setState({ option: 'Mnemonic' })
                      }}
                    >
                      With Mnemonic
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      )
    } else {
      return <div></div>
    }
  }

  renderOption(option) {
    if (!option) {
      return <div></div>
    }
    const Signup = Signups[option]

    return <Signup />
  }
}

const mapStateToProps = state => {
  return {
    count: state.count.file,
    file: state.file.file
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeWallet: newState => dispatch({ type: 'SAVE_FILE', state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
