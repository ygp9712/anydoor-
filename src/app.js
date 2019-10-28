const http = require('http');
const chalk = require('chalk');
const path = require('path');
const config = require('./config/defaultConfig');
const route = require('./helper/route');


const server = http.createServer((req, res) => {
  const filePath = path.join(config.root, req.url);
  route(req, res, filePath);
});

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
  //` `是ES6语法，在里面可以同时使用变量和字符串
});