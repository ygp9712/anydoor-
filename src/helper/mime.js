const path = require('path');

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-cion',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain',
  'xml': 'text/xml'
};

module.exports = (filePath) => {
  let ext = path.extname(filePath)
    .split('.') //将文件名用.分割
    .pop()     //将最后一个项出栈
    .toLowerCase(); //转换为小写

  if (!ext) {
    ext = filePath;
  }

  return mimeTypes[ext] || mimeTypes['txt'];
  //返回mimeTypes中ext代表的那行值
  //若ext在表中不存在，则用文本返回
};