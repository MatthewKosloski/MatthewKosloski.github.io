import * as React from 'react';
import { Layout, Section } from '../components';
import { Projects } from '../components/projects';
import { BasePageProps } from './types';

function ProjectsPage({ location }: BasePageProps) {
	return (
		<Layout
			location={location}
			pageTitle="Projects"
			pageSubtitle="In my free time, I like to design and develop applications. This gives me an opportunity to become acquainted new tools and technologies"
		>
			<Section>
				<Projects />
			</Section>
		</Layout>
	);
}

export default ProjectsPage;
