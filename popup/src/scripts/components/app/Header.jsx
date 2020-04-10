import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import {Button} from 'react-bootstrap';

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

  render() {
    return (
      <div>
        <h1>Header</h1>
        <Button variant="primary" ref="method" value="Json" onClick={(e) => { this.setState({network: `https://tezos-dev.cryptonomic-infra.tech:443/`}); this.props.changeNetwork(`https://tezos-dev.cryptonomic-infra.tech:443/`);}}>
              Network: Tezos dev
            </Button>
            <Button variant="primary" ref="method" value="Json" onClick={(e) => { this.setState({network: `https://conseil-dev.cryptonomic-infra.tech:443/`}); this.props.changeNetwork(`https://conseil-dev.cryptonomic-infra.tech:443/`);}}>
            Network: Conseil dev
            </Button>
      </div>
    );
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