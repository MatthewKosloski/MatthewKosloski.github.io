module.exports = {
	siteMetadata: {
		siteUrl: 'https://matthewkosloski.me',
		title: 'Matthew Kosloski &mdash; Software Developer',
		description:
			'Matthew Kosloski is a Software Developer based in Chicago, Illinois.',
		social: {
			twitter: '@_mkos',
			cardUrl: '/public/static/matthew-kosloski-social-card.jpg',
		},
		menuLinks: [
			{
				text: 'Overview',
				path: '/',
			},
			{
				text: 'Experience',
				path: '/experience',
			},
			{
				text: 'Projects',
				path: '/projects',
			},
			{
				text: 'Photos',
				path: '/photos',
			},
			{
				text: 'Blog',
				path: '/blog',
			},
		],
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-sass',
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-mdx'
	],
};
