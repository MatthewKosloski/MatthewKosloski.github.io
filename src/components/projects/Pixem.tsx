import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Project, SubtleLinkExternal } from '..';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
	return (
		<StaticImage
			src="../../../content/projects/pixem.png"
			alt="Pixem editor"
			placeholder="blurred"
			loading="lazy"
			imgClassName="rounded"
			width={800}
			height={600}
			quality={100}
		/>
	);
}

function PixemProject({ featureOnLeft = false }: BaseProjectProps) {
	return (
		<Project
			title="Pixem"
			subtitle="A unit conversion tool"
			featuredComponent={<FeaturedComponent />}
			buttonPrimary={
				<SubtleLinkExternal href="https://matthewkosloski.me/labs/pixem/">
					Visit live website
				</SubtleLinkExternal>
			}
			buttonSecondary={
				<SubtleLinkExternal href="https://github.com/MatthewKosloski/pixem">
					View source code
				</SubtleLinkExternal>
			}
			featureOnLeft={featureOnLeft}
		>
			<p>
				Pixem is an intuitive unit conversion tool for stylesheets. Essentially,
				it is an interactive dashboard that takes in a CSS stylesheet with REM
				or EM units and outputs a stylesheet with pixel units. Pixem received
				over 3,000 unique pageviews in 2021.
			</p>
			<p>
				The project was built using <a href="https://reactjs.org/">React</a> and{' '}
				<a href="https://www.typescriptlang.org/">TypeScript</a> and leverages{' '}
				<a href="https://www.gatsbyjs.com/">Gatsby</a> for static file
				generation.
			</p>
			<p>
				<em>This project is not actively maintained.</em>
			</p>
		</Project>
	);
}

export default PixemProject;
