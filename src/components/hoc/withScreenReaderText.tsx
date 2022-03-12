import VisuallyHidden from '@reach/visually-hidden';
import React from 'react';

function withScreenReaderText<TWrappedComponentProps>(
	WrappedComponent: React.ComponentType<TWrappedComponentProps>,
	text: string
) {
	return (props: TWrappedComponentProps) => (
		<>
			<VisuallyHidden>{text}</VisuallyHidden>
			<WrappedComponent {...props} />
		</>
	);
}

export default withScreenReaderText;
