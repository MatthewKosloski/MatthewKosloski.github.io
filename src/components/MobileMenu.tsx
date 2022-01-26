import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { css } from 'styled-components';
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
	${({ theme: { color, media }}) => css`
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
						id
					}
				}
			}
		}
	`);

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
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{
								duration: 0.15,
								ease: 'linear',
							}}
						>
							<StyledMenuItems>
								{menuLinks.map(
									({
										text,
										path,
										id,
									}: {
										text: string;
										path: string;
										id: string;
									}) => {
										return (
											// Must use a class here because a styled component
											// will break the accessible navigation controls
											<MenuLink
												key={id}
												className="mobile-menu-link"
												as={GatsbyLink}
												to={path}
											>
												{text}
											</MenuLink>
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

function MobileMenu() {
	return (
		<Menu>
			<MobileMenuInner />
		</Menu>
	);
}

export default MobileMenu;
