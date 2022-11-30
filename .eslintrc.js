module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    env: {
        node: true,
    },
    rules: {
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/array-type": ["warn", {
            default: "generic",
            readonly: "generic",
        }],
        "prefer-const": "off",
        "eqeqeq": "warn",
        "quotes": ["warn", "double"],
        "semi": ["warn", "always"],
        "comma-dangle": ["warn", "always-multiline"],
    },
};
