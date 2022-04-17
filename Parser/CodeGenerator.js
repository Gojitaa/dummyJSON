class CodeGen {
	constructor(ast){
		this.objectFromJSON = this.generate(ast)	
	}

	getObject() {
		return this.objectFromJSON
	}

	generate(ast){
		if(!ast || !ast.body) {
			return;
		}

		const result = {};
		this.dfs(ast.body, result)

		return result;
	}

	dfs(root, json){
		if(!root) {
			return
		}

		for(const [prop, element] of root.body) {
			if(element.type === 'Object') {
				element.semanticAction(json, prop.value)	
				this.dfs(element, json[prop.value])
			} else {
				element.semanticAction(json, prop.value, element.value)
			}
		}
	
	}
}

export default CodeGen