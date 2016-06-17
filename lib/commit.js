var spawn = require('npm-execspawn')
var escape = require('jsesc')
var noop = require('no-op')

//git add + git commit + git push
module.exports = function(opt, cb) {
  cb = cb || noop
  var message = opt.message || 'first commit'
  message = "'"+escape(message)+"'"
  var cwd = opt.cwd || process.cwd()

  var cmd = [
    'git init',
    'git add .',
    'git commit -m ' + message,
    'git remote add origin ' + opt.url,
    'git push -u origin master'
  ].join(' && ')
  var proc = spawn(cmd, {cwd: cwd})
  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
  proc.on('exit', function(err) {
    if (err === 0)
      cb(null)
    else
      cb(new Error('git command failed'))
  })
}