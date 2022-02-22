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

type TerminalDatum = {
	id: string;
	isCommand: boolean;
	isCurrent: boolean;
	text: string;
};

function Renderer({
	commands,
	preStyles = {},
	speed = 45,
	delay = 1000,
}: RendererProps) {
	const intervalRef = React.useRef<number>();
	const timeoutRef = React.useRef<number>();
	const iteratorRef = React.useRef<Generator<TerminalContent, undefined>>();
	const currentContentItemIndexRef = React.useRef<number>(0);

	const [content, setContent] = React.useState<TerminalDatum[]>([]);
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

	React.useEffect(() => {
		iteratorRef.current = contentGenerator(commands);
	}, [commands]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setIsPlaying(true);
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay, setIsPlaying]);

	React.useEffect(() => {
		if (!(isPlaying && iteratorRef.current)) return;

		intervalRef.current = window.setInterval(function fetchNextValue() {
			const { value, done } = iteratorRef.current!.next();

			if (done) {
				cleanup();
				return;
			}

			if (content.length > 0 && value?.isCommand) {
				clearInterval(intervalRef.current);
				timeoutRef.current = window.setTimeout(
					() => {
						if (currentContentItemIndexRef.current < content.length) {
							// Append a character to the text of the current content item.
							const currentContentItem =
								content[currentContentItemIndexRef.current];
							setContent([
								...content.slice(0, currentContentItemIndexRef.current),
								{
									...currentContentItem,
									text: currentContentItem.text + value.text,
								},
							]);
						} else {
							// Append a new command and make it current.
							setContent([
								...content.map((datum) => ({ ...datum, isCurrent: false })),
								{
									id: value.id,
									isCommand: value.isCommand,
									text: value.text,
									isCurrent: true,
								},
							]);
						}
						clearTimeout(timeoutRef.current);
						intervalRef.current = window.setInterval(fetchNextValue, speed);
					},
					value?.isLastCharOfCmd && value.delayAfterCmd
						? value.delayAfterCmd
						: 0
				);
			} else if (content.length > 0 && value) {
				// Append an output line to the existing content list.
				setContent([
					...content.slice(0, currentContentItemIndexRef.current),
					{
						id: value.id,
						isCommand: value.isCommand,
						text: value.text,
						isCurrent: false,
					},
				]);
			} else if (value) {
				clearInterval(intervalRef.current);
				timeoutRef.current = window.setTimeout(
					() => {
						// Append the first command to the content list and make it current.
						setContent([
							{
								id: value.id,
								isCommand: value.isCommand,
								text: value.text,
								isCurrent: true,
							},
						]);
						clearTimeout(timeoutRef.current);
						intervalRef.current = window.setInterval(fetchNextValue, speed);
					},
					value?.isLastCharOfCmd && value.delayAfterCmd
						? value.delayAfterCmd
						: 0
				);
			}

			if (value && (!value.isCommand || value.isLastCharOfCmd)) {
				currentContentItemIndexRef.current++;
			}
		}, speed);

		return () => clearInterval(intervalRef.current);
	}, [speed, isPlaying, content, setContent]);

	function cleanup() {
		clearInterval(intervalRef.current);
		clearTimeout(timeoutRef.current);
		setIsPlaying(false);
	}

	function handleReplay() {
		setContent([]);
		iteratorRef.current = contentGenerator(commands);
		timeoutRef.current = 0;
		intervalRef.current = 0;
		setIsPlaying(true);
	}

	return (
		<>
			<Terminal content={content} preStyles={preStyles} />
		</>
	);
}

export default Renderer;
