import * as React from 'react';
import { BasePageProps } from '../types';
import { Grid, GridCol, Layout, Masonry, Section } from '../components';
import { MasonryProps } from '../components/Masonry';
import { graphql } from 'gatsby';

function PhotosPage({ location, data }: BasePageProps & MasonryProps) {
	return (
		<Layout location={location} pageTitle="Photography">
			<Section>
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<p className="lead">
							I'm an amateur photographer with an affinity for nature scenes.
						</p>
						<p>
							All photos I take are shot on a Canon T2i digital camera in RAW
							format and edited in Adobe Photoshop. My best photos are uploaded
							to <a href="https://unsplash.com/matthew">my Unsplash profile</a>{' '}
							where they can be downloaded for free and used for both commercial
							and non-commercial purposes under the{' '}
							<a href="https://unsplash.com/license">Unsplash License</a>. As of
							January 2022, my photos have over 46 million views and over 380
							thousand downloads. My photos have been used on websites like
							Medium, Buzzfeed, and Notion.
						</p>
						<p>
							Below are some of my favorite shots&mdash;all of which are
							available on Unsplash.
						</p>
						<hr />
					</GridCol>
					<GridCol xs={12}>
						<Masonry data={data} />
					</GridCol>
				</Grid>
			</Section>
		</Layout>
	);
}

export const query = graphql`
	{
		allMdx(
			filter: { fileAbsolutePath: { regex: "/photography/" } }
			sort: { fields: frontmatter___order, order: ASC }
		) {
			nodes {
				id
				frontmatter {
					masonry_size
					alt
					image {
						childrenImageSharp {
							gatsbyImageData(placeholder: BLURRED, quality: 100)
						}
					}
				}
			}
		}
	}
`;

export default PhotosPage;
