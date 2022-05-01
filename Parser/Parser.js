//import tokenizer, { isWhitespace } from './Lexer.js'
const tokenizer = require('./Lexer.js').default
const isWhitespace = require('./Lexer.js').isWhitespace
const CodeGen = require('./CodeGenerator.js')

class Parser {
	parse(str) {
		this.cursor = 0
		this.tokenizer = tokenizer(str)
		const AST = this.dummyJSON()
		const object = new CodeGen(AST)

		return object
	}

	skipWhitespace() {
		// TODO: refactor, skip whitespace
		const lookahead = this.lookahead().type
		if(isWhitespace(lookahead)) {
			this.cursor += 1

			return true
		}

		return false
	}

	lookahead() {
		return this.tokenizer(this.cursor)
	}

	match(type) {
		const token = this.lookahead()
		this.cursor += 1
		if(type !== 'any' && isWhitespace(token.type))  {
			return this.match(type)
		}

		if(token.type === type || type === 'any') {
			return token
		}

		return null
	}

	dummyJSON(){
		return {
			type: 'DummyJSON',
			body: this.Object()
		}
	}

	Object() {
		const startToken = this.match('LeftBrace')
		if(!startToken) {
			throw new Error('SyntaxError: Object should start with {')
		}

		const members = []
		this.Members(members)

		const endToken = this.match('RightBrace')
		if(!endToken) {
			throw new Error('SyntaxError: Object should end with }')
		}

		return {
			type: 'Object',
			semanticAction(obj, value){
				obj[value] = {}
			},
			body: [...members]
		}
	}

	Members(members) {
		if(this.lookahead().type === 'RightBrace') {
			//empty object return nothing
			return {};
		}

		if(this.skipWhitespace()) {
			return this.Members(members);
		}

		return this.Member(members)
	}

	Member(members) {
		const propertyName = this.Str('PropertyName')
		this.Colon()
		const body = this.Element()

		members.push([propertyName, body])

		const hasComma = this.lookahead().type === 'Comma'
		if(hasComma) {
			this.Comma()
			this.Member(members);
		}


		return members
	}

	Element() {
		const lookahead = this.lookahead().type
		if(this.skipWhitespace()) {
			return this.Element();
		}

		switch (lookahead) {
			case 'LeftBrace':
				return this.Object()
			case 'StrSign':
				return this.Str('Element')
			case 'Onenine':
				return this.Int()
			default:
				return
		}
	}

	Str(type) {
		const stringStart = this.match('StrSign')
		if(!stringStart) {
			throw new Error(`SyntaxError: ${type} should start with "`)
		}

		const string = this.Chars()

		const stringEnd = this.match('StrSign')
		if(!stringEnd) {
			throw new Error(`SyntaxError: ${type} should start with "`)
		}

		return { 
			type,
			semanticAction(json, prop, elem){
				json[prop] = elem
			},
			value: string
		}
	}

	Chars() {
		let chars = [];	
		this.Char(chars)
		return chars.join('');
	}

	Char(chars) {
		const token = this.lookahead()
		if(token.type === 'StrSign') {
			return;
		}
		
		// accept any character, then recur
		const charToken = this.match('any')
		chars.push(charToken.value)
		this.Char(chars)
	}

	Int() {
		const num = this.match('Onenine')
		if(!num) {
			throw new Error('SyntaxError: Int needs to be a valid integer')
		}

		const intChars = [num.value]

		this.Digits(intChars)

		return {
			type: 'Int',
			semanticAction(json, prop, elem){
				json[prop] = elem
			},
			value: Number(intChars.join(''))
		}
	}

	Digits(integerChars){
		const token = this.lookahead()
		const isDigit = token.type === 'Onenine' || token.type === 'Digit'
		if(!isDigit) {
			return
		}
		const digit = this.match(token.type);

		integerChars.push(digit.value)
		this.Digits(integerChars)
	}

	Colon() {
		const colon = this.match('Colon')

		if(!colon) {
			throw new Error('SyntaxError: Member needs to have a colon after the property name')
		}
	}

	Comma() {
		const lookahead = this.lookahead()
		const isComma = lookahead && lookahead.type === 'Comma'
		isComma && this.match('Comma')
	}
}

module.exports = Parser