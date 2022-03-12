import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TorreyProject from './Torrey';
import PolysentProject from './Polysent';
import PixemProject from './Pixem';
import { BaseProjectProps } from './types';

interface ProjectsProps {
	limit?: number;
}

function Projects({ limit = 0 }: ProjectsProps) {
	const projects: React.FunctionComponent<BaseProjectProps>[] = [
		TorreyProject,
		PolysentProject,
		PixemProject,
	];
	const isValidLimit = limit > 0 && limit < projects.length;
	const limitedProjects = isValidLimit ? projects.slice(0, limit) : projects;
	return (
		<>
			{limitedProjects.map((Project, i) => (
				<Project key={uuidv4()} featureOnLeft={i % 2 !== 0} />
			))}
		</>
	);
}

export default Projects;
