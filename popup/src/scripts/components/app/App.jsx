import React, { Component } from 'react';
import { connect } from 'react-redux';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import Signup from './StartUp/Signup';
import Password from './Registration/Password';
import Login from './StartUp/Login';

import Cookies from 'js-cookie';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cookieName: Cookies.get('name') ? Cookies.get('name') : "",
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

    // const { cookies } = this.props;
    //setting a cookie
    // cookies.set('name', 'Ross');
    //getting a cookie
    // cookies.get('name');

    // this.setState({
    //   name
    // });

    // setInterval(() => {
    //   this.setState({
    //     count: this.state.count + 1
    //   });
    // }, 1000);

  }

  render() {
    return (
      <div>
        <Header />
        {/* <Body/> */}
        {this.body()}

        {/* <h1>{this.state.name}</h1> */}

        {/* <Signup/> */}
        {/* <Password /> */}
        <Footer />
      </div>
    );
  }

  body() {
    if (this.props.data) {
      if (this.state.cookieName) {
        return (<Body />)
      }
      else {
        return (<Login />);
      }
    }
    else {
      return (<Signup />);
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
