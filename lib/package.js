var fs = require('fs')
var path = require('path')
var noop = require('no-op')

module.exports = function(cwd, cb) {
  if(typeof cwd === 'function') cb = cwd
  cb = cb||noop
  cwd = cwd || process.cwd()
  fs.readFile(path.join(cwd, 'package.json'), 'utf8', function(err, data) {
    if (err) return cb(err)
    try {
      data = JSON.parse(data)
    } catch (e) {
      return cb(e)
    }
    cb(null, data)
  })
}