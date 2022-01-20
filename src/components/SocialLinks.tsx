import * as React from 'react';
import styled from 'styled-components';
import {
  DribbbleIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  UnsplashIcon,
} from './icons';
import withScreenReaderText from './hoc/withScreenReaderText';

const ListWrapper = styled.ul`
  ${({ theme }) => `${theme.media.sm} {
    flex-wrap: nowrap;
  }`}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

const SocialItem = styled.li`
  ${({ theme }) => `${theme.media.sm} {
    &:not(:last-child) {
      margin-right: ${theme.vr.one.em};
    }
    flex: 0 0 auto;
    padding: 0;
  }`}
  flex-basis: 33%;
  max-width: 33%;
  padding: ${(p) => p.theme.vr.half.em};
`;

const SocialLink = styled.a`
  padding: ${(p) => p.theme.vr.half.em};
  border-radius: ${(p) => p.theme.utils.pxToEm(5)};
  color: ${(p) => p.theme.color.ghostlyPurple};
  transition: 0.15s ease-in-out;
  svg,
  & {
    display: block;
  }
  svg {
    margin: 0 auto;
  }
  &:hover {
    background-color: #b795d0;
  }
`;

const Twitter = withScreenReaderText(TwitterIcon, 'Twitter');
const LinkedIn = withScreenReaderText(LinkedInIcon, 'LinkedIn');
const GitHub = withScreenReaderText(GitHubIcon, 'GitHub');
const Instagram = withScreenReaderText(InstagramIcon, 'Instagram');
const Dribbble = withScreenReaderText(DribbbleIcon, 'Dribbble');
const Unsplash = withScreenReaderText(UnsplashIcon, 'Unsplash');

function SocialLinks() {
  return (
    <nav>
      <ListWrapper>
        <SocialItem>
          <SocialLink href="">
            <Twitter />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink href="">
            <LinkedIn />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink href="">
            <GitHub />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink href="">
            <Instagram />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink href="">
            <Dribbble />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink href="">
            <Unsplash />
          </SocialLink>
        </SocialItem>
      </ListWrapper>
    </nav>
  );
}

export default SocialLinks;
