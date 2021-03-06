module.exports =  {
    plugins: [
        "react-hooks",
        "emotion"
    ],
    env: {
        es6: true,
        browser: true,
        jest: true,
        node: true
    },
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  "module",
        ecmaFeatures:  {
            jsx:  true,
        },
    },
    parser:  "@typescript-eslint/parser",
    extends:  [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    globals: {
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends:  [
                "plugin:@typescript-eslint/recommended",
            ],
            rules:  {
                "@typescript-eslint/ban-ts-ignore": "error",
                "@typescript-eslint/camelcase": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-empty-function": "off"
            },
        }
    ],
    settings: {
        react: {
            version: "detect"
        },
        "import/resolver": {
            "alias": {
                map: [
                    [ "components", "./components" ],
                    [ "src", "./src" ]
                ],
                extensions: ['.ts', '.js', '.jsx', '.json']
            }
        }
    },
    rules:  {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "semi": 2,
        "semi-spacing": [2, {"before": false, "after": true}],
        "quotes": [2, "double", "avoid-escape"],
        "jsx-quotes": [1, "prefer-double"],
        "quote-props": 0,
        "emotion/jsx-import": "error",
        "emotion/no-vanilla": "error",
        "emotion/import-from-emotion": "error",
        "emotion/styled-import": "error",
        "emotion/syntax-preference": [2, "string"],
        "prefer-const": 2,
        "no-var": 2,
        "import/extensions": [2, {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never",
        }]
    }
};
