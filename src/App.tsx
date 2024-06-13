// App.tsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import HireMe from './HireMe';
import Footer from './Footer';
import Services from './Services';
import REIC from './Tools/REIC';

const App: React.FC = () => {
  const companyName = "s.henn"
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">{companyName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/services">Services</Nav.Link>
                <NavDropdown
                  title="Tools"
                  id="basic-nav-dropdown"
                  className="custom-dropdown"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  show={showDropdown}
                >
                  <NavDropdown.Item as={Link} to="/reic">Real Estate Investment Calculator</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/hireme">Hire Me</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/hireme" element={<HireMe />} />
            <Route path="/reic" element={<REIC />} />
          </Routes>
        </main>

        <Footer
          companyName={companyName} />
      </div>
    </Router>
  );
}

export default App;
