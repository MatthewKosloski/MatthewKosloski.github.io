import { v4 as uuidv4 } from 'uuid';
import { Token, TokenType } from './Renderer';

export interface EditorDatum {
	char: string;
	tokenType: TokenType;
	id: string;
}

function* editorContentGenerator(
	tokens: Token[]
): Generator<EditorDatum, undefined> {
	let currentTokenIndex = 0;
	let currentCharIndex = 0;

	while (true) {
		if (currentTokenIndex >= tokens.length) return;

		const currentToken = tokens[currentTokenIndex];
		const currentChar = currentToken.lexeme[currentCharIndex];
		const isNewLineChar = currentToken.lexeme === '\n';
		const isLastChar = currentCharIndex === currentToken.lexeme.length - 1;

		if (isNewLineChar || isLastChar) {
			currentCharIndex = 0;
			currentTokenIndex++;
		} else {
			currentCharIndex++;
		}

		yield {
			tokenType: currentToken.type,
			char: currentChar,
			id: uuidv4(),
		};
	}
}

export default editorContentGenerator;
