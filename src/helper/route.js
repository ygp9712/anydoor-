const fs = require('fs');
const path = require('path');
const Handlebar = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebar.compile(source.toString());

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = mime(filePath);
      res.setHeader('Content-Type', contentType);
      let rs;
      const { code, start, end } = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath); 
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start, end})
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
      //数据流的方式比readFile快
    } else if (stats.isDirectory()) {
        const files = await readdir(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const dir = path.relative(config.root, filePath);
        const data = {
          title: path.basename(filePath),
          dir: dir ? `/${dir}` : '',
          files: files.map(file => {
            return {
              file,
              icon: mime(file)
            }
          })
        };
        res.end(template(data));
        //async函数和await是generator的语法糖，分别代表*和yield
    }
    //上面是成功的实现业务
  } catch (ex) {
      console.log(ex);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`${filePath} is not found \n ${ex.toString()}`);
      //如果找不到则返回404状态码
  }
}