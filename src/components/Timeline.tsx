import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { SubSectionHeader } from '.';
import { SubSectionHeaderVariant } from './SubSectionHeader';
import { sm } from '../theme';

const pointSize = 16;

const Item = styled.li`
  list-style: none;
  padding: 0;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${sm(css`
    flex-direction: row;
  `)}
  &:last-child > :last-child {
    padding-bottom: ${(p) => p.theme.vr.one.rem};
  }
`;

const FromTo = styled.small`
  color: ${(p) => p.theme.color.gray600};
  display: inline-block;
  padding-left: calc(${pointSize}px + ${(p) => p.theme.vr.one.rem});
  position: absolute;
  left: 0;
  top: -${(p) => p.theme.vr.one.rem};
  ${sm(css`
    width: 15%;
    padding-left: 0;
    position: static;
  `)}
  span {
    margin: 0 ${(p) => p.theme.vr.quarter.rem};
    &:after {
      content: '';
      display: inline-block;
      ${sm(css`
        display: block;
      `)}
    }
  }
`;

const Summary = styled.div<{ isFirst: boolean }>`
  position: relative;
  width: 100%;
  ${sm(css`
    width: 85%;
  `)}
  padding: 0 0 ${(p) => p.theme.vr.three.rem}
    calc(${pointSize}px + ${(p) => p.theme.vr.one.rem});
  ${sm(css`
    padding-left: calc(${pointSize}px + ${(p) => p.theme.vr.two.rem});
  `)}
  &:before {
    content: '';
    position: absolute;
    background-color: ${(p) => (p.isFirst ? '#d3d3d3' : p.theme.color.white)};
    border: 2px solid #d4d4d4;
    border-radius: 100px;
    width: ${pointSize}px;
    height: ${pointSize}px;
    left: 0;
    top: ${pointSize / 2}px;
    ${sm(css`
      left: ${(p) => p.theme.vr.one.rem};
    `)}
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    background-color: #d4d4d4;
    width: 2px;
    height: 100%;
    left: calc(${pointSize / 2}px - 0.5px);
    top: ${pointSize / 2}px;
    ${sm(css`
      left: calc(${(p) => p.theme.vr.one.rem} + ${pointSize / 2}px - 0.5px);
    `)}
  }
`;

interface TimelineProps {
  dataSource: { experiences: Experiences };
}

function getShortMonthName(date: Date) {
  return date.toLocaleString('default', { month: 'short' });
}

function truncateYear(year: number) {
  return `'${String(year).substring(2)}`;
}

function Timeline({ dataSource }: TimelineProps) {
  return (
    <ul>
      {dataSource.experiences.map(
        ({ title, subtitle, description, date }, i) => {
          const fromDate = new Date(date.from);
          const toDate = new Date(date.to ?? '');
          return (
            <Item key={uuidv4()}>
              <FromTo>
                {getShortMonthName(fromDate)}{' '}
                {truncateYear(fromDate.getFullYear())} <span>&mdash;</span>{' '}
                {date.to
                  ? `${getShortMonthName(toDate)} ${truncateYear(
                      toDate.getFullYear()
                    )}`
                  : 'Present'}
              </FromTo>
              <Summary isFirst={i === 0}>
                <SubSectionHeader variant={SubSectionHeaderVariant.SMALL}>
                  <h3>{title}</h3>
                  <h4>{subtitle}</h4>
                </SubSectionHeader>
                {description
                  .split('\n')
                  .map((d) => (d.trim() ? <p key={uuidv4()}>{d}</p> : null))}
              </Summary>
            </Item>
          );
        }
      )}
    </ul>
  );
}

export default Timeline;
