/**
 * ESLint 配置：
 * - 覆盖 TS/React/React Hooks 常用规则
 * - 集成 prettier，避免重复/冲突的格式类规则
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2022: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: [
		'node_modules',
		'dist',
		'coverage',
		'**/dist/**',
		'**/.turbo/**',
		'**/.plasmo/**',
		'**/build/**',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
	},
}
