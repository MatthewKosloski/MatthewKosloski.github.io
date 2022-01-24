import * as React from 'react';
import { graphql } from 'gatsby';
import { Grid, GridCol, Layout, Section } from '../../components';
import { BasePageProps } from '../types';

function BlogPage({ location, data }: BasePageProps & BlogQuery) {
	return (
		<Layout location={location} pageTitle="Blog">
			<Section>
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<ul>
							{data.allMdx.nodes.map(({ id, slug, frontmatter }) => (
								<li key={id}>
									<a href={slug}>
										<h3>{frontmatter.title}</h3>
										<p>{frontmatter.date}</p>
									</a>
								</li>
							))}
						</ul>
					</GridCol>
				</Grid>
			</Section>
		</Layout>
	);
}

interface BlogQuery {
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

export const query = graphql`
	{
		allMdx(sort: { fields: frontmatter___date, order: DESC }) {
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

export default BlogPage;
