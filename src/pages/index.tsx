import * as React from 'react';
import { graphql } from 'gatsby';
import { BasePageProps } from '../types';
import {
	ButtonLinkInternal,
	ExperienceTimeline,
	Grid,
	GridCol,
	Layout,
	Posts,
	Section,
} from '../components';
import { Projects } from '../components/projects';

function IndexPage({ location, data }: BasePageProps & FeaturedBlogPostsQuery) {
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
							Currently, I work at{' '}
							<a href="https://www1.appliedsystems.com/en-us/">
								Applied Systems
							</a>{' '}
							where my team and I are contributing to the transformation of{' '}
							<a href="https://www1.appliedsystems.com/en-us/solutions/for-agents/agency-management-system/applied-epic/">
								Applied Epic
							</a>
							, which is Applied's flagship product. Specifically, Epic is being
							transformed from a monolithic desktop app to a modern web app with
							a microservice architecture. The work that we're doing will
							greatly improve the user experience and reliability of the product
							and also facilitate access to data via Open APIs.
						</p>
						<p>
							When I'm not working, I'm playing video games, taking{' '}
							<a href="https://unsplash.com/@matthew">photos</a>, looking up at
							the night sky with my telescope, implementing new features into my{' '}
							<a href="https://github.com/MatthewKosloski/torrey">compiler</a>,
							listening to <a href="https://en.wikipedia.org/wiki/ASMR">ASMR</a>
							, or eating copious amounts of Mexican food (enchiladas are my
							favorite).
						</p>
					</GridCol>
				</Grid>
			</Section>
			<Section title="Most Recent Experience">
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<ExperienceTimeline limit={2} />
					</GridCol>
					<GridCol xs={12} alignCenterXs>
						<ButtonLinkInternal to="/experience">
							View All Experience
						</ButtonLinkInternal>
					</GridCol>
				</Grid>
			</Section>
			<Section title="Most Recent Project">
				<Projects limit={1} />
				<GridCol xs={12} alignCenterXs>
					<ButtonLinkInternal to="/projects">
						View All Projects
					</ButtonLinkInternal>
				</GridCol>
			</Section>
			{data.allMdx.nodes.length > 0 ? (
				<Section title="Selected Blog Posts">
					<Grid>
						<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
							<Posts slugPrefix="blog/" data={data.allMdx.nodes} />
						</GridCol>
					</Grid>
				</Section>
			) : null}
		</Layout>
	);
}

interface FeaturedBlogPostsQuery {
	data: {
		allMdx: {
			nodes: {
				frontmatter: {
					title: string;
					date: string;
				};
				id: string;
				slug: string;
			}[];
		};
	};
}

export const featuredBlogPostsQuery = graphql`
	{
		allMdx(
			sort: { fields: frontmatter___date, order: DESC }
			filter: { frontmatter: { featured: { eq: true } } }
		) {
			nodes {
				frontmatter {
					title
					date(formatString: "MMMM DD, YYYY")
				}
				id
				slug
			}
		}
	}
`;

export default IndexPage;
