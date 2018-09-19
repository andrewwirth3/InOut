module.exports = {
	extends: [
		// add more generic rulesets here, such as:
		'eslint:recommended',
		'plugin:vue/essential'
	],
	rules: {
		// override/add rules settings here, such as:
		'vue/no-unused-vars': 'error',
		indent: ['error', 4, { flatTernaryExpressions: true }],
		'multiline-ternary': ['error', 'always-multiline'],
		'vue/max-attributes-per-line': [
			1,
			{
				singleline: 1,
				multiline: {
					max: 1,
					allowFirstLine: false
				}
			}
		],
		'vue/html-indent': [
			'error',
			4,
			{
				attribute: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		]
	},
	env: {
		browser: true,
		node: true
	}
};
