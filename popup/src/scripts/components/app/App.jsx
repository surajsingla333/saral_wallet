import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col, Button } from 'react-bootstrap';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import Signup from './StartUp/Signup';
import Password from './Registration/Password';
import Login from './StartUp/Login';
import Home from './StartUp/Home';

import Cookies from 'js-cookie';
import AddAccount from './Registration/AddAccount';
import AddFundraiserAccount from './Registration/AddFundraiserAccount';

import '../../../styles/app/index.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cookieName: Cookies.get('name') ? Cookies.get('name') : "",
      headerMenuAcc: false,
      bodyContent: true,
      headMenu: false,
      headerMenuFundAcc: false,
    }

  }


  componentWillMount() {

  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT'
      });
    });

    console.log("PROPS IN APP.jsx", this.props);

    console.log("STATE IN APP>JSX", this.state);

    Cookies.set('foo', 'bar')

  }

  addAccount(e) {
    e.preventDefault();
    this.setState({
      headerMenuAcc: true,
      headerMenuFundAcc: false,
    })
  }

  addFundraiserAccount(e) {
    e.preventDefault();
    this.setState({
      headerMenuFundAcc: true,
      headerMenuAcc: false,
    })
  }

  render() {
    return (
      <Container className="app">
        <Row>
          <Col>
            <Header addAccount={this.addAccount.bind(this)} addFundraiserAccount={this.addFundraiserAccount.bind(this)} />
          </Col>
        </Row>

        <Row>
          <Col>
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
      </Container>
    );
  }

  body() {
    if (this.props.data) {
      if (this.state.cookieName) {
        return (<Home/>)
      }
      else {
        return (<Login />);
      }
    }
    else {
      return (<Signup />);
    }
  }

  addAccSetting() {
    if (this.state.headerMenuAcc) {
      return (
        <Container>
          <Row>
      <AddAccount />
      </Row>
      </Container>
      );
    }
    else if (this.state.headerMenuFundAcc) {
      return (
        <Container>
          <Row>
        <AddFundraiserAccount />
        </Row>
        </Container>);
    }
  }

}

const mapStateToProps = (state) => {
  return {
    data: state.getLocalStorage,
    // count: state.count.count,
    // file: state.file.file
  }
}

// export const HomeContainer = connect(
//   mapStateToProps,
//   null
//  )(Home);
// //  export default HomeContainer;

export default connect(mapStateToProps)(App);
