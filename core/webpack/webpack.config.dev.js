const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");
const chalk = require("chalk");
const DevServer = require("webpack-dev-server");

const webpackConfig = env => ({
    mode: "development" /* development or production */,
    entry: [`webpack-dev-server/client?https://0.0.0.0:${env.port}`, "webpack/hot/dev-server", `${env.entry}/index.tsx`] /* 需要打包文件"./src/index.tsx" 默认文件名为 main (公共js,如 react),"webpack-dev-server/client?https://0.0.0.0:3000"为按需加载js模块 */,
    output: {
        path: env.dist /* production 输出目录前缀 */,
        filename: `${env.static}/js/[name].js` /* development、production 输出文件 */,
        publicPath: "/" /* development 输入目录前缀 */,
    },
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "async",
            automaticNameDelimiter: "-",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".sass", ".less"] /* require、import时这些后缀不需要添加 */,
        modules: [env.entry, "node_modules"] /* 导入文件默认在src、node_modules下查找 */,
        alias: env.alias,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                },
            },
            {
                test: /\.(ts|tsx)$/,
                include: env.core ? [env.entry, env.core] : [env.entry],
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    getCustomTransformers: () => ({
                        before: [TSImportPlugin({libraryName: "antd", libraryDirectory: "es", style: true})],
                    }),
                },
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true /* Inline-javascript, enabled can use Mixins */,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: "url-loader",
                query: {
                    limit: env.imgLimit || 1024 /* Generate separate images beyond limit otherwise use picture stream format. */,
                    name: `${env.static}/img/[name].[hash:8].[ext]`,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: `${env.static}/font/[name].[hash:8].[ext]`,
                },
            },
            {
                test: /\.mp4$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.entry,
            files: "**/*.less",
            syntax: "less",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            tslint: env.tslintConfig,
            workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
        }),
        new HTMLPlugin({
            template: path.resolve(__dirname, `${env.entry}/index.html`) /* 自动在该模板中导入 output 中的filename文件 */,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin() /* 控制台显示加载进度 */,
    ],
});

const devServer = (compiler, env) => {
    return new DevServer(compiler, {
        contentBase: env.contentBase /* 静态资源目录 */,
        watchContentBase: true /* contentBase目录下变更数据时自动刷新 */,
        host: env.host /* 使用localhost会导致报错 [WDS] Disconnected! */,
        https: true /* 必须使用https访问 */,
        historyApiFallback: true /* 所有路由不经过服务端,用于SPA单页应用 */,
        disableHostCheck: true,
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    });
};

module.exports = start = env => {
    const config = webpackConfig(env);
    const compiler = webpack(config);
    const server = devServer(compiler, env);
    server.listen(env.port, env.host, error => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green https://localhost:${env.port}/} \n`);
        return null;
    });

    /* [中断进程, 软件终止信号]监听 ref：https://blog.csdn.net/sufwei/article/details/51610676 */
    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal, () => {
            server.close();
            process.exit();
        });
    });
};
