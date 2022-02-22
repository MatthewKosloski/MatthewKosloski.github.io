import { v4 as uuidv4 } from 'uuid';
import { Command } from './Renderer';

export interface TerminalContentGeneratorItem {
	isCurrent: boolean;
	isCommand: boolean;
	isFirstCharOfCmd: boolean;
	isLastCharOfCmd: boolean;
	text: string;
	id: string;
	delayAfterCmd: number;
}

function* terminalContentGenerator(
	commands: Command[]
): Generator<TerminalContentGeneratorItem, undefined> {
	let currentCommandIndex = 0;
	let currentCmdCharIndex = 0;
	let currentOutputLineIndex = -1;

	while (true) {
		const currentCommand = commands[currentCommandIndex];

		if (currentCommand === undefined) return;

		const currentCmdChar = currentCommand.cmd[currentCmdCharIndex];
		const currentOutputLine =
			currentCommand.outputLines[currentOutputLineIndex];
		const isLastCharOfCmd =
			currentCmdCharIndex === currentCommand.cmd.length - 1;
		const isFirstCharOfCmd = currentCmdCharIndex === 0;
		const isLastOutputLine =
			currentOutputLineIndex === currentCommand.outputLines.length - 1;
		const delayAfterCmd = currentCommand.delayAfterCmd;

		if (currentOutputLine !== undefined) {
			// We're yielding an output line of the current terminal command

			if (isLastOutputLine) {
				currentOutputLineIndex = -1;
				currentCommandIndex++;
			} else {
				currentOutputLineIndex++;
			}

			yield {
				isCurrent: false,
				isCommand: false,
				// Since this is an output line and not a substring
				// of a command, these booleans are false
				isFirstCharOfCmd: false,
				isLastCharOfCmd: false,
				text: currentOutputLine,
				id: uuidv4(),
				delayAfterCmd,
			};
		} else {
			// We're yielding a terminal command substring

			if (isLastCharOfCmd) {
				currentCmdCharIndex = 0;
				currentOutputLineIndex = currentCommand.outputLines.length ? 0 : -1;

				// Move onto the next command only if the current command
				// does not have any output lines
				currentCommandIndex = currentCommand.outputLines.length
					? currentCommandIndex
					: currentCommandIndex + 1;
			} else {
				currentCmdCharIndex++;
			}

			yield {
				isCurrent: false,
				isCommand: true,
				text: currentCmdChar,
				id: uuidv4(),
				isFirstCharOfCmd,
				isLastCharOfCmd,
				delayAfterCmd,
			};
		}
	}
}

export default terminalContentGenerator;
