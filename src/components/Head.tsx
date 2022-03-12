import * as React from 'react';
import { Helmet } from 'react-helmet';
import { WindowLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import favicon from '../assets/favicon-32x32.png';

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
						name
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
	const defaultTitle = site.siteMetadata.title;
	const canonicalUrl = `${site.siteMetadata.siteUrl}${location.pathname}`;

	const schemaOrgJSONLD = {
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		name: defaultTitle,
		description: metaDescription,
		url: canonicalUrl,
		publisher: {
			'@type': 'Person',
			name: site.siteMetadata.name,
		},
	};

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
			].concat(meta)}>
				<link rel="shortcut icon" type="image/png" href={favicon} />
				<script type="application/ld+json">
					{JSON.stringify(schemaOrgJSONLD)}
				</script>
		</Helmet>
	);
}

export default Head;
