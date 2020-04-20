import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

import Cookies from 'js-cookie'

import { activateAccount } from '../../../../../../API/src/activation/activateFundraiser'
import { revealAccount } from '../../../../../../API/src/reveal/reveal'
import { sendTransaction } from '../../../../../../API/src/transfer/send'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'

import { accountBalance } from '../../../../../../API/src/retrieveFunds/index'

class Activate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      account: Cookies.get('name'),
      network: Cookies.get('network') || props.network
    }
  }

  componentDidMount () {
    console.log('IN ACTIVATE PROPS', this.props)
  }

  activate (e) {
    e.preventDefault()

    var activSecret = this.refs.secret.value
    var pass = Cookies.get('password')

    var public_key = decryptKeys(Cookies.get('publicKey'), pass)
    var private_key = decryptKeys(Cookies.get('privateKey'), pass)

    console.log(activSecret, pass, public_key, private_key)

    console.log("STATE ACTIVE BEFORE ACTIVATION", this.state);

    setTimeout(async () => {
      var activatedRes = await activateAccount(
        public_key,
        private_key,
        Cookies.get('pkh'),
        Cookies.get('storeType'),
        activSecret
      )

      console.log('RETURN ACTIVATION RES', activatedRes)

      // if (activatedRes) {
      this.state.activated = activatedRes;

      console.log("STATE ACTIVE AFTER ACTIVATION", this.state);

      this.props.changeActivationStatus(this.state);
      this.setState({
        changeState: true,
      })

    }, 200)

    // }
    // else {
    // console.log("Error In Activation");
    // this.setState({
    // activated: false
    // })
    // }
  }

  render () {
    if(this.state.changeState){
      console.log("STATE CHANGED");
      return(<div>ACTIVATED</div>)
    }
    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
              <Card.Subtitle className='mb-2 text-muted'>
                Send Amount
              </Card.Subtitle>
              <Card.Text>
                <Form onSubmit={this.activate.bind(this)}>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Secret</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter fundraiser secret'
                      ref='secret'
                    />
                  </Form.Group>
                  <Button
                    type='submit'
                    variant='primary'
                    ref='method'
                    value='activate'
                  >
                    Activate Account
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate)

// camera shop kitchen nuclear mass news brick half beach outer shield chat blame host gap
// ruplxuwv.edfqicqp@tezos.example.org
// qpUcKjxOAI
//   "secret": "fa8e481afc56cc020ae027b7d0bcf732e539c360",
// "amount": "7483770027",
// "pkh": "tz1Uy5NhhNkH9R7E5hrCJ9agLYAXud5gqAVQ",
