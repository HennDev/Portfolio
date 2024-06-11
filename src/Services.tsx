// Services.tsx
import { Col, Container, Row } from 'react-bootstrap';

const Services = () => {
  return (
    <div id="services" className="services bg-light py-5">
      <Container>
        <h2 className="text-center mb-5">Services</h2>
        <Row className="my-2">
          <Col md={6}>
            <div className="service-item mb-4">
              <h3>Web Development</h3>
              <p>Custom web applications using the latest and greatest technology stacks.</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-item mb-4">
              <h3>UI/UX Design</h3>
              <p>Creating user-friendly and visually appealing interfaces.</p>
            </div>
          </Col>
        </Row>
        <Row className="my-2">
          <Col md={6}>
            <div className="service-item mb-4">
              <h3>Website maintenance</h3>
              <p>This includes updates, backups, and troubleshooting. Offering technical support and training for clients to manage their websites effectively.</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-item mb-4">
              <h3>E-commerce Development</h3>
              <p>Integration of payment gateways, shopping carts, and inventory management systems.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Services;