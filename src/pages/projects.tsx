import * as React from 'react';
import { WindowLocation } from '@reach/router';
import { Layout, Section } from '../components';
import { TorreyProject, PolysentProject } from '../components/projects';

interface Props {
  location: WindowLocation;
}

function ProjectsPage({ location }: Props) {
  return (
    <Layout
      location={location}
      pageTitle="Projects"
      pageSubtitle="In my free time, I like to design and develop applications. This gives me an opportunity to become acquainted new tools and technologies"
    >
      <Section>
        <TorreyProject />
        <PolysentProject featureOnLeft />
      </Section>
    </Layout>
  );
}

export default ProjectsPage;
