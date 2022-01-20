import React from 'react';
import { Project, ButtonLink } from '../';
import { ButtonLinkVariant } from '../ButtonLink';
import torreyImgSrc from '../../images/torrey.jpg';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
	return <img src={torreyImgSrc} alt="Torrey" />;
}

function TorreyProject({ featureOnLeft = false }: BaseProjectProps) {
	return (
		<Project
			title="Torrey"
			subtitle="A Compiler to x86-64 Assembly"
			featuredComponent={<FeaturedComponent />}
			buttonPrimary={
				<ButtonLink variant={ButtonLinkVariant.SECONDARY} href="#">
					Source Code
				</ButtonLink>
			}
			buttonSecondary={
				<ButtonLink variant={ButtonLinkVariant.SECONDARY} href="#">
					Latest Release
				</ButtonLink>
			}
			featureOnLeft={featureOnLeft}
		>
			<p>
				Torrey is a Lisp-like programming language that type-checks at
				compile-time and compiles to 64-bit x86 assembly code.
			</p>
			<p>
				Releases are versioned using Semver Semantic Versioning and are
				automated by a continuous integration (CI) pipeline which also compiles
				and tests the compiler and builds the compiler jar and runtime object
				file.
			</p>
			<p>
				Currently, I'm developing a playground environment that enables one to
				compile, link, and execute Torrey programs directly from the web
				browser.
			</p>
		</Project>
	);
}

export default TorreyProject;
