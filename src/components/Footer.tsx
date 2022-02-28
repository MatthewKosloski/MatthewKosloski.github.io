import React from 'react';
import styled, { css } from 'styled-components';
import { useSocialLinks } from '../hooks';
import { Section, Grid, GridCol, SocialLinks, Wrapper } from '.';

const SocialMediaLinkSection = styled(Section).attrs(() => ({
	as: 'footer',
	borderBottom: true,
}))`
	${({ theme: { vr } }) => css`
		padding: ${vr.two.rem};
		padding-bottom: 0;
	`}
`;

const SmallTextWrapper = styled.div`
	${({ theme: { vr } }) => css`
		text-align: center;
		padding: ${vr.two.rem} ${vr.half.rem};
	`}
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
