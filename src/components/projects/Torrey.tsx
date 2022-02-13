import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatedVimEditor, Project } from '../';
import { TokenType, Program } from '../AnimatedVimEditor';
import { SubtleLinkExternal } from '../SubtleLink';
import { BaseProjectProps } from './types';

const program: Program = [
	{
		lexeme: '(',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: 'println',
		type: TokenType.Keyword,
		id: uuidv4(),
	},
	{
		lexeme: '\n',
		type: TokenType.NewLine,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: '(',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: 'let',
		type: TokenType.Keyword,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: '[',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: 'a',
		type: TokenType.Identifier,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: '42',
		type: TokenType.Integer,
		id: uuidv4(),
	},
	{
		lexeme: ']',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: '\n',
		type: TokenType.NewLine,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: '(',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: '-',
		type: TokenType.Operator,
		id: uuidv4(),
	},
	{
		lexeme: ' ',
		type: TokenType.Whitespace,
		id: uuidv4(),
	},
	{
		lexeme: 'a',
		type: TokenType.Identifier,
		id: uuidv4(),
	},
	{
		lexeme: ')',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: ')',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
	{
		lexeme: ')',
		type: TokenType.Punctuation,
		id: uuidv4(),
	},
];

function FeaturedComponent() {
	return <AnimatedVimEditor program={program} />;
}

function TorreyProject({ featureOnLeft = false }: BaseProjectProps) {
	return (
		<Project
			title="Torrey"
			subtitle="A Compiler to x86-64 Assembly"
			featuredComponent={<FeaturedComponent />}
			buttonPrimary={
				<SubtleLinkExternal href="https://github.com/MatthewKosloski/torrey">
					View source code
				</SubtleLinkExternal>
			}
			buttonSecondary={
				<SubtleLinkExternal href="https://github.com/MatthewKosloski/torrey/releases/latest">
					Download latest release
				</SubtleLinkExternal>
			}
			featureOnLeft={featureOnLeft}
		>
			<p>
				Torrey is a Lisp-like programming language that type-checks at
				compile-time and compiles to 64-bit x86 assembly code.
			</p>
			<p>
				Releases are versioned using Semver Semantic Versioning and are
				automated by a continuous integration (CI) pipeline which also compiles
				and tests the compiler and builds the compiler jar and runtime object
				file.
			</p>
			<p>
				Currently, I'm developing a playground environment that enables one to
				compile, link, and execute Torrey programs directly from the web
				browser.
			</p>
		</Project>
	);
}

export default TorreyProject;
