import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class Footer extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     count: 0
  //   };
  // }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       count: this.state.count + 1
  //     });
  //   }, 1000);
  // }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Footer</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
