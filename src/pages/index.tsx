import * as React from 'react';
import {
  ButtonLink,
  ExperienceTimeline,
  Grid,
  GridCol,
  Layout,
  Section,
} from '../components';
import { BasePageProps } from './types';

function IndexPage({ location }: BasePageProps) {
  return (
    <Layout location={location}>
      <Section>
        <Grid>
          <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
            <p className="h2 color-gray600">
              Hi, I'm Matthew &mdash; <br></br> a Software Dev based in Chicago,
              Illinois.
            </p>
            <p>
              Currently, I work at <a href="#">Applied Systems</a> where my team
              and I are contributing to the transformation of{' '}
              <a href="#">Applied Epic</a>, which is Applied's flagship product.
              Specifically, Applied Epic is being transformed from a monolithic
              desktop app to a modern web app with a microservice architecture.
              The work that we're doing will greatly improve the user experience
              and reliability of the product and also facilitate access to
              product data via Open API technology.
            </p>
            <p>
              When I'm not working, I'm playing video games, taking{' '}
              <a href="#">photos</a>, looking up at the night sky with my
              telescope, implementing new features into my{' '}
              <a href="#">compiler</a>, listening to <a href="#">ASMR</a>, or
              eating copious amounts of Mexican food (enchiladas are my
              favorite).
            </p>
          </GridCol>
        </Grid>
      </Section>
      <Section title="Recent Experience">
        <Grid>
          <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
            <ExperienceTimeline limit={2} />
          </GridCol>
          <GridCol xs={12} alignCenterXs>
            <ButtonLink href="#">More Experience</ButtonLink>
          </GridCol>
        </Grid>
      </Section>
      <Section title="Most Recent Project">
        <p className="u-text-center:xs">
          <em>Torrey project will be here.</em>
        </p>
      </Section>
      <Section title="Selected Blog Posts">
        <p className="u-text-center:xs">
          <em>
            This should be visible if there is at least one blog post that has a
            feature flag.
          </em>
        </p>
      </Section>
    </Layout>
  );
}

export default IndexPage;
