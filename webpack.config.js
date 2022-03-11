const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
// process.env.NODE_ENV = "development";
module.exports = {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    entry: {
        "index": path.join(__dirname, "./src/index.ts"),
        "arrayLike": path.join(__dirname, "./src/arrayLike.ts"),
        "fileRelate": path.join(__dirname, "./src/fileRelate.ts"),
        "num": path.join(__dirname, "./src/num.ts"),
        "NumTransferTool": path.join(__dirname, "./src/NumTransferTool.ts"),
        "option": path.join(__dirname, "./src/option.ts"),
        "OptionCopier": path.join(__dirname, "./src/OptionCopier.ts"),
        "range": path.join(__dirname, "./src/range.ts"),
    },
    output: {
        path: path.join(__dirname, "./lib"),
        filename: "[name].js",
        library: {
            type: "umd",
            name: "AkabaTool",
        },
        environment: {
            arrowFunction: false,
            // The environment supports BigInt as literal (123n).
            bigIntLiteral: false,
            // The environment supports const and let for variable declarations.
            const: false,
            // The environment supports destructuring ('{ a, b } = obj').
            destructuring: false,
            // The environment supports an async import() function to import EcmaScript modules.
            dynamicImport: false,
            // The environment supports 'for of' iteration ('for (const x of array) { ... }').
            forOf: false,
            // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
            module: false,
        },
        globalObject: "this"
    },
    optimization: {
        minimize: process.env.NODE_ENV !== "development",
        minimizer: [
            new TerserPlugin({
                extractComments: false
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.m?tsx?/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    target: "web",
    resolve: {
        extensions: [".ts", ".es6", ".js"],
        alias: {
            "@": path.join(__dirname, "./src"),
        },
    },
};
