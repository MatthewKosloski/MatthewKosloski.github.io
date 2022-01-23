import * as React from 'react';
import { Grid, GridCol, Layout, Section } from '../components';
import { BasePageProps } from './types';

function PhotosPage({ location }: BasePageProps) {
	return (
		<Layout location={location} pageTitle="Photos">
			<Section>
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<p>Photos posts go here :)</p>
					</GridCol>
				</Grid>
			</Section>
		</Layout>
	);
}

export default PhotosPage;
