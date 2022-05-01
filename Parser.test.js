const Parser = require('./Parser/Parser.js')


let parser
describe('DummyJSON Parser', () => {
	beforeAll(() => {
		parser = new Parser()
	})

	describe('Parse Successfully', () => {
		it('should parse empty JSON properly', () => {
			const parsed = parser.parse(`{}`)

			expect(parsed.getObject()).toEqual({})
		})
		it('should ignore whitespaces', () => {
			const parsed = parser.parse(`{ 
			
				}`)

			expect(parsed.getObject()).toEqual({})	
		})
		it('should parse Str elements properly', () => {
			const parsed = parser.parse(`{"asd": "asd"}`)

			expect(parsed.getObject()).toEqual({'asd': 'asd'})
		})
		it('should parse Int elements properly', () => {
			const parsed = parser.parse(`{"asd": 13}`)

			expect(parsed.getObject()).toEqual({'asd': 13})	
		})
		it('should parse Object elements properly', () => {
			const parsed = parser.parse(`{"asd": {}}`)

			expect(parsed.getObject()).toEqual({'asd': {}})		
		})
		it('should parse nested Object elements properly', () => {
			const parsed = parser.parse(`{
				"movies": {
					"0": { "title": "Batman" },
					"1": { "title": "Joker" },
					"2": { "title": "Wonder Woman" }
				},
				"serie":    {
					"title": "Supergirl 1997",
					"episodes": {
						"0": 1678,
						"1": "second ep"
					}	
				}

			}`)

			expect(parsed.getObject().serie.title).toBe('Supergirl 1997')
			expect(parsed.getObject()).toEqual({
				"movies": {
					"0": { "title": "Batman" },
					"1": { "title": "Joker" },
					"2": { "title": "Wonder Woman" }
				},
				"serie":    {
					"title": "Supergirl 1997",
					"episodes": {
						"0": 1678,
						"1": "second ep"
					}	
				}

			})
		})
	})

	describe('Throw Error While Parsing', () => {
		it('should throw when RightBrace is missing from the end', () => {
			expect(() => parser.parse(`{  `)).toThrow()	
		})

		it('should throw when member key is not string', () => {
			expect(() => parser.parse(`{ title: "batman"  }`)).toThrow()	
		})

		it('should throw when member key-value separator is not :', () => {
			expect(() => parser.parse(`{ title; "batman"  }`)).toThrow()	
		})

		it('should throw when Comma is present, but there is no following member', () => {
			expect(() => parser.parse(`{ "title": "Batman",  }`)).toThrow()	
		})
	})
})