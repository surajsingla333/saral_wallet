import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import Signup from './StartUp/Signup'
import Password from './Registration/Password'
import Login from './StartUp/Login'
import Home from './StartUp/Home'

import Cookies from 'js-cookie'
import AddAccount from './Registration/AddAccount'
import AddFundraiserAccount from './Registration/AddFundraiserAccount'

// import '../../../styles/app/index.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cookieName: Cookies.get('name') ? Cookies.get('name') : '',
      headerMenuAcc: false,
      bodyContent: true,
      headMenu: false,
      headerMenuFundAcc: false,
      update: false,
      pkh: Cookies.get('pkh'),
      DATA: JSON.parse(localStorage.getItem("DATA")),
    }
  }

  componentWillMount () {}

  componentDidMount () {
    document.addEventListener('click', () => {
      this.props.counting();
    });

    this.props.sendAccount(this.state);

    console.log('PROPS IN APP.jsx', this.props)

    console.log('STATE IN APP>JSX', this.state)

    Cookies.set('foo', 'bar')
  }

  addAccount (e) {
    e.preventDefault()
    console.log('CLICKING HEADER BUTTONS')
    this.setState({
      headerMenuAcc: true,
      headerMenuFundAcc: false
    })
  }

  backHome (e) {
    e.preventDefault()
    console.log('CLICKING HEADER Back BUTTONS')
    this.setState({
      headerMenuAcc: false,
      headerMenuFundAcc: false,
      GOTO_HOME: true
    })
  }

  addFundraiserAccount (e) {
    e.preventDefault()
    console.log('CLICKING HEADER BUTTONS')
    this.setState({
      headerMenuFundAcc: true,
      headerMenuAcc: false
    })
  }

  // getBalance(val){
  //   console.log("GETTING BALANCE", val);
  //   this.setState({
  //     balance: val
  //   })
  // }
  updateHome(){
    // e.preventDefault()
    console.log("INSIDE UPDATE HOME FROM HEADER");
    this.setState({
      update: Cookies.get('name'),
    })
    console.log("CALLING DISPATCH FROM APP");
    this.props.stateUpdate(this.state);
  };

  render () {
    return (
      <div
        className='app'
        style={{ width: '350px', height: '550px', testAlign: 'center' }}
      >
        <Row>
          <Col>
            <Header
              backHome={this.backHome.bind(this)}
              addAccount={this.addAccount.bind(this)}
              addFundraiserAccount={this.addFundraiserAccount.bind(this)}
              updateHome={this.updateHome.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col style={{height: '100%'}}>
            {/* getBalance={this.getBalance.bind(this)} */}
            <Body>
              {this.body()}
              {/* {this.addAccSetting()} */}
            </Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }

  body () {
    if (this.state.GOTO_HOME) {
      console.log('BODY IF FOR HOME')
      this.state.GOTO_HOME = false

      if (this.state.DATA) {
        if (this.state.cookieName) {
          return <Home />
        } else {
          return <Login />
        }
      } else {
        return <Signup />
      }
    } else if (!this.state.headerMenuAcc && !this.state.headerMenuFundAcc) {
      console.log('BODY IF FOR LOGIN/SIGNUP/HOME')
      if (this.state.DATA) {
        if (this.state.cookieName) {
          return <Home />
        } else {
          return <Login />
        }
      } else {
        return <Signup />
      }
    } else {
      console.log('BODY ELSE FOR HEADERS ')
      if (this.state.headerMenuAcc) {
        return (
          <Container>
            <Row>
              <AddAccount />
            </Row>
          </Container>
        )
      } else if (this.state.headerMenuFundAcc) {
        return (
          <Container>
            <Row>
              <AddFundraiserAccount />
            </Row>
          </Container>
        )
      }
    }
  }

  addAccSetting () {
    if (this.state.headerMenuAcc) {
      return (
        <Container>
          <Row>
            <AddAccount />
          </Row>
        </Container>
      )
    } else if (this.state.headerMenuFundAcc) {
      return (
        <Container>
          <Row>
            <AddFundraiserAccount />
          </Row>
        </Container>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.getLocalStorage,
    count: state.count.count,
    // file: state.file.file
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendAccount: newState => dispatch({type: 'SEND_ACCOUNT', state: newState }),
    counting: () => dispatch({type: "ADD_COUNT"}), 
    stateUpdate: newState => dispatch({ type: "UPDATE_STATE", state: newState })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);