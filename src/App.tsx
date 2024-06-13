import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'; // Import Bootstrap components
import Home from './Home'; // Example home component
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import About from './About'; // Example about component
import HireMe from './HireMe'; // Example about component
import Footer from './Footer';
import Services from './Services';
import REIC from './Tools/REIC';

const App = () => {
	return (
		<Router>
			<div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
				<Navbar bg="dark" variant="dark" expand="lg">
					<Container>
						<Navbar.Brand as={Link} to="/">s.henn</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link as={Link} to="/">Home</Nav.Link>
								<Nav.Link as={Link} to="/services">Services</Nav.Link>
								<NavDropdown title="Tools" id="basic-nav-dropdown" className="custom-dropdown">
									<NavDropdown.Item as={Link} to="/reic">Real Estate Investment Calculator</NavDropdown.Item>
								</NavDropdown>
								<Nav.Link as={Link} to="/about">About</Nav.Link>
								<Nav.Link as={Link} to="/hireme">Hire Me</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/services" element={<Services />} />
					<Route path="/about" element={<About />} />
					<Route path="/hireme" element={<HireMe />} />
					<Route path="/reic" element={<REIC />} />
				</Routes>

				<Footer />

			</div>
		</Router>
	);
}

export default App
