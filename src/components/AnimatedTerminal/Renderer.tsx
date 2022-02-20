import React from 'react';
import Terminal from './Terminal';
import contentGenerator, { TerminalContent } from './terminalContentGenerator';

export interface Command {
	cmd: string;
	delayAfterCmd: number;
	outputLines: string[];
}

export interface RendererProps {
	commands: Command[];
	speed?: number;
	delay?: number;
	preStyles?: React.CSSProperties;
}

function Renderer({
	commands,
	preStyles = {},
	speed = 45,
	delay = 1000,
}: RendererProps) {
	const intervalRef = React.useRef<number>();
	const timeoutRef = React.useRef<number>();
	const iterator = React.useRef<Generator<TerminalContent, undefined>>();

	const [content, setContent] = React.useState<TerminalContent[]>([]);
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

	React.useEffect(() => {
		iterator.current = contentGenerator(commands);
	}, [commands]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setIsPlaying(true);
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay, setIsPlaying]);

	React.useEffect(() => {
		if (isPlaying && iterator.current) {
			intervalRef.current = window.setInterval(function fetchNextValue() {
				const { value, done } = iterator.current!.next();

				if (done) {
					cleanup();
				} else if (value?.isLastCharOfCmd && value.delayAfterCmd) {
					clearInterval(intervalRef.current);
					// This is the last character of the command, so we will
					// delay for delayAfterCmd milliseconds before recreating
					// the interval.
					timeoutRef.current = window.setTimeout(() => {
						clearTimeout(timeoutRef.current);
						intervalRef.current = window.setInterval(fetchNextValue, speed);
					}, value.delayAfterCmd);
				} else if (value && content.length) {
					// This is not the first time that we're populating the content array
					value.isCurrent = true;
					setContent([
						...content.slice(0, content.length - 1),
						{
							// Make the last item not current
							...content[content.length - 1],
							isCurrent: false,
						},
						value,
					]);
				} else if (value) {
					// This is the first time that we're populating the content array
					value.isCurrent = true;
					setContent([...content, value]);
				}
			}, speed);
		}

		return () => clearInterval(intervalRef.current);
	}, [content, setContent, speed, isPlaying]);

	function cleanup() {
		clearInterval(intervalRef.current);
		clearTimeout(timeoutRef.current);
		setIsPlaying(false);
	}

	function handleReplay() {
		setContent([]);
		iterator.current = contentGenerator(commands);
		timeoutRef.current = 0;
		intervalRef.current = 0;
		setIsPlaying(true);
	}

	return (
		<>
			{/* <button onClick={handleReplay} disabled={isPlaying}>Replay</button> */}
			<Terminal content={content} preStyles={preStyles} />
		</>
	);
}

export default Renderer;
