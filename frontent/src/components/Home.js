import React, { Component } from 'react'
import { Row, Col, Image } from "react-bootstrap"

class Home extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <Image src="/img2.png" thumbnail responsive/>
          </Col>
          <Col md={6}>
            <Image src="/img3.png" thumbnail responsive/>
          </Col>
        </Row>
      </div>
    );
  }
} 

export default Home