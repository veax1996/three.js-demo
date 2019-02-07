var path = require('path');
var HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'development',
    //项目入口
    entry: "./src/index.ts",
    //输出设置
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    //调试工具
    devtool: "source-map",
    //模块加载器设置
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loaders: [ { loader: "awesome-typescript-loader" } ],
            }
        ]
    },
    //调试服务
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 7777
    },
    //插件
    plugins: [
        new HtmlWebPackPlugin(
            {
                title: "three.js"
            }),
    ]
}