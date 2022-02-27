import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Project, SubtleLinkExternal } from '../';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
	return (
		<StaticImage
			src="../../../content/projects/polysent.jpg"
			alt="A portrait photo of Matthew Kosloski wearing graduation attire and holding his diploma"
			placeholder="blurred"
			loading="lazy"
			imgClassName="rounded"
			width={800}
			height={600}
			quality={100}
		/>
	);
}

function PolysentProject({ featureOnLeft = false }: BaseProjectProps) {
	return (
		<Project
			title="Polysent"
			subtitle="A Single Page Web Application"
			featuredComponent={<FeaturedComponent />}
			buttonPrimary={
				<SubtleLinkExternal href="http://polysent.com/">
					Visit live website
				</SubtleLinkExternal>
			}
			buttonSecondary={
				<SubtleLinkExternal href="https://github.com/MatthewKosloski/polysent">
					View source code
				</SubtleLinkExternal>
			}
			featureOnLeft={featureOnLeft}
		>
			<p>
				Polysent is a single page application that enables users to create,
				view, search for, and interact with public or private polls.
			</p>
			<p>
				It's built on the MEAN (MongoDB, ExpressJS, Angular, Node.js) tech stack
				and uses browser local storage to save the user's voting history. It's
				currently running in a Docker container on a Digital Ocean virtual
				private server (VPS).
			</p>
			<p>
				<em>This project is not actively maintained.</em>
			</p>
		</Project>
	);
}

export default PolysentProject;
