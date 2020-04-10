import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

import AddAccount from './Registration/AddAccount';
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: props
    }

  }

  componentDidMount() {

    console.log("NETWORK IS:", this.props.network);
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);


  }

  onRadioChange(e){
    console.log(e.target.value);
    console.log(e.target);
    console.log(e.target.variant);
    // e.target.variant = "success";
    this.setState({ network: e.target.value }); 
    this.props.changeNetwork(this.state.network);
    
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        <ButtonGroup toggle onChange={this.onRadioChange.bind(this)}>
          <ToggleButton variant="primary" type="radio" name="radio1" value="https://tezos-dev.cryptonomic-infra.tech:443/">
          Network: Tezos dev
          </ToggleButton>
          <ToggleButton variant="primary" type="radio" name="radio2" value="https://conseil-dev.cryptonomic-infra.tech:443/">
          Network: Conseil dev
          </ToggleButton>
        </ButtonGroup>



        {/* <Button variant="primary" ref="method" value="Json" onClick={(e) => {  }}>
          Network: Tezos dev
            </Button>
        <Button variant="primary" ref="method" value="Json" onClick={(e) => { this.setState({ network: `https://conseil-dev.cryptonomic-infra.tech:443/` }); this.props.changeNetwork(`https://conseil-dev.cryptonomic-infra.tech:443/`); }}>
          Network: Conseil dev
            </Button> */}

        <Button variant="secondary" ref="method" value="Json" onClick={(e) => {this.setState({addAcc: true})}}>
            </Button>
            {this.acc()}
      </div>
    );
  }
  acc(){
    if(this.state.addAcc){
      return(<AddAccount/>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count.file,
    file: state.file.file,
    network: state.getNetwork.network,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeNetwork: (newNetwork) => dispatch({ type: "CHANGE_NETWORK", state: newNetwork })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);