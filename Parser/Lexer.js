const whitespace = [' ', '\n', '\t', '\r'];
const Spec = Object.freeze({
	'{': { type: 'LeftBrace' },
	'}': { type: 'RightBrace' },
	' ': { type: ' ', value: ' ' },
	'\n': { type: '\n', value: '\n' },
	'\t': { type: '\t', value: '\t' },
	'\r': { type: '\r', value: '\r' },
	'"': { type: 'StrSign' },
	':': { type: 'Colon' },
	',': { type: 'Comma' },
})

export function isWhitespace(char){
	return whitespace.includes(char) 
}

function isOnenine(char) {
	return char >= '1' && char <= '9'
}

function isDigit(char) {
	return char >= '0' && char <= '9'
}

function tokenizer(str) {
	return cursor => {
		const char = str[cursor]
		const token = Spec[char]
		if(token) {
			return token
		}	

		if(isOnenine(char)) {
			return { type: 'Onenine', value: char }
		}

		if(isDigit(char)) {
			return { type: 'Digit', value: char }
		}

		return { type: 'any', value: char }
	}
}

export default tokenizer