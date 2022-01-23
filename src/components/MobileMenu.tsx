import React, { useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useStaticQuery, graphql, Link as GatsbyLink } from 'gatsby';
import {
	Menu,
	MenuButton,
	MenuItems,
	MenuPopover,
	MenuLink,
	useMenuButtonContext,
} from '@reach/menu-button';
import withScreenReaderText from './hoc/withScreenReaderText';
import { CloseIcon, HamburgerIcon } from './icons';

const StyledMenuPopover = styled(MenuPopover)`
	left: 0 !important;
	width: 100%;
	height: 100%;
	background-color: ${(p) => p.theme.color.haitiPurple};
	z-index: 2;
`;

const StyledMenuItems = styled(MenuItems)`
	background-color: ${(p) => p.theme.color.haitiPurple};
	border: 0;
`;

const StyledMenuButton = styled(MenuButton)`
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: ${(p) => p.theme.color.white};
`;

const StyledMenuLink = styled(MenuLink)`
	padding: ${(p) => p.theme.vr.one.em};
	text-transform: uppercase;
	letter-spacing: ${(p) => p.theme.utils.pxToEm(1)};
	font-weight: 700;
	color: ${(p) => p.theme.color.white500};
	border-top: ${(p) => p.theme.utils.pxToEm(2)} solid
		${(p) => p.theme.color.white100};
	&:last-child {
		border-bottom: ${(p) => p.theme.utils.pxToEm(2)} solid
			${(p) => p.theme.color.white100};
	}
	&:hover {
		background-color: ${(p) => p.theme.color.eastSidePurple};
		color: ${(p) => p.theme.color.grapePurple};
	}
`;

const Wrapper = styled.div`
	${({ theme }) => `${theme.media.sm} {
    display: none;
  }`}
`;

function MenuIcon({ isExpanded }: { isExpanded: boolean }) {
	const ContractIcon = withScreenReaderText(CloseIcon, 'Contract Mobile Menu');
	const ExpandIcon = withScreenReaderText(HamburgerIcon, 'Expand Mobile Menu');
	return isExpanded ? <ContractIcon /> : <ExpandIcon />;
}

function MobileMenuInner() {
	const { isExpanded } = useMenuButtonContext();
	const activeBodyClass = 'has-expanded-mobile-menu';

	useEffect(() => {
		if (isExpanded) {
			document.body.classList.add(activeBodyClass);
		} else {
			document.body.classList.remove(activeBodyClass);
		}
	}, [isExpanded]);

	const {
		site: {
			siteMetadata: { menuLinks },
		},
	} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					menuLinks {
						text
						path
					}
				}
			}
		}
	`);

	return (
		<>
			<StyledMenuButton>
				<MenuIcon isExpanded={isExpanded} />
			</StyledMenuButton>
			<StyledMenuPopover>
				<StyledMenuItems>
					{menuLinks.map(({ text, path }: { text: string; path: string }) => (
						<StyledMenuLink as={GatsbyLink} to={path} key={uuidv4()}>
							{text}
						</StyledMenuLink>
					))}
				</StyledMenuItems>
			</StyledMenuPopover>
		</>
	);
}

function MobileMenu() {
	return (
		<Wrapper>
			<Menu>
				<MobileMenuInner />
			</Menu>
		</Wrapper>
	);
}

export default MobileMenu;