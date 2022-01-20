import React from 'react';
import { Link } from 'gatsby';

function NavLinks() {
	return (
		<ul>
			<li>
				<Link to="/">Overview</Link>
			</li>
			<li>
				<Link to="/experience">Experience</Link>
			</li>
			<li>
				<Link to="/projects">Projects</Link>
			</li>
			<li>
				<Link to="/photos">Photos</Link>
			</li>
			<li>
				<Link to="/blog">Blog</Link>
			</li>
		</ul>
	);
}

export default NavLinks;
