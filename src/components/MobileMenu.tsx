import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import {
	Menu,
	MenuButton,
	MenuItems,
	MenuPopover,
	MenuLink as ReachMenuLink,
	useMenuButtonContext,
} from '@reach/menu-button';
import withScreenReaderText from './hoc/withScreenReaderText';
import { CloseIcon, HamburgerIcon } from './icons';
import { MenuLink } from '../hooks/useMenuLinks';

const StyledMenuItems = styled(MenuItems)`
	${({ theme: { color } }) => css`
		width: 100%;
		height: 100%;
		background-color: ${color.haitiPurple};
		border: 0;
		z-index: 3;
	`}
`;

const StyledMenuButton = styled(MenuButton)`
	${({ theme: { color, media } }) => css`
		${media.sm} {
			display: none;
		}
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: ${color.white};
	`}
`;

const ContractIcon = withScreenReaderText(CloseIcon, 'Contract Mobile Menu');
const ExpandIcon = withScreenReaderText(HamburgerIcon, 'Expand Mobile Menu');

function MobileMenuInner({ menuLinks }: MobileMenuProps) {
	const { isExpanded } = useMenuButtonContext();
	const activeBodyClass = 'has-expanded-mobile-menu';

	useEffect(() => {
		if (isExpanded) {
			document.body.classList.add(activeBodyClass);
		} else {
			document.body.classList.remove(activeBodyClass);
		}
	}, [isExpanded]);

	return (
		<>
			<StyledMenuButton>
				{isExpanded ? <ContractIcon /> : <ExpandIcon />}
			</StyledMenuButton>
			<AnimatePresence>
				{isExpanded ? (
					<MenuPopover
						style={{
							left: 0,
							right: 0,
							bottom: 0,
							display: 'block',
							zIndex: 2,
						}}
					>
						<motion.div
							style={{ height: '100%' }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.15,
								ease: 'linear',
							}}
						>
							<StyledMenuItems>
								{menuLinks.map(
									(
										{
											text,
											path,
											id,
										}: {
											text: string;
											path: string;
											id: string;
										},
										i: number
									) => {
										return (
											// Must use a class here because a styled component
											// will break the accessible navigation controls
											<motion.div
												initial={{ translateX: -999 }}
												animate={{ translateX: 0 }}
												exit={{ translateX: 0 }}
												transition={{
													delay: i === 0 ? 0.15 : 0.15 * i,
													duration: 0.3,
													ease: 'linear',
												}}
												key={id}
												className="mobile-menu-link-wrapper"
											>
												<ReachMenuLink as={GatsbyLink} to={path}>
													{text}
												</ReachMenuLink>
											</motion.div>
										);
									}
								)}
							</StyledMenuItems>
						</motion.div>
					</MenuPopover>
				) : null}
			</AnimatePresence>
		</>
	);
}

interface MobileMenuProps {
	menuLinks: MenuLink[];
}

function MobileMenu({ menuLinks }: MobileMenuProps) {
	return (
		<Menu>
			<MobileMenuInner menuLinks={menuLinks} />
		</Menu>
	);
}

export default MobileMenu;
