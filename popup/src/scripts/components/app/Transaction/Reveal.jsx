import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

import Cookies from 'js-cookie'

import { revealAccount } from '../../../../../../API/src/reveal/reveal'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'

import Home from '../StartUp/Home'

class Reveal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      account: Cookies.get('name'),
      network: Cookies.get('network') || props.network
    }
  }

  componentDidMount () {
    console.log('IN REVEAL PROPS', this.props)
  }

  reveal (e) {
    e.preventDefault()

    var pass = Cookies.get('password')

    var public_key = decryptKeys(Cookies.get('publicKey'), pass)
    var private_key = decryptKeys(Cookies.get('privateKey'), pass)

    setTimeout(async () => {
      var revealedRes = await revealAccount(
        public_key,
        private_key,
        Cookies.get('pkh'),
        Cookies.get('storeType'),
        this.state.network
      )

      if (revealedRes) {
        this.setState({
          revealed: true
        })

        this.props.changeRevealStatus(this.state)
      } else {
        console.log('Error In Reveal')
        this.setState({
          revealed: false
        })
      }
    }, 200)
  }

  render () {
    if(this.state.revealed){
      this.state.revealed = false;
      return(
        <Home/>
      )
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
                <Button
                  variant='primary'
                  ref='method'
                  value='reveal'
                  onClick={this.reveal.bind(this)}
                >
                  Reveal Account
                </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reveal)

// camera shop kitchen nuclear mass news brick half beach outer shield chat blame host gap
// ruplxuwv.edfqicqp@tezos.example.org
// qpUcKjxOAI
//   "secret": "fa8e481afc56cc020ae027b7d0bcf732e539c360",
// "amount": "7483770027",
// "pkh": "tz1Uy5NhhNkH9R7E5hrCJ9agLYAXud5gqAVQ",
