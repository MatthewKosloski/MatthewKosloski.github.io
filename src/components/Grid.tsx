import styled from 'styled-components';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${p => `repeat(${p.theme.grid.numberColumns}, 1fr)`};
  grid-gap: ${p => p.theme.vr.one.rem};
`;

export default Grid;
