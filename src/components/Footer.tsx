import React from 'react';
import styled from 'styled-components';
import { useSocialLinks } from '../hooks';
import { Section, Grid, GridCol, SocialLinks, Wrapper } from '.';

const SocialMediaLinkSection = styled(Section).attrs(() => ({
	as: 'footer',
	borderBottom: true,
}))`
	padding: ${(p) => p.theme.vr.two.rem};
	padding-bottom: 0;
`;

const SmallTextWrapper = styled.div`
	text-align: center;
	padding: ${(p) => p.theme.vr.two.rem} ${(p) => p.theme.vr.half.rem};
`;

function Footer() {
	const socialLinks = useSocialLinks();
	return (
		<Wrapper isNewspaper={false}>
			<SocialMediaLinkSection>
				<Grid>
					<GridCol xs={12} sm={8} smOffset={3}>
						<SocialLinks data={socialLinks} />
					</GridCol>
				</Grid>
			</SocialMediaLinkSection>
			<SmallTextWrapper>
				<p>
					<small>
						This website is{' '}
						<a href="https://github.com/MatthewKosloski/MatthewKosloski.github.io">
							open source
						</a>{' '}
						on GitHub. Feel free to fork it!
					</small>
				</p>
			</SmallTextWrapper>
		</Wrapper>
	);
}

export default Footer;
