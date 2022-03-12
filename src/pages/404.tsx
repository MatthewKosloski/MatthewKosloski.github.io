import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { BasePageProps } from '../types';
import { Grid, GridCol, Layout, Section } from '../components';

function NotFoundPage({ location }: BasePageProps) {
	return (
		<Layout
			location={location}
			pageTitle="Uh Oh..."
			pageSubtitle="404 Not Found"
		>
			<Section>
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<p className="lead">
							The page you are looking for doesn't exist or has been moved.
						</p>
						<p>
							You can return to the{' '}
							<GatsbyLink to="/">overview page</GatsbyLink> or email me at{' '}
							<em>matthew at mtk dot me</em> if you can't find what you're
							looking for.
						</p>
					</GridCol>
				</Grid>
			</Section>
		</Layout>
	);
}

export default NotFoundPage;
