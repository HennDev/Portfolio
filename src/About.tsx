import { Card, Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <Container className="mt-5 mb-5">
    <h2 className="text-center mb-5">About Me</h2>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Text>
                Hello! I'm Steve Hennessy, a seasoned web developer with nearly {new Date().getFullYear() - 2009} years of experience in crafting robust, scalable, and visually stunning web applications. My journey in the tech industry has been driven by a passion for technology and a commitment to delivering high-quality solutions that meet the unique needs of small businesses.
              </Card.Text>
              <Card.Text>
                Throughout my career, I have honed my skills in a variety of programming languages and frameworks, including .NET, PHP, React, and jQuery. This diverse technical background enables me to tackle a wide range of projects, from simple websites to complex web applications, ensuring that each solution is tailored to the client's specific requirements.
              </Card.Text>
              <Card.Text>
                I have had the privilege of working across various industries, including healthcare, oil and gas, and consulting. My experience spans both start-ups and large companies, allowing me to adapt to different business environments and project scales. Whether it's developing a secure and user-friendly portal for healthcare providers, building robust data management systems for the oil and gas sector, or creating dynamic websites for consulting firms, I bring a wealth of knowledge and expertise to every project.
              </Card.Text>
              <Card.Text>
                My approach to web development is client-focused and results-driven. I take the time to understand each client's business goals and challenges, ensuring that the websites and applications I create not only look great but also perform exceptionally well and provide tangible business benefits. Whether it's boosting online presence, streamlining operations, or enhancing user engagement, I strive to deliver solutions that drive success.
              </Card.Text>
              <Card.Text>
                Beyond my technical expertise, I am dedicated to providing exceptional customer service. I believe in clear communication, timely delivery, and ongoing support to ensure that my clients are completely satisfied with the end product. My portfolio showcases a variety of projects that highlight my ability to blend technical prowess with creative design, and I'm always excited to take on new challenges.
              </Card.Text>
              <Card.Text>
                When I'm not coding, you can find me playing sports or raising our 3 kids, which helps me stay balanced and brings fresh perspectives to my work.
              </Card.Text>
              <Card.Text>
                If you're looking for a reliable, experienced, and innovative web developer to bring your vision to life, let's connect and make your project a success!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
