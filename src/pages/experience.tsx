import * as React from 'react';
import {
	Flex,
	FlexCol,
	Grid,
	GridCol,
	Layout,
	Section,
	SubSectionHeader,
	ButtonLinkExternal,
	ExperienceTimeline,
	SubtleLinkExternal,
} from '../components';
import { ButtonLinkVariant } from '../components/ButtonLink';
import { StaticImage } from 'gatsby-plugin-image';
import { BasePageProps } from './types';

function ExperiencePage({ location }: BasePageProps) {
	return (
		<Layout
			location={location}
			pageTitle="Work and Education"
			pageSubtitle="I hold a B.S. in computer science and have worked for tech companies, financial institutions, startups, and small businesses"
		>
			<Section title="Work Experience">
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<ExperienceTimeline />
					</GridCol>
					<GridCol xs={12} alignCenterXs>
						<ButtonLinkExternal href="">View Resume</ButtonLinkExternal>
						<ButtonLinkExternal href="" variant={ButtonLinkVariant.SECONDARY}>
							View LinkedIn
						</ButtonLinkExternal>
					</GridCol>
				</Grid>
			</Section>
			<Section title="Education">
				<Grid>
					<GridCol xs={12}>
						<SubSectionHeader noBottomMargin>
							<h3>Purdue University Northwest</h3>
							<h4>
								Aug. '18 <span>&mdash;</span> May '21
							</h4>
						</SubSectionHeader>
					</GridCol>
					<GridCol xs={12} md={6} orderLastXs orderInitialMd>
						<p>
							B.S. in Computer Science; Graduated with distinction
							(top 10%).
						</p>
						<p>
							For my senior project, I designed a high-level, Lisp-like
							programming language and implemented it by building a compiler
							from scratch. The compiler translates the high-level program to
							x86-64 assembly code in AT&amp;T syntax.
						</p>
						<Flex>
							<FlexCol>
								<SubtleLinkExternal href="#">
									Read my senior paper
								</SubtleLinkExternal>
							</FlexCol>
						</Flex>
					</GridCol>
					<GridCol xs={12} md={6}>
						<Flex justifyCenterXs justifyEndMd>
							<FlexCol>
								<StaticImage
									src="../images/photos/matthew-kosloski-graduation.jpg"
									alt="A portrait photo of Matthew Kosloski wearing graduation attire and holding his diploma"
									placeholder="blurred"
									loading="lazy"
									imgClassName="rounded"
									width={430}
									height={430}
									quality={100}
								/>
							</FlexCol>
						</Flex>
					</GridCol>
				</Grid>
			</Section>
		</Layout>
	);
}

export default ExperiencePage;
