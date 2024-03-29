import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { SubSectionHeader } from '.';
import { SubSectionHeaderVariant } from './SubSectionHeader';

const pointSize = 16;
const lineSize = 2;

const Wrapper = styled.div`
	margin-bottom: ${(p) => p.theme.vr.one.rem};
`;

const Item = styled.li`
	list-style: none;
	padding: 0;
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: column;
	${({ theme }) => `${theme.media.sm} {
    flex-direction: row;
  }`}
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
	${({ theme }) => `${theme.media.sm} {
    width: 15%;
    padding-left: 0;
    position: static;
  }`}
	span {
		margin: 0 ${(p) => p.theme.vr.quarter.rem};
		&:after {
			content: '';
			display: inline-block;
			${({ theme }) => `${theme.media.sm} {
        display: block;
      }`}
		}
	}
`;

const Summary = styled.div<{ isFirst: boolean }>`
	position: relative;
	width: 100%;
	padding: 0 0 ${(p) => p.theme.vr.three.rem}
		calc(${pointSize}px + ${(p) => p.theme.vr.one.rem});
	${({ theme }) => `${theme.media.sm} {
    padding-left: calc(${pointSize}px + ${theme.vr.two.rem});
    width: 85%;
  }`}
	&:before {
		content: '';
		position: absolute;
		background-color: ${(p) =>
			p.isFirst ? p.theme.color.gray200Hex : p.theme.color.white};
		border: ${(p) => p.theme.utils.pxToEm(lineSize)} solid
			${(p) => p.theme.color.gray200Hex};
		border-radius: 100px;
		width: ${pointSize}px;
		height: ${pointSize}px;
		left: 0;
		top: ${pointSize / 2}px;
		${({ theme }) => `${theme.media.sm} {
      left: ${theme.vr.one.rem};
    }`}
		z-index: 1;
	}
	&:after {
		content: '';
		position: absolute;
		background-color: ${(p) => p.theme.color.gray200Hex};
		width: ${(p) => p.theme.utils.pxToEm(lineSize)};
		height: 100%;
		left: calc(${pointSize / 2}px);
		top: ${pointSize / 2}px;
		${({ theme }) => `${theme.media.sm} {
      left: calc(${theme.vr.one.rem} + ${pointSize / 2}px);
    }`}
	}
`;

function getShortMonthName(date: Date) {
	return date.toLocaleString('default', { month: 'short' });
}

function truncateYear(year: number) {
	return `'${String(year).substring(2)}`;
}

type TimelineData = TimelineDatum[];

interface TimelineDatum {
	title: string;
	subtitle: string;
	description: string;
	date: {
		from: string;
		to?: string;
	};
}

interface TimelineProps {
	dataSource: { data: TimelineData };
	limit?: number;
}

function Timeline({ dataSource: { data }, limit = 0 }: TimelineProps) {
	const isValidLimit = limit > 0 && limit < data.length;
	const limitedDataSource = isValidLimit ? data.slice(0, limit) : data;
	return (
		<Wrapper>
			<ul>
				{limitedDataSource.map(({ title, subtitle, description, date }, i) => {
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
				})}
			</ul>
		</Wrapper>
	);
}

export default Timeline;
