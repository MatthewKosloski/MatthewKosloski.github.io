import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { SubSectionHeader } from '.';
import { SubSectionHeaderVariant } from './SubSectionHeader';

const Item = styled.li`
  list-style: none;
  padding: 0;
  position: relative;
  display: flex;
  align-items: center;
  &:last-child > :last-child {
    padding-bottom: ${(p) => p.theme.vr.one.rem};
  }
`;

const FromTo = styled.small`
  color: ${(p) => p.theme.color.gray600};
  display: inline-block;
  width: 15%;
  span {
    margin: 0 ${(p) => p.theme.vr.quarter.rem};
    &:after {
      content: '';
      display: block;
    }
  }
`;

const Summary = styled.div<{ isFirst: boolean }>`
  position: relative;
  width: 85%;
  padding: 0 0 ${(p) => p.theme.vr.three.rem}
    calc(${(p) => p.theme.vr.one.rem} + 16px + ${(p) => p.theme.vr.one.rem});
  &:before {
    content: '';
    position: absolute;
    background-color: ${(p) => (p.isFirst ? '#d3d3d3' : p.theme.color.white)};
    border: 2px solid #d4d4d4;
    border-radius: 100px;
    width: 16px;
    height: 16px;
    left: ${(p) => p.theme.vr.one.rem};
    top: 8px;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    background-color: #d4d4d4;
    width: 2px;
    height: 100%;
    left: calc(${(p) => p.theme.vr.one.rem} + 8px - 0.5px);
    top: 8px;
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
                {description.split('\n').map((d) => (
                  <p key={uuidv4()}>{d}</p>
                ))}
              </Summary>
            </Item>
          );
        }
      )}
    </ul>
  );
}

export default Timeline;
