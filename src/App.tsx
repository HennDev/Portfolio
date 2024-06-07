import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Container, Nav } from 'react-bootstrap'; // Import Bootstrap components
import Home from './Home'; // Example home component
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import About from './About'; // Example about component
import HireMe from './HireMe'; // Example about component


const App = () => {
  return (
    <Router>
      <div className="App" style={{ }}>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">s.henn</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/hireme">Hire Me</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hireme" element={<HireMe />} />
      </Routes>

      </div>
    </Router>
  );
}

export default App