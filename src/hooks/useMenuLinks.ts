import { graphql, useStaticQuery } from 'gatsby';

export interface MenuLink {
	text: string;
	path: string;
	id: string;
}

function useMenuLinks(): MenuLink[] {
	const {
		site: {
			siteMetadata: { menuLinks },
		},
		allMdx: { totalCount },
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
				totalCount
			}
		}
	`);

	let filteredMenuLinks = [...menuLinks];
	if (totalCount === 0) {
		filteredMenuLinks = menuLinks.filter(
			(link: { text: string; path: string }) => link.path !== '/blog'
		);
	}

	return filteredMenuLinks;
}

export default useMenuLinks;
