import React, { createElement, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { pxToEm, sm } from '../theme';

const SectionWrapper = styled.section.attrs(
  ({
    forwardedAs,
    borderBottom,
  }: {
    forwardedAs: string;
    borderBottom: boolean;
  }) => ({
    as: forwardedAs,
    borderBottom,
  })
)`
  border-bottom: ${({ borderBottom, theme }) =>
    borderBottom ? `${pxToEm(1)} solid ${theme.color.gray50}` : `none`};
  padding: ${(p) => p.theme.vr.two.rem} ${(p) => p.theme.vr.one.em};
  ${sm(css`
    padding: ${(p) => p.theme.vr.four.rem} ${(p) => p.theme.vr.two.rem};
  `)};
`;

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  titleAs?: string;
  as?: string | React.ComponentType<any>;
  borderBottom?: boolean;
}

const TitleWrapper = styled.div`
  margin-bottom: ${(p) => p.theme.vr.three.rem};
`;

function Section({
  title,
  children,
  titleAs = 'h2',
  as = 'section',
  borderBottom = true,
  ...props
}: SectionProps & HTMLAttributes<any>) {
  return (
    <SectionWrapper forwardedAs={as} borderBottom {...props}>
      {title && (
        <TitleWrapper>
          {createElement(
            titleAs,
            {
              style: { marginBottom: 0, fontSize: '1rem', textAlign: 'center' },
            },
            title
          )}
        </TitleWrapper>
      )}
      {children}
    </SectionWrapper>
  );
}

export default Section;
