module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended",
        "airbnb-base",
        "plugin:eqeqeq-fix/recommended"
    ],
    "rules": {
        semi: [2, 'never'],
        indent: ['error', 2],
        'arrow-parens': ['warn', 'as-needed'],
        'linebreak-style': 0,
        'import/no-unresolved': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
        'import/newline-after-import': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-irregular-whitespace': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off', 
    },
    "globals": {
        "window": false,
        "document": false,
        "http": false,
        "_": false,
        "moment": false,
        "utils": false,
        "CommonConstants": false,
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "html"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".vue", ".js", ".css", ".scss"]
            }
        }
    },
};