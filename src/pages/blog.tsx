import * as React from 'react';
import { WindowLocation } from '@reach/router';
import { Grid, GridCol, Layout, Section } from '../components';

interface Props {
  location: WindowLocation;
}

function BlogPage({ location }: Props) {
  return (
    <Layout location={location} pageTitle="Blog">
      <Section>
        <Grid>
          <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
            <p>Blog posts go here :)</p>
          </GridCol>
        </Grid>
      </Section>
    </Layout>
  );
}

export default BlogPage;
