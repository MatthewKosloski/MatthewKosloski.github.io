import styled from 'styled-components';

interface WrapperProps {
  isNewspaper?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(p) => p.theme.wrapper.width};
  max-width: 100%;
  margin: 0 auto;
  box-shadow: ${(p) =>
    p.isNewspaper ? '0px 0px 4px 0px rgb(0 0 0 / 10%)' : 'none'};
  background-color: ${(p) =>
    p.isNewspaper ? p.theme.color.white : 'transparent'};
`;

Wrapper.defaultProps = {
  isNewspaper: true,
};

export default Wrapper;
