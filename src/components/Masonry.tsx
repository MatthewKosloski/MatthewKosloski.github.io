import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

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
		.gatsby-image-wrapper--small {
			grid-row: span 5;
		}
	
		.gatsby-image-wrapper--large {
			grid-row: span 10;
		}
	`}
`;

function Masonry() {
	return (
		<Wrapper>
			<StaticImage
				src="../images/photos/thumbnail-bliss-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-antelope-canyone-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--large"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-birch-forest-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-frog-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--large"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-grand-canyon-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-yosemite-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-moon-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--large"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-monsoon-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-rabbit-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--large"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-san-francisco-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
			<StaticImage
				src="../images/photos/thumbnail-michigan-matthew-kosloski.jpg"
				alt=""
				placeholder="blurred"
				imgClassName="masonry-img"
				className="gatsby-image-wrapper--small"
				loading="lazy"
			/>
		</Wrapper>
	);
}

export default Masonry;
