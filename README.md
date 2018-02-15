Create the environment for react.js
===

**Node must be installed first.**

This describes how you setup the environment for react, node(express), webpack step by step.

## Technologies

React / Node / Express / Webpack / Babel / EJS / SASS

## Introduction
**Project strucure would be like following tree.**
```bash
.
├── README.md
├── package.json
├── public
│   └── dist
│       ├── css
│       │   ├── style.css
│       │   └── style.css.map
│       └── js
│           ├── bundle.js
│           └── bundle.js.map
├── src
│   ├── client
│   │   ├── components
│   │   │   └── App.jsx
│   │   ├── index.js
│   │   └── sass
│   │       ├── component-style
│   │       │   └── app-style.scss
│   │       └── style.scss
│   └── server
│       ├── config.js
│       └── server.js
├── views
│   ├── footer.ejs
│   ├── header.ejs
│   └── index.ejs
├── webpack.config.js
└── yarn.lock
```

## Installation

**Note: Make sure you are in your project directory before starting following steps.**

*Add pacage.json*

```bash
~/Documents/path-to-projects
→ yarn init
```

*Add react react-dom*
```bash
~/Documents/path-to-projects
→ yarn add react react-dom
```

*Add webpack (webpackの追加)*
```bash
~/Documents/path-to-projects
→ yarn add -D webpack
```

*Add babel's for transpile　(トランスパイル用にbabel一式)*
```bash
~/Documents/path-to-projects
→ yarn add -D babel babel-loader babel-cli babel-preset-env babel-preset-react babel-runtime
```

*Create and modify babel config file*
```bash
~/Documents/path-to-projects
→ touch .babelrc

~/Documents/path-to-projects
→ code .babelrc
```

* .babelrc
```json
{
    "presets": [
        ["env", {
            "targets": {
                "node": "current"
            }
        }],
        ["react"]
    ]
}
```

*Add Express (サーバーとして express)*
```bash
~/Documents/path-to-projects
→ yarn add express
```

*Make entry and output point*

* Before touch webpack config, we create public/dist for output point and src/ for entry point.
```bash
~/Documents/path-to-projects
→ mkdir public

~/Documents/path-to-projects
→ mkdir public/dist

~/Documents/path-to-projects
→ mkdir src
```

*Make src/server, src/client folder*

* To separate files depends on server side or client side
```bash
~/Documents/path-to-projects
→ mkdir src/client

~/Documents/path-to-projects
→ mkdir src/server
```

*Create and Modify webpack.config.js*

* To enable babel
```bash
~/Documents/path-to-projects
→ touch webpack.config.js

~/Documents/path-to-projects
→ code webpack.config.js
```

* webpack.config.js
```javascript
module.exports ={
    entry: [__dirname + 'src/client/index/js'],
    output: {
        path: __dirname + '/public/dist',
        filename: 'bundle.js'
    },
    module: {
        loader: [
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
```

*Install EJS and create html file*
```bash
~/Documents/path-to-projects
→ yarn add ejs

~/Documents/path-to-projects
→ mkdir views

~/Documents/path-to-projects
→ touch views/{header,index,footer}.ejs
```

* index.ejs
```ejs
<%- include('header') -%>
    <div id="root"></div>
<%- include('footer') -%>
```

* header.ejs
```ejs
<!DOCTYPE html>
<html lang="en">
  <head>

    <!-- meta -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="theme-color" content="#fafafa" />
    
    <!-- css  -->
    <link rel="stylesheet" href="" media="screen" />

    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet">

    <!-- title -->
    <title>My Boilerplate for React</title>


  </head>
  <body class="container">
```

* footer.ejs
```ejs
<script src="/dist/bundle.js" charset="utf-8"></script>

</body>
</html>
```

*Create index.js for entry point*
```bash
~/Documents/path-to-projects
→ touch src/client/index.js

~/Documents/path-to-projects
→ code src/client/index.js
```

* index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Test</h1>,
    document.getElementById('root')
);
```

*Create and modify server.js*
```bash
~/Documents/path-to-projects
→ touch src/server/{server,config}.js

~/Documents/path-to-projects
→ code src/server/config.js
```

* config.js
```js
const env = process.env;

export const NodeENV = env.NodeENV || 'development'

export default {
    port: env.port || '3000',
    host: env.host || '0.0.0.0',
    get serverUrl(){
        return `http://${this.host}:${this.port}`;
    }
}
```

* code server.js
```bash
~/Documents/path-to-projects
→ code src/server/server.js
```

* server.js
```js
// import my config file 
import config from './config'

// import express and path
const express = require('express')
const path = require('path')

// set server as express
const server = express();

// static path tp /public
server.use(express.static('public'));

// set view engine(on default, express look for views folder under root directory)
server.set('view engine', 'ejs')

// :localhost/
server.get('/', (req, res) => {
    res.render('index')
});

// to show msg abourt where we connect to on your terminal
server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', config.port);
});
```

*Install nodemon for auto-watch-reload*
```bash
~/Documents/path-to-projects
→ yarn add -D nodemon
```

*Modify package.json*

* install npm-run-all
```bash
~/Documents/path-to-projects
→ yarn add -D npm-run-all
```

* package.json
```json
"scripts": {
    "wacth:server": "nodemon --exec babel-node src/server/server.js --ignore public/",
    "watch:build": "webpack -wd",
    "start": "npm-run-all -p watch:*"
}
```

## Run your project
```bash
~/Documents/path-to-projects
→ yarn start
```

## Additional Setup like CSS/SASS/Image loader

*Create components folder to save react components inside*
```bash
~/Documents/path-to-projects
→ mkdir src/client/components
```

*Create basic componets like App.jsx*
```bash
~/Documents/path-to-projects
→ touch src/client/components/App.jsx
```

*Modify App.jsx*
```jsx
import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            title: 'My React Boilerplate!'
        }
    }

    render(){
        return(
            <div class="app-container">
                <h1>{this.state.title}</h1>
            </div>
        );
    }
}

export default App;
```

*Modify index.js*
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

*Create sass folder inside client folder*
```bash
~/Documents/path-to-projects
→ mkdir src/client/sass
```

*Create scss file*

I would like to separate styles for each componets so I create anothe folder called component-style inside sass folder.
```bash
~/Documents/path-to-projects
→ touch src/client/sass/style.scss

~/Documents/path-to-projects
→ mkdir src/client/sass/component-style

~/Documents/path-to-projects
→ touch src/client/sass/component-style/app-style.scss
```

*Modify style.scss and app-style.scss*
* style.scss
```scss
@import './component-style/app-style.scss';

body{
    margin: 0;
}

h1, h2, h3, h4, p{
    margin: 0;
}

ul{
    padding: 0;
    list-style: none;
}
```

* app-style.scss
```scss
.app-container{
    width: 100vw;
    padding: 40px 40px;
    text-align: center;
}
```

*Create css folder inside public/dist for output point*
```bash
~/Documents/path-to-projects
→ mkdir public/dist/css
```

*Install style-loader, css-loader, sass-loader, node-sass extract-text-webpack-plugin*
```bash
~/Documents/path-to-projects
→ yarn add -D style-loader css-loader sass-loader node-sass extract-text-webpack-plugin
```

*Modify webpack.config.js*

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
}
```