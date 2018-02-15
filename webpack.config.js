const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        entry: [__dirname + '/src/client/index.js'],
        output: {
            path: __dirname + '/public/dist/js',
            filename: 'bundle.js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    },
    {
        entry: {
            style: __dirname + '/src/client/sass/style.scss',
        },
        output: {
            path: __dirname + '/public/dist/css',
            filename: '[name].css'
        },
        devtool: 'source-map',
        module:{
            rules:[
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
        ]
    },
]