import Parser from './Parser/Parser.js'

const parser = new Parser()

try {
	parser.parse(`{
		 "key"    : "FML-ff-675",
		 "details": {
		 	"name": { "num": "12" }
		 } 
	}`)

	parser.parse(`{"asd": {}}`)

	parser.parse(`{
		"unnecessarywhitespaces":     "A B C D E"
	}`)

	parser.parse(`{"asd": "asd"}`)

	parser.parse(`{
		"serie":    {
			"title": "Peaky Blinders",
			"episodes": {
				"0": "Arthur first ep",
				"1": "Tommy second ep"
			}
		}
	}`)

	parser.parse(`{"testy": { "title": "asd" }}`)
	parser.parse(`{
		"test": { "title": "asd" },
		"multiple": { "title": "ret" }
	}`)

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

	console.log(parsed.getObject())
} catch(err) {
	console.error(err)
}