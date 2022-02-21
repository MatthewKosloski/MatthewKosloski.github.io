import React from 'react';
import { Project } from '../';
import AnimatedTerminal from '../AnimatedTerminal';
import AnimatedVimEditor, { TokenType } from '../AnimatedVimEditor';
import { SubtleLinkExternal } from '../SubtleLink';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
	return (
		<>
			<AnimatedVimEditor
				filename="program.torrey"
				preStyles={{ height: '250px', borderRadius: '8px 8px 0 0' }}
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
			<AnimatedTerminal
				delay={5500}
				preStyles={{ height: '125px', borderRadius: '0 0 8px 8px' }}
				commands={[
					{
						cmd: 'javac -jar torreyc.jar -i program.torrey -o a.out',
						delayAfterCmd: 500,
						outputLines: [],
					},
					{ cmd: './a.out', delayAfterCmd: 0, outputLines: ['-42'] },
				]}
			/>
		</>
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
				Torrey is a novel, Lisp-like programming language. The{' '}
				<a href="https://en.wikipedia.org/wiki/Context-free_grammar">
					context-free grammar
				</a>{' '}
				of the language can be found{' '}
				<a href="https://github.com/MatthewKosloski/torrey#grammar">here</a>.
			</p>
			<p>
				Language features include: type inference, integer and boolean primitive
				expressions, a unary minus expression, binary arithmetic and relational
				expressions, standard output, lexically-scoped variables, if and if-else
				expressions, and logical expressions.
			</p>
			<p>
				Torrey is implemented as a compiler in Java and has a small C runtime.
				After building an{' '}
				<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree">
					abstract syntax tree
				</a>{' '}
				(AST) of the program, the compiler translates the AST to an intermediate
				representation, or IR.
			</p>
			<p>
				The IR can then be compiled down to one or more target languages. At the
				moment, the only target language is x86-64 gas assembly; however,
				additional targets can be added at any time.
			</p>
			<p>
				<em>
					This project is actively maintained and additional language features
					and targets are anticipated.
				</em>
			</p>
		</Project>
	);
}

export default TorreyProject;
