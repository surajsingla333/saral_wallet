import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class Footer extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     count: 0
  //   };
  // }

  render() {
    return (
      <Container style={{position: 'fixed', bottom: '0px', backgroundColor:"blue", textAlign:"center"}}>
        <Row>
          <Col>
            <p style={{fontSize: '1px'}}>Footer</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
