import styled, { css } from 'styled-components';

const Grid = styled.div`
	${({ theme: { vr, grid } }) => css`
		width: 100%;
		display: grid;
		grid-template-columns: repeat(${grid.numberColumns}, 1fr);
		grid-gap: ${vr.one.rem};
	`}
`;

export default Grid;
