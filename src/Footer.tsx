// Footer.tsx
import { Container } from 'react-bootstrap';

const Footer = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <p>
          &copy; {currentYear} Your Name. All rights reserved.
          {' '}|{' '}
          <a href="https://www.linkedin.com/in/stevejhennessy/" target="_blank" rel="noopener noreferrer" className="text-white">
            LinkedIn
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;