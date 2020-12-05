module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module",
        ecmaFeatures: {
            arrowFunctions: true,
            modules: true
        }
    },
    "rules": {}
};