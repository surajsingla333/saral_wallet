import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'

import { connect } from 'react-redux'

import { generateAccount } from '../../../../../../API/src/registration/generateWallet'
import { calling } from '../../../../../../API/src/TESTING/send'
import Password from './Password'

class Mnemonic extends Component {
  constructor (props) {
    super(props)

    this.state = {
      click: false,
      error: false,
      public: '',
      private: '',
      pkh: '',
      mnemonic: '',
      gotoPassword: false
    }
  }

  componentWillMount () {
    let stored = localStorage.getItem('USER WALLET')
    console.log('stored', stored)
    if (stored && stored !== '') {
      console.log('IN IF', !stored)
      console.log('IN IF 2', stored)
      this.state.stored = JSON.parse(stored)
      this.state.result = initAccount(this.state.stored)
    }
    console.log('state', this.state)
  }

  componentDidMount () {
    // this.setState({file: localStorage.getItem("File Storage")});
    // console.log(localStorage.getItem("File Storage"))
    console.log('PROPS', this.props)
    console.log('COUNT', this.props.count)
    console.log('FILE', this.props.file)
    //

    calling()

    console.log(this.state.result)
  }

  createWallet (e) {
    e.preventDefault()
    this.state.click = true

    console.log('Getting from form', this.refs.mnemonic)

    var k = this.refs.mnemonic.value

    console.log(k.toString())

    // setTimeout(async () => {

    console.log('GOT MNEMONIC', k)

    // this.state.file = rr;

    console.log('CLICKED')

    setTimeout(async () => {
      let result = await generateAccount(k.toString(), 'Have mnemonic')

      // localStorage.setItem("USER WALLET", rr);
      console.log('result', result)
      console.log('result', typeof result)

      if (typeof result === 'object') {
        console.log('PUBLIC', result.publicKeyHash)
        console.log('PUBLIC', result.privateKey)
        console.log('PUBLIC', result.publicKey)

        this.setState({
          public: result.publicKey,
          private: result.privateKey,
          pkh: result.publicKeyHash,
          mnemonic: k.toString(),
          storeType: result.storeType,
          gotoPassword: true,
          activated: true
        })

        // this.state.public = result.publicKey;
        // this.state.private = result.privateKey;
        // this.state.pkh = result.publicKeyHash;
        // this.state.mnemonic = k.toString();
        // this.state.gotoPassword = true;

        console.log('SENDING', this.state)
        this.props.makeWalletWithMnemonic(this.state)
      } else if (typeof result === 'string') {
        this.state.error = true
      } else {
        this.state.error = true
      }
    }, 500)

    // }, 500)

    // this.props.dispatch({
    //   type: "SAVE_FILE"
    // })
    // localStorage.setItem("File Stored", "this.refs.file.files[0]")
    // chrome.storage.local.set({"FILE3": this.refs.file.files[0]})
  }

  gotoPass () {
    this.setState({ gotoPassword: true })
  }

  render () {
    console.log('IN RENDER', this.state)

    if (this.state.error === true) {
      this.state.error = false
      alert('WRONG JSON FILE')
      return <div>{this.main()}</div>
    } else if (this.state.gotoPassword === true) {
      this.state.gotoPassword = false
      console.log('GOING TO PASWORD')
      return <Password />
      // alert("WRONG JSON FILE");
    } else if (this.state.click === false) {
      console.log('IN ELSE')
      return <div>{this.main()}</div>
    }
  }

  main () {
    return (
      <Card style={{ margin: '20px', textAlign: 'center' }}>
        <Card.Body>
          <Card.Title className='mb-2 text-muted'>Mnemonic Wallet</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <h5>Enter mnemonic pharse</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form onSubmit={this.createWallet.bind(this)}>
                    <Form.Group controlId='exampleForm.ControlTextarea1'>
                      <Form.Control as='textarea' rows='3' ref='mnemonic' />
                    </Form.Group>
                    <hr></hr>
                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    )
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
    makeWalletWithMnemonic: newState =>
      dispatch({ type: 'SAVE_ACCOUNT', state: newState })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mnemonic)

// deputy kitten mobile since nest art jelly bubble truck ensure uphold parent artwork sweet approve blur spider trigger wealth travel margin north law soda
