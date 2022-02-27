module.exports = {
	siteMetadata: {
		siteUrl: 'https://matthewkosloski.me',
		title: 'Matthew Kosloski, Software Developer',
		description:
			'Matthew Kosloski is a Software Developer based in Chicago, Illinois.',
		social: {
			twitter: '@_mkos',
			cardUrl: '/public/static/matthew-kosloski-social-card.jpg',
		},
		menuLinks: [
			{
				id: '6bfe0321-8b8f-4c87-94f5-905a857cb314',
				text: 'Overview',
				path: '/',
			},
			{
				id: 'c7399c64-19fc-4578-9f64-71c6a46bba87',
				text: 'Experience',
				path: '/experience',
			},
			{
				id: '2b536de4-f479-4924-9e60-ebd74c189686',
				text: 'Projects',
				path: '/projects',
			},
			{
				id: '1d4dc368-579f-4caa-a440-71b7295be7ac',
				text: 'Photos',
				path: '/photos',
			},
			{
				id: 'c4db28f2-b860-43ca-8ba0-5677b0782bb6',
				text: 'Blog',
				path: '/blog',
			},
		],
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-mdx',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'blog',
				path: `${__dirname}/content/blog`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/content/images`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'photography',
				path: `${__dirname}/content/photography`,
			},
		},
	],
};
