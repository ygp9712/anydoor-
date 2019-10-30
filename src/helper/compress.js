const { createGzip, createDeflate } = require('zlib');

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs; //如果不能压缩或者找不到匹配的压缩方法则原样返回
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    //优先使用gzip方法
    res.setHeader('Content-Encoding', 'gzip');   //告知浏览器使用了什么压缩方法
    return rs.pipe(createGzip());
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    //其次使用deflate方法
    res.setHeader('Content-Encoding', 'deflate');   //告知浏览器使用了什么压缩方法
    return rs.pipe(createDeflate());
  }
}