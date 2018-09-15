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
		'multiline-ternary': ['error', 'always-multiline']
	},
	env: {
		browser: true,
		node: true
	}
};
