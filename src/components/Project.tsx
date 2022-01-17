import React from 'react';
import styled, { css } from 'styled-components';
import { lg } from '../theme';
import { Flex, FlexCol, Grid, GridCol, SubSectionHeader } from '.';

interface ProjectProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  featuredComponent: React.ReactNode;
  buttonPrimary?: any;
  buttonSecondary?: any;
  featureOnLeft?: boolean;
}

const Wrapper = styled.article`
  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.vr.two.rem};
  }
`;

const PrimaryBtnFlexCol = styled(FlexCol)`
  margin-right: ${(p) => p.theme.vr.one.rem};
`;

const ContentGridCol = styled(GridCol)`
  display: flex;
  flex-direction: column;
`;

const FeaturedComponentGridCol = styled(GridCol)`
  ${lg(css`
    margin-top: ${(p) => `-${p.theme.vr.two.rem}`};
  `)}
`;

function Project({
  title,
  subtitle,
  children,
  featuredComponent,
  buttonPrimary,
  buttonSecondary,
  featureOnLeft = false,
}: ProjectProps) {
  return (
    <Wrapper>
      <Grid>
        <GridCol xs={12} lg={6} lgOffset={featureOnLeft ? 7 : 0}>
          <SubSectionHeader>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
          </SubSectionHeader>
        </GridCol>
      </Grid>
      <Grid>
        <ContentGridCol
          xs={12}
          lg={6}
          orderInitialLg={!featureOnLeft}
          orderLastLg={featureOnLeft}
          orderLastXs
        >
          {children}
          {buttonPrimary && buttonSecondary ? (
            <Flex>
              {buttonPrimary && (
                <PrimaryBtnFlexCol xs={12} sm={6} widthAutoMd>
                  {buttonPrimary}
                </PrimaryBtnFlexCol>
              )}
              {buttonSecondary && (
                <FlexCol xs={12} sm={6} widthAutoMd>
                  {buttonSecondary}
                </FlexCol>
              )}
            </Flex>
          ) : null}
        </ContentGridCol>
        <FeaturedComponentGridCol xs={12} lg={6} alignCenterXs>
          {featuredComponent}
        </FeaturedComponentGridCol>
      </Grid>
    </Wrapper>
  );
}

export default Project;
