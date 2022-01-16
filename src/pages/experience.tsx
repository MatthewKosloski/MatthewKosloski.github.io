import * as React from 'react';
import { WindowLocation } from '@reach/router';
import {
  Grid,
  GridCol,
  Layout,
  Section,
  SubSectionHeader,
  Timeline,
  ButtonLink,
} from '../components';
import {
  ButtonLinkRoundness,
  ButtonLinkVariant,
} from '../components/ButtonLink';
import experienceYaml from '../../content/experiences.yml';

interface Props {
  location: WindowLocation;
}

function ExperiencePage({ location }: Props) {
  return (
    <Layout
      location={location}
      pageTitle="Work and Education"
      pageSubtitle="I hold a B.S. in computer science and have worked for tech companies, financial institutions, startups, and small businesses"
    >
      <Section title="Work Experience">
        <Grid>
          <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
            <Timeline dataSource={experienceYaml} />
          </GridCol>
          <GridCol xs={12} alignCenterXs>
            <ButtonLink href="">View Resume</ButtonLink>
            <ButtonLink href="" variant={ButtonLinkVariant.SECONDARY}>
              View LinkedIn
            </ButtonLink>
          </GridCol>
        </Grid>
      </Section>
      <Section title="Education">
        <Grid>
          <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
            <SubSectionHeader>
              <h3>Purdue University Northwest</h3>
              <h4>
                Aug. '18 <span>&mdash;</span> May '21
              </h4>
            </SubSectionHeader>
            <p>
              Bachelor of Science, Computer Science; Graduated with distinction
              (top 10%).
            </p>
            <p>
              For my senior project, I designed a high-level, Lisp-like
              programming language and implemented it by building a compiler
              from scratch. The compiler translates the high-level program to
              x86-64 assembly code (AT&amp;T syntax).
            </p>
            <ButtonLink href="" variant={ButtonLinkVariant.SECONDARY}>
              Senior Project Paper
            </ButtonLink>
          </GridCol>
        </Grid>
      </Section>
    </Layout>
  );
}

export default ExperiencePage;
