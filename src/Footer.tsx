// Footer.tsx
import React from 'react';
import { Container } from 'react-bootstrap';

export interface Props {
	companyName: string;
  }

export class Footer extends React.PureComponent<Props> {
	private currentYear: number = new Date().getFullYear();
	render() {
		return (
		<footer className="bg-dark text-white text-center py-3 mt-auto">
			<Container>
				<p>
          &copy; {this.currentYear} {this.props.companyName}. All rights reserved.
					{' '}|{' '}
					<a href="https://www.linkedin.com/in/stevejhennessy/" target="_blank" rel="noopener noreferrer" className="text-white">
            LinkedIn
					</a>
				</p>
			</Container>
		</footer>
	);}
};

export default Footer;