import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Container, Row, Form, Card, Button } from 'react-bootstrap';

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES';
import { sendTransaction } from '../../../../../../API/src/transfer/send';
import { invokeContract } from '../../../../../../API/src/CONTRACT/invokeContract';


import Cookies from 'js-cookie'
import Home from '../StartUp/Home';

export class Call extends Component {

  constructor(props) {
    super(props);

    this.state = {
      account: Cookies.get('name'),
      network: Cookies.get("network") || props.network,
      operationId: ""
    };
  }

  onMessageHandler(e) {
    e.preventDefault();
    this.setState({ clicked: true });
    this.props.onFunctionCall(this.state);
  }

  onTransferHandler(e) {
    e.preventDefault();

    var toAccount = this.props.functionValue.address;
    var am = parseFloat(this.props.functionValue.amount);
    var amount = am * 10 ** 6;

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

      console.log("TRANSFER RESULT", activatedRes)

      if (activatedRes.status) {
        this.setState({
          valueSent: true,
          clicked: true,
          operationId: activatedRes.ID
        })
        this.props.onFunctionCall(this.state);

        // this.props.changeActivationStatus(this.state)
      } else {
        console.log('Error In Activation')
        this.setState({
          valueSent: false,
          clicked: true,
          operationId: "Error in transfering funds"
        })
        this.props.onFunctionCall(this.state);
      }

    }, 1000)

  }

  onSendHandler(e) {
    e.preventDefault();

    var toAccount = this.props.functionValue.addressContract;
    var message = `"` + this.props.functionValue.message + `"`;


    var pass = Cookies.get('password')

    var public_key = decryptKeys(Cookies.get('publicKey'), pass)
    var private_key = decryptKeys(Cookies.get('privateKey'), pass)

    console.log(toAccount, message, pass, public_key, private_key)

    setTimeout(async () => {
      var activatedRes = await invokeContract(
        public_key.toString(),
        private_key.toString(),
        Cookies.get('pkh').toString(),
        Cookies.get('storeType').toString(),
        toAccount.toString(),
        message.toString,
      )

      console.log("TRANSFER RESULT", activatedRes)

      if (activatedRes.status) {
        this.setState({
          valueSent: true,
          clicked: true,
          operationId: activatedRes.ID
        })
        this.props.onFunctionCall(this.state);
      } else {
        console.log('Error In Activation')
        if(activatedRes.ID){
          this.setState({
            valueSent: false,
            clicked: true,
            operationId: activatedRes.ID.toString()
          })
        }
        else {
          this.setState({
            valueSent: false,
            clicked: true,
            operationId: "Error in transfering funds"
          })
        }
        
        this.props.onFunctionCall(this.state);
      }

    }, 1000)

  }

  render() {
    if (this.state.clicked) {
      console.log("STATE CHANGED");
      this.state.clicked = false
      return (<Home />)
    }
    else {
      if (this.props.functionType == 'message') {
        return (
          <Container>
            <Row>
              <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                  <Card.Subtitle className='mb-2 text-muted'>
                    Function called from WebPage
              </Card.Subtitle>
                  <Card.Text>
                    <Form onSubmit={this.onMessageHandler.bind(this)}>
                      <h1>{this.props.functionValue.name}</h1>
                      <h1>{this.props.functionValue.address}</h1>
                      <Button
                        type='submit'
                        variant='primary'
                        ref='onMessageHandler'
                      >
                        Send
                  </Button>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        )
      }

      else if (this.props.functionType == 'transfer') {
        return (
          <Container>
            <Row>
              <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                  <Card.Subtitle className='mb-2 text-muted'>
                    Function called from WebPage To transfer token
              </Card.Subtitle>
                  <Card.Text>
                    <Form onSubmit={this.onTransferHandler.bind(this)}>
                      <h1>{this.props.functionValue.address}</h1>
                      <h1>{this.props.functionValue.amount}</h1>
                      <Button
                        type='submit'
                        variant='primary'
                        ref='onTransferHandler'
                      >
                        Send
                  </Button>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        )
      }
      // else{
      //   return(
      //     <div>GETTING CONTRACT</div>
      //   )
      // }
      else if (this.props.functionType == 'contractInvoke') {
        return (
          <Container>
            <Row>
              <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                  <Card.Subtitle className='mb-2 text-muted'>
                    Function called from WebPage To Invoke Contract
              </Card.Subtitle>
                  <Card.Text>
                    <Form onSubmit={this.onSendHandler.bind(this)}>
                      <h1>{this.props.functionValue.addressContract}</h1>
                      <h1>{this.props.functionValue.message}</h1>
                      <Button
                        type='submit'
                        variant='primary'
                        ref='onSendHandler'
                      >
                        Send
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
  }
}

const mapStateToProps = state => {
  return {
    functionCall: state.functionCall.functionCall,
    functionType: state.functionCall.functionType,
    functionValue: state.functionCall.functionValue
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFunctionCall: newState => dispatch({ type: 'FUNCTION_CALLED', state: newState }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Call)
