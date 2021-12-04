const path = require("path");
const os = require("os");
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
    // watch: process.env.NODE_ENV === "development",
    devServer: {
        host: "0.0.0.0",
        port: "8083",
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        onListening: function(server) {
            const addressInfo = server.listeningApp.address();
            const port = addressInfo.port;
            const host = addressInfo.address;
            const protocol = "http";
            if (host === "0.0.0.0") {
                const networkInterfaces = os.networkInterfaces();
                const array2d = Array.from(Object.keys(networkInterfaces)).map((interfaceId) => {
                    const list = networkInterfaces[interfaceId];
                    return list.map((item) => {
                        return {
                            ...item,
                            interfaceId,
                        };
                    });
                });
                // console.log();
                let localIp;
                let netIp;
                array2d.flat().forEach((item) => {
                    if (
                        (item.family.toLowerCase() === "ipv4") &&
                        (item.netmask != "255.255.255.255")
                    ) {
                        if (item.internal) {
                            localIp = item.address;
                        } else {
                            netIp = item.address;
                        }
                    }
                });
                const CRLF = "\r\n";
                const text = `website run on:${CRLF}[local]: ${protocol}://${localIp}:${port}${CRLF}[network]: ${protocol}://${netIp}:${port}`;
                console.log(text);
                return ;
            }
            console.log(`website run ${protocol}://${host}:${port}`);
        }
    }
};
