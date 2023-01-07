import React from 'react'
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
      <footer>
          <Container className="text-center py-3">
              {/*py-3 means padding in y axis tht is padding in top and bottom */}
              Copyright &copy; Proshop
              {/*&copy; is the way to use copyright symbol in html */}
              {/*<Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Proshop{/*&copy; is the way to use copyright symbol in html 
                    </Col>
                </Row> */}
          </Container>
      </footer>
  );
}

export default Footer
