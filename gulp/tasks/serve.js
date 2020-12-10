const gulp = require('gulp')

const imageMinify = require('./imageMinify')
const styles = require('./styles')
const html = require('./html')
const script = require('./script')
const copyDependencies = require('./copyDependencies')

const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function serve(cb) {
  server.init({
    server: 'build',
    notify: false,
    open: false,
    // proxy: 'http://localhost:2006/',
    cors: true
  })

  gulp.watch('src/img/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload))
  gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
  gulp.watch('src/js/**/*.js', gulp.series(script, readyReload))
  gulp.watch('src/pages/**/*.html', gulp.series(html, readyReload))

  gulp.watch('package.json', gulp.series(copyDependencies, readyReload))

  return cb()
}
