import * as React from 'react';
import styled, { css } from 'styled-components';
import {
	DribbbleIcon,
	GitHubIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterIcon,
	UnsplashIcon,
} from './icons';
import withScreenReaderText from './hoc/withScreenReaderText';

const ListWrapper = styled.ul`
	${({ theme: { media } }) => css`
		${media.sm} {
			flex-wrap: nowrap;
		}
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		list-style: none;
	`}
`;

const SocialItem = styled.li`
	${({ theme: { media, vr } }) => css`
		${media.sm} {
			&:not(:last-child) {
				margin-right: ${vr.one.em};
			}
			flex: 0 0 auto;
			padding: 0;
		}	
		flex-basis: 33%;
		max-width: 33%;
		padding: ${vr.half.em};
	`}
`;

const SocialLink = styled.a`
	${({ theme: { vr, color, utils } }) => css`
		padding: ${vr.half.em};
		border-radius: ${utils.pxToEm(5)};
		color: ${color.ghostlyPurple};
		transition: 0.15s ease-in-out;
		svg,
		& {
			display: block;
		}
		svg {
			margin: 0 auto;
		}
		&:hover {
			background-color: ${color.eastSidePurple};
		}
	`}
`;

const Twitter = withScreenReaderText(TwitterIcon, 'Twitter');
const LinkedIn = withScreenReaderText(LinkedInIcon, 'LinkedIn');
const GitHub = withScreenReaderText(GitHubIcon, 'GitHub');
const Instagram = withScreenReaderText(InstagramIcon, 'Instagram');
const Dribbble = withScreenReaderText(DribbbleIcon, 'Dribbble');
const Unsplash = withScreenReaderText(UnsplashIcon, 'Unsplash');

type Site =
	| 'Twitter'
	| 'LinkedIn'
	| 'GitHub'
	| 'Instagram'
	| 'Dribbble'
	| 'Unsplash';

const siteToIconMap = new Map<Site, JSX.Element>();
siteToIconMap.set('Twitter', <Twitter />);
siteToIconMap.set('LinkedIn', <LinkedIn />);
siteToIconMap.set('GitHub', <GitHub />);
siteToIconMap.set('Instagram', <Instagram />);
siteToIconMap.set('Dribbble', <Dribbble />);
siteToIconMap.set('Unsplash', <Unsplash />);

interface SocialLinkProps {
	data: {
		url: string;
		site: Site;
		id: string;
	}[];
}

function SocialLinks({ data }: SocialLinkProps) {
	return (
		<nav>
			<ListWrapper>
				{data.map(({ url, site, id }) => {
					const Icon = siteToIconMap.get(site);
					return (
						<SocialItem key={id}>
							<SocialLink href={url}>{Icon}</SocialLink>
						</SocialItem>
					);
				})}
			</ListWrapper>
		</nav>
	);
}

export default SocialLinks;
