import { graphql, useStaticQuery } from 'gatsby';

function useSocialLinks() {
	const {
		site: {
			siteMetadata: { socialLinks },
		},
	} = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					socialLinks {
						id
						url
						site
					}
				}
			}
		}
	`);

	return socialLinks;
}

export default useSocialLinks;
