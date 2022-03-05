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
				trailingNewLines={1}
				autoScroll={false}
				filename="program.torrey"
				preStyles={{ height: '350px', borderRadius: '8px 8px 0 0' }}
				tokens={[
					{ lexeme: '; This is a Torrey program :)', type: TokenType.Comment },
					{ lexeme: '\n', type: TokenType.NewLine },
					{ lexeme: '\n', type: TokenType.NewLine },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'print', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '1', type: TokenType.Integer },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '2', type: TokenType.Integer },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'let', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '[', type: TokenType.Punctuation },
					{ lexeme: 'foo', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '30', type: TokenType.Integer },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bar', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '12', type: TokenType.Integer },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bax', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: '+', type: TokenType.Operator },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '0', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: '+', type: TokenType.Operator },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'foo', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: '*', type: TokenType.Operator },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bar', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '1', type: TokenType.Integer },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ']', type: TokenType.Punctuation },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'if', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'false', type: TokenType.Boolean },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'println', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '0', type: TokenType.Integer },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'println', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: '-', type: TokenType.Operator },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '999', type: TokenType.Integer },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'let', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '[', type: TokenType.Punctuation },
					{ lexeme: 'foo', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '1', type: TokenType.Integer },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bar', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '39', type: TokenType.Integer },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '_', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'let', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '[', type: TokenType.Punctuation },
					{ lexeme: '_', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: '-', type: TokenType.Operator },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bax', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bar', type: TokenType.Identifier },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ']', type: TokenType.Punctuation },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '_', type: TokenType.Identifier },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ']', type: TokenType.Punctuation },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'if', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: '>=', type: TokenType.Operator },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'foo', type: TokenType.Identifier },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '1', type: TokenType.Integer },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '(', type: TokenType.Punctuation },
					{ lexeme: 'println', type: TokenType.Keyword },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: 'bax', type: TokenType.Identifier },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: '\n', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: ' ', type: TokenType.Whitespace },
					{ lexeme: '_', type: TokenType.Identifier },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
					{ lexeme: ')', type: TokenType.Punctuation },
				]}
				speed={12}
			/>
			<AnimatedTerminal
				delay={7500}
				preStyles={{ height: '250px', borderRadius: '0 0 8px 8px' }}
				commands={[
					{
						cmd: 'wget -q https://github.com/MatthewKosloski/torrey/releases/download/3.1.1/release.zip && unzip release.zip && rm release.zip && cp release/* . && rm -rf release',
						delayAfterCmd: 1500,
						outputLines: [],
					},
					{
						cmd: 'ls',
						delayAfterCmd: 750,
						outputLines: ['torreyc-3.1.1.jar runtime.o'],
					},
					{
						cmd: 'java -jar torreyc-3.1.1.jar -i program.torrey -ir',
						delayAfterCmd: 750,
						outputLines: [
							't0 = 1',
							't1 = 2',
							't2 = 30',
							't3 = 12',
							't5 = 42',
							't4 = t5',
							'if true goto l0',
							't6 = 0',
							'param t6',
							'call println, 1',
							'goto l1',
							'label l0:',
							't8 = -999',
							'param t8',
							'call println, 1',
							'label l1:',
							't9 = 1',
							't10 = 39',
							't13 = 3',
							't12 = t13',
							't11 = t12',
							'if t9 < 1 goto l2',
							'param t4',
							'call println, 1',
							'label l2:',
							'param t0',
							'param t1',
							'param t11',
							'call print, 3',
						],
					},
					{
						cmd: 'java -jar torreyc-3.1.1.jar -i program.torrey -S --target x86_64-pc-linux',
						delayAfterCmd: 750,
						outputLines: [
							'.text',
							'  .globl main',
							'main:',
							'  pushq %rbp',
							'  movq %rsp, %rbp',
							'  subq $128, %rsp',
							'  jmp start',
							'start:',
							'  movq $1, -8(%rbp)',
							'  movq $2, -16(%rbp)',
							'  movq $30, -24(%rbp)',
							'  movq $12, -32(%rbp)',
							'  movq $42, -40(%rbp)',
							'  movq -40(%rbp), %r10',
							'  movq %r10, -48(%rbp)',
							'  movq $0, %r10',
							'  movq $1, %r11',
							'  cmp %r11, %r10',
							'  jne l0',
							'  movq $0, -56(%rbp)',
							'  movq -56(%rbp), %rdi',
							' callq print_int',
							' callq print_nl',
							' jmp l1',
							'l0:',
							'  movq $-999, -64(%rbp)',
							'  movq -64(%rbp), %rdi',
							'  callq print_int',
							'  callq print_nl',
							'l1:',
							'  movq $1, -72(%rbp)',
							'  movq $39, -80(%rbp)',
							'  movq $3, -88(%rbp)',
							'  movq -88(%rbp), %r10',
							'  movq %r10, -96(%rbp)',
							'  movq -96(%rbp), %r10',
							'  movq %r10, -104(%rbp)',
							'  movq -72(%rbp), %r10',
							'  movq $1, %r11',
							'  cmp %r11, %r10',
							'  jl l2',
							'  movq -48(%rbp), %rdi',
							'  callq print_int',
							'  callq print_nl',
							'l2:',
							'  movq -8(%rbp), %rdi',
							'  callq print_int',
							'  movq -16(%rbp), %rdi',
							'  callq print_int',
							'  movq -104(%rbp), %rdi',
							'  callq print_int',
							'  jmp conclusion',
							'conclusion:',
							'  addq $128, %rsp',
							'  popq %rbp',
							'  movq $0, %rax',
							'  retq',
						],
					},
					{
						cmd: 'java -jar torreyc-3.1.1.jar -i program.torrey -o a.out',
						delayAfterCmd: 750,
						outputLines: [],
					},
					{
						cmd: './a.out',
						delayAfterCmd: 128,
						outputLines: ['-999', '42', '123'],
					},
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
