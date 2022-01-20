import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section<{ borderBottom: boolean }>`
  border-bottom: ${({ borderBottom, theme }) =>
    borderBottom
      ? `${(p) => p.theme.utils.pxToEm(1)} solid ${theme.color.gray50}`
      : `none`};
  padding: ${(p) => p.theme.vr.two.rem} ${(p) => p.theme.vr.one.em};

  ${({ theme }) => `${theme.media.sm} {
    padding: ${theme.vr.four.rem} ${theme.vr.two.rem};
  }`}
`;

const TitleWrapper = styled.div`
  margin-bottom: ${(p) => p.theme.vr.three.rem};
`;

const StyledTitle = styled.div`
  margin-bottom: 0;
  font-size: 1rem;
  text-align: center;
`;

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  titleAs?: string;
  as?: string | React.ComponentType<any>;
  borderBottom?: boolean;
}

function Section({
  title,
  children,
  titleAs = 'h2',
  as = 'section',
  borderBottom = true,
  ...props
}: SectionProps & HTMLAttributes<any>) {
  return (
    <SectionWrapper as={as} borderBottom {...props}>
      {title && (
        <TitleWrapper>
          <StyledTitle as={titleAs}>{title}</StyledTitle>
        </TitleWrapper>
      )}
      {children}
    </SectionWrapper>
  );
}

export default Section;
