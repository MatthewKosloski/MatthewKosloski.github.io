import React from 'react';
import { Project } from '../';
import AnimatedVimEditor, { TokenType } from '../AnimatedVimEditor';
import { SubtleLinkExternal } from '../SubtleLink';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
	return (
		<AnimatedVimEditor
			filename="program.torrey"
			tokens={[
				{ lexeme: '(', type: TokenType.Punctuation },
				{ lexeme: 'println', type: TokenType.Keyword },
				{ lexeme: '\n', type: TokenType.NewLine },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: '(', type: TokenType.Punctuation },
				{ lexeme: 'let', type: TokenType.Keyword },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: '[', type: TokenType.Punctuation },
				{ lexeme: 'a', type: TokenType.Identifier },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: '42', type: TokenType.Integer },
				{ lexeme: ']', type: TokenType.Punctuation },
				{ lexeme: '\n', type: TokenType.NewLine },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: '(', type: TokenType.Punctuation },
				{ lexeme: '-', type: TokenType.Operator },
				{ lexeme: ' ', type: TokenType.Whitespace },
				{ lexeme: 'a', type: TokenType.Identifier },
				{ lexeme: ')', type: TokenType.Punctuation },
				{ lexeme: ')', type: TokenType.Punctuation },
				{ lexeme: ')', type: TokenType.Punctuation },
			]}
		/>
	);
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
