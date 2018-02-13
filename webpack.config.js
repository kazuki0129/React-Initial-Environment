module.exports ={
    entry: [__dirname + '/src/client/index.js'],
    output: {
        path: __dirname + '/public/dist/',
        filename: 'bundle.js'
    },
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
};