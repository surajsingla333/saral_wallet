import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT'
      });
    });
  }

  render() {
    return (
      <div>
        <h1>THIS IS PRINTING</h1>
        Count: {this.props.count}
        File: {this.props.file}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count.count,
    file: state.file.file
  };
};

export default connect(mapStateToProps)(App);
