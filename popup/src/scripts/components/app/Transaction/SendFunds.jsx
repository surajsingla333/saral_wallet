import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

import Cookies from 'js-cookie'

import { activateAccount } from '../../../../../../API/src/activation/activateFundraiser'
import { revealAccount } from '../../../../../../API/src/reveal/reveal'
import { sendTransaction } from '../../../../../../API/src/transfer/send'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'

import { accountBalance } from '../../../../../../API/src/retrieveFunds/index'

import Home from '../StartUp/Home';

class SendFunds extends Component {
  constructor (props) {
    super(props)

    this.state = {
      account: Cookies.get('name'),
    }
  }

  componentDidMount () {
    console.log('IN SENDFUNDS PROPS', this.props)
  }

  send (e) {
    e.preventDefault()

    var toAccount = this.refs.to.value;
    var am = this.refs.value.value;
    var amount = am * 10**6;

    var pass = Cookies.get('password')

    var public_key = decryptKeys(Cookies.get('publicKey'), pass)
    var private_key = decryptKeys(Cookies.get('privateKey'), pass)

    console.log(toAccount, amount, pass, public_key, private_key)

    setTimeout(async () => {
      var activatedRes = await sendTransaction(
        public_key.toString(),
        private_key.toString(),
        Cookies.get('pkh').toString(),
        Cookies.get('storeType').toString(),
        toAccount.toString(),
        parseInt(amount)
      )

      console.log("SEND RESULT", activatedRes)

      if (activatedRes.status) {
        this.setState({
          valueSent: true
        })

        // this.props.changeActivationStatus(this.state)
      } else {
        console.log('Error In Activation')
        this.setState({
          valueSent: false
        })
      }

    }, 200)
  }

  render () {

    if(this.state.valueSent){
      this.state.valueSent = false;
      return(
        <Home />
      )
    }

    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
              <Card.Subtitle className='mb-2 text-muted'>
                Send Amount (Updated amount will be reflected after txn confirmation)
              </Card.Subtitle>
              <Card.Text>
                <Form onSubmit={this.send.bind(this)}>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Receiver</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Receiver PKH'
                      ref='to'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type='integer'
                      placeholder='Enter tez to send'
                      ref='value'
                    />
                  </Form.Group>
                  <Button
                    type='submit'
                    variant='primary'
                    ref='method'
                    value='activate'
                  >
                    Transfer
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    count: state.count.file,
    file: state.file.file,
    public: state.saveWallet.public,
    private: state.saveWallet.private,
    pkh: state.saveWallet.pkh,
    mnemonic: state.saveWallet.mnemonic,
    storeType: state.saveWallet.storeType,
    hashArray: state.saveWallet.hashArray,
    network: state.getNetwork.network
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeActivationStatus: newState =>
      dispatch({ type: 'ACTIVATE_ACCOUNT', state: newState }),
    changeRevealStatus: newState =>
      dispatch({ type: 'REVEAL_ACCOUNT', state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFunds)

// camera shop kitchen nuclear mass news brick half beach outer shield chat blame host gap
// ruplxuwv.edfqicqp@tezos.example.org
// qpUcKjxOAI
//   "secret": "fa8e481afc56cc020ae027b7d0bcf732e539c360",
// "amount": "7483770027",
// "pkh": "tz1Uy5NhhNkH9R7E5hrCJ9agLYAXud5gqAVQ",
