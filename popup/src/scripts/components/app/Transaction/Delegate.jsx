import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

import Cookies from 'js-cookie'

import { delegateAccount } from '../../../../../../API/src/delegation/delegate'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'

import { accountBalance } from '../../../../../../API/src/retrieveFunds/index'

import Home from '../StartUp/Home';


class Delegate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            account: Cookies.get('name'),
            network: Cookies.get('network') || props.network
        }
    }

    componentDidMount() {
        console.log('IN ACTIVATE PROPS', this.props)
    }

    activate(e) {
        e.preventDefault()

        var delegateAdd = this.refs.delegateAdd.value
        var pass = Cookies.get('password')

        var public_key = decryptKeys(Cookies.get('publicKey'), pass)
        var private_key = decryptKeys(Cookies.get('privateKey'), pass)

        console.log("GETTING DATA", delegateAdd, pass, public_key, private_key)

        console.log("STATE ACTIVE BEFORE ACTIVATION", this.state);

        setTimeout(async () => {
            if (!delegateAdd) {
                var delegated = await delegateAccount(
                    public_key,
                    private_key,
                    Cookies.get('pkh'),
                    Cookies.get('storeType')
                )
            } else {
                var delegated = await delegateAccount(
                    public_key,
                    private_key,
                    Cookies.get('pkh'),
                    Cookies.get('storeType'),
                    delegateAdd.toString()
                )
            }

            console.log('RETURN ACTIVATION RES', delegated)

            // if (delegated) {
            this.state.delegated = delegated;

            console.log("STATE ACTIVE AFTER ACTIVATION", this.state);

            // this.props.changeActivationStatus(this.state);
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

    render() {
        if (this.state.changeState) {
            console.log("STATE CHANGED");
            this.state.changeState = false
            return (<Home />)
        }
        return (
            <Container>
                <Row>
                    <p>Default Delegation Address: tz1LhS2WFCinpwUTdUb991ocL2D9Uk6FJGJK</p>
                    <p>Delegation Amount: Full wallet balance</p>
                    <p>Transaction fee: 10000 tez</p>
                </Row>
                <Row>
                    <Card style={{ width: '18rem', margin: '20px' }}>
                        <Card.Body>
                            <Card.Subtitle className='mb-2 text-muted'>
                                Delegate Account
              </Card.Subtitle>
                            <Card.Text>
                                <Form onSubmit={this.activate.bind(this)}>
                                    <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Delegate Address</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter delegation address'
                                            ref='delegateAdd'
                                        />
                                    </Form.Group>
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        ref='method'
                                        value='activate'
                                    >
                                        Delegate Account
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

export default connect(mapStateToProps, mapDispatchToProps)(Delegate)

// camera shop kitchen nuclear mass news brick half beach outer shield chat blame host gap
// ruplxuwv.edfqicqp@tezos.example.org
// qpUcKjxOAI
//   "secret": "fa8e481afc56cc020ae027b7d0bcf732e539c360",
// "amount": "7483770027",
// "pkh": "tz1Uy5NhhNkH9R7E5hrCJ9agLYAXud5gqAVQ",
