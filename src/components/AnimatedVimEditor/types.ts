export interface Token {
	lexeme: string;
	type: TokenType;
}

export interface EditorDatum {
	char: string;
	tokenType: TokenType;
	id: string;
}

export enum TokenType {
	Comment,
	Identifier,
	Integer,
	Keyword,
	Operator,
	Punctuation,
	Whitespace,
	Uncategorized,
	NewLine,
	Boolean
}
