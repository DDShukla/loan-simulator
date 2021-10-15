module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:node/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12
	},
	"plugins": [
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"node/no-extraneous-require": ["error", {
			"allowModules": ["apollo-server-core"]
		}]
	}
};
