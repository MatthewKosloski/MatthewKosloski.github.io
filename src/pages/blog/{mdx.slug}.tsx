import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Grid, GridCol, Layout, Section } from '../../components';
import { BasePageProps } from '../types';

function BlogPost({ location, data }: BasePageProps & BlogPostQuery) {
	return (
		<Layout
			location={location}
			pageTitle={data.mdx.frontmatter.title}
			pageSubtitle={data.mdx.frontmatter.date}
		>
			<Section>
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<MDXRenderer>{data.mdx.body}</MDXRenderer>
					</GridCol>
				</Grid>
			</Section>
		</Layout>
	);
}

interface BlogPostQuery {
	data: {
		mdx: {
			frontmatter: {
				title: string;
				date: string;
			};
			body: string;
		};
	};
}

export const query = graphql`
	query ($id: String) {
		mdx(id: { eq: $id }) {
			frontmatter {
				title
				date(formatString: "MMMM D, YYYY")
			}
			body
		}
	}
`;

export default BlogPost;
