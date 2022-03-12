import styled from 'styled-components';

interface WrapperProps {
	isFilled?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	${({ theme: { wrapper, color }, isFilled }) => `
		width: ${wrapper.width};
		max-width: 100%;
		margin: 0 auto;
		box-shadow: ${isFilled ? '0px 0px 4px 0px rgb(0 0 0 / 10%)' : 'none'};
		background-color: ${isFilled ? color.white : 'transparent'};
	`}
`;

Wrapper.defaultProps = {
	isFilled: true,
};

export default Wrapper;
