import React, { Component } from 'react';
import { connect } from 'react-redux';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import Signup from './StartUp/Signup';
import Password from './Registration/Password';
import Login from './StartUp/Login';

import Cookies from 'js-cookie';
import AddAccount from './Registration/AddAccount';
import AddFundraiserAccount from './Registration/AddFundraiserAccount';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cookieName: Cookies.get('name') ? Cookies.get('name') : "",
      headerMenuAcc:false,
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

  addAccount(e){
    e.preventDefault();
    this.setState({
      headerMenuAcc: true,
      headerMenuFundAcc: false,
    })
  }

  addFundraiserAccount(e){
    e.preventDefault();
    this.setState({
      headerMenuFundAcc: true,
      headerMenuAcc: false,
    })
  }

  render() {
    return (
      <div>
        <Header addAccount={this.addAccount.bind(this)} addFundraiserAccount={this.addFundraiserAccount.bind(this)}/>
        
        <Body>
        {this.body()}
        {this.addAccSetting()}
        </Body>

        <Footer />
      </div>
    );
  }

  body() {
    if (this.props.data) {
      if (this.state.cookieName) {
        return (<h1>Body</h1>)
      }
      else {
        return (<Login />);
      }
    }
    else {
      return (<Signup />);
    }
  }

  addAccSetting(){
    if(this.state.headerMenuAcc){
          return (<AddAccount />);
    }
    else if(this.state.headerMenuFundAcc){
      return(<AddFundraiserAccount/>);
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
