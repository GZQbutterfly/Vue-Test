console.log('webpack.config.js  a s');
let webpack = require('webpack');
let CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");


module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css?sourceMap!postcss"
        }, {
            test: /\.less$/,
            loader: "style!css!less|postcss"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass|postcss"
        }, {
            test: /\.(jpg|png)$/,
            loader: "url?limit=8192"
        }, {
            test: /\.html$/,
            loader: 'raw'
        },{
            test: /\.js$/, loader: 'babel?stage=1',
            exclude: [/src\/lib/, /node_modules/, /\.spec\.js/]
        }]
        // loaders: [
        //
        //     {test: /\.html$/, loader: 'raw'},
        //     {test: /\.(png|jpg|jpag)$/, loader: 'file'},
        //
        // ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }), //压缩和丑化
    //
    //     new webpack.ProvidePlugin({
    //         $: 'jquery'
    //     }), //直接定义第三方库
    //
    //     new CommonsChunkPlugin({
    //         name: "commons",
    //         // (the commons chunk name)
    //
    //         filename: "commons.js",
    //         // (the filename of the commons chunk)
    //
    //         minChunks: 2,
    //         // (Modules must be shared between 2 entries)
    //
    //         chunks: ["index", "main"]
    //             // (Only use these entries)
    //     }) //定义公共chunk
    //
    // ]
};
