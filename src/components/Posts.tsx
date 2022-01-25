import React from 'react';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

export interface PostsProps {
	data: {
		frontmatter: {
			title: string;
			date: string;
		};
		id: string;
		slug: string;
	}[];
	slugPrefix?: string;
}

const StyledLink = styled(GatsbyLink)`
	${({ theme: { vr, color, typography, utils } }) => css`
		display: block;
		text-decoration: none;
		padding: ${vr.one.rem};
		color: ${color.gray600};
		font-size: ${typography.smallFontSizeRem};
		border-radius: ${utils.pxToEm(6)};
		transition: background-color 0.15s ease-in-out;
		h3 {
			color: ${color.ghostlyPurple};
			margin-bottom: ${vr.half.rem};
		}
		&:hover {
			background-color: ${color.gray50};
		}
	`}
`;

function Posts({ data, slugPrefix = '' }: PostsProps) {
	return (
		<div>
			{data.map(({ frontmatter, id, slug }) => (
				<article key={id}>
					<StyledLink to={`${slugPrefix}${slug}`}>
						<h3>{frontmatter.title}</h3>
						<p>{frontmatter.date}</p>
					</StyledLink>
				</article>
			))}
		</div>
	);
}

export default Posts;
