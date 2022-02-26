import { graphql, useStaticQuery } from 'gatsby';

function useMenuLinks() {
	const {
		site: {
			siteMetadata: { menuLinks },
		},
		allMdx: { nodes: indexableBlogPosts },
	} = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					menuLinks {
						text
						path
						id
					}
				}
			}
			allMdx(filter: { frontmatter: { indexable: { eq: true } } }) {
				nodes {
					id
				}
			}
		}
	`);

	let filteredMenuLinks = [...menuLinks];
	if (indexableBlogPosts.length === 0) {
		filteredMenuLinks = menuLinks.filter(
			(link: { text: string; path: string }) => link.path !== '/blog'
		);
	}

	return filteredMenuLinks;
}

export default useMenuLinks;
