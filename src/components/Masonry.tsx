import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const Wrapper = styled.div`
	${({ theme: { media, vr, utils } }) => `
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: ${vr.one.rem};
		grid-gap: ${vr.one.rem};
		${media.md} {
			grid-template-columns: repeat(2, 1fr);
		}
		${media.lg} {
			grid-template-columns: repeat(3, 1fr);
		}
		.gatsby-image-wrapper {
			border-radius: ${utils.pxToEm(6)};
		}
		.gatsby-image-wrapper--short {
			grid-row: span 10;
			${media.md} {
				grid-row: span 5;
			}
		}
	
		.gatsby-image-wrapper--tall {
			grid-row: span 10;
		}
	`}
`;

interface MasonryDatum {
	frontmatter: {
		alt: string;
		masonry_size: string;
		image: {
			childrenImageSharp: {
				gatsbyImageData: IGatsbyImageData;
			}[];
		};
	};
	id: string;
}

interface MasonryData {
	allMdx: {
		nodes: MasonryDatum[];
	};
}

export interface MasonryProps {
	data: MasonryData;
}

function renderMasonryItem({
	id,
	frontmatter: { image, alt, masonry_size },
}: MasonryDatum) {
	return (
		<GatsbyImage
			key={id}
			image={image.childrenImageSharp[0].gatsbyImageData}
			alt={alt}
			className={`gatsby-image-wrapper--${
				masonry_size === 'short' ? 'short' : 'tall'
			}`}
			loading="lazy"
		/>
	);
}

function Masonry({ data }: MasonryProps) {
	return (
		<Wrapper>
			{data.allMdx.nodes.map((node) => renderMasonryItem(node))}
		</Wrapper>
	);
}

export default Masonry;
