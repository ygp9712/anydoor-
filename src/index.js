const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
  .usage('anywhere [options]')
  .option('p', {
    alias: 'post', //别名
    describe: '端口号',
    default: 9527
  })
  .option('h', {
    alias: 'hostname',
    describe: 'host',
    default: 'localhost'
  })
  .option('d', {
    alias: 'root',
    describe: 'root path',
    default: process.cwd()
  })
  .version()
  .alias('v','version')
  .help()
  .argv;

  //在命令行启动服务器时自定义端口号以及域名
  const server = new Server(argv);
  server.start();