import Koa from 'koa';
import convert from 'koa-convert';
const app = new Koa();

// Webpack and Hot Module Reloading :)
// --------------------------------------------------
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';

import webpack from 'webpack';

let config;
if (process.env.NODE_ENV !== 'production') {
    config = require('./webpack.config.dev');
} else {
    config = require('./webpack.config.prod');
}

const compiler = webpack(config);

app.use(convert(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})));

if (process.env.NODE_ENV !== 'production') {
    app.use(convert(webpackHotMiddleware(compiler)));
}


// Serve Static Files
// --------------------------------------------------
import path from 'path';
import serve from 'koa-static';

app.use(convert(serve(path.resolve('client'))));

// Routing
// --------------------------------------------------
import router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const myRouter = router();

app.use(bodyParser({
    onerror(err, ctx) {
        ctx.throw('body parse error', 422);
    }
}));

app
    .use(myRouter.routes())
    .use(myRouter.allowedMethods());


// Start Server
// --------------------------------------------------
import http from 'http';

const httpServer = http.Server(app.callback());
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
    console.log('App is listening on port', port);
});
