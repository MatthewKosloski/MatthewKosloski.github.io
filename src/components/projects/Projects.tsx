import React from 'react';
import { TorreyProject, PolysentProject } from '.';
import { BaseProjectProps } from './types';

interface ProjectsProps {
  limit?: number;
}

function Projects({ limit = 0 }: ProjectsProps) {
  const projects: React.FunctionComponent<BaseProjectProps>[] = [
    TorreyProject,
    PolysentProject,
  ];
  const isValidLimit = limit > 0 && limit < projects.length;
  const limitedProjects = isValidLimit ? projects.slice(0, limit) : projects;
  return (
    <>
      {limitedProjects.map((Project, i) => (
        <Project featureOnLeft={i % 2 !== 0} />
      ))}
    </>
  );
}

export default Projects;