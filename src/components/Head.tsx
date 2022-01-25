import * as React from 'react';
import { Helmet } from 'react-helmet';
import { WindowLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

interface HeadProps {
	description?: string;
	meta?: JSX.IntrinsicElements['meta'][];
	isArticle?: boolean;
	title?: string;
	location: WindowLocation;
}

function Head({
	location,
	title = '',
	description = '',
	meta = [{}],
	isArticle = false,
}: HeadProps) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						siteUrl
						title
						description
						social {
							twitter
							cardUrl
						}
					}
				}
			}
		`
	);

	const metaDescription = description || site.siteMetadata.description;
	const defaultTitle = site.siteMetadata?.title;
	const canonicalUrl = `${site.siteMetadata.siteUrl}${location.pathname}`;

	return (
		<Helmet
			htmlAttributes={{
				lang: 'en-US',
			}}
			title={title ? `${title} | ` : ` `}
			titleTemplate={defaultTitle ? `%s ${defaultTitle}` : undefined}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:url`,
					content: canonicalUrl,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:image`,
					content: site.siteMetadata?.social?.cardUrl || ``,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: isArticle ? `article` : `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata?.social?.twitter || ``,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(meta)}
		/>
	);
}

export default Head;
