import { useState } from 'react'
import './App.css';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const HireMe = () => {
  const phoneNumber = "713-594-9520";
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    replyTo: '',
    message: '',
  });
    
  async function sendEmail() {
    
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    console.log(apiUrl);  // Debugging line to check the variable
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Prod/hireme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          replyTo: formData.replyTo,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok || data.statusCode !== 200) {
        setError(true);
        throw new Error('Failed to send email');
      }

      setConfirmation(true);
    } catch (error) {
      setError(true);
      console.error('Error sending email:', error);
    }
  }


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      setError(false);
      setConfirmation(false);
      e.preventDefault();
      // Handle form submission (e.g., send data to API or email service)
      await sendEmail();
    };

    return (
      <Container className="py-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center mb-5">Hire Me</h2>
            <Row className="justify-content-md-center">
              <Col md={6}>
              {error && <Alert variant="danger">The email did not send, try again</Alert>}
              {confirmation && <Alert variant="success">Email sent, we'll be in touch!</Alert>}
              </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="replyTo"
                  value={formData.replyTo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {!confirmation &&
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
              }
            </Form>
            <div className="text-center mt-4">
            <a href={`tel:${phoneNumber}`} className="cta-button">Call Me Now: {phoneNumber}</a>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default HireMe;