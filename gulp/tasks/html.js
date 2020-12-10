const gulp = require('gulp')
const plumber = require('gulp-plumber')
const config = require('../config')

module.exports = function html() {
  return gulp.src('src/pages/*')
    .pipe(plumber())
    .pipe(gulp.dest('build'))
}

// module.exports = function pug2html() {
//   return gulp.src('src/pages/*.pug')
//     .pipe(plumber())
//     .pipe(pugLinter({ reporter: 'default' }))
//     .pipe(pug({ pretty: config.pug2html.beautifyHtml }))
//     .pipe(htmlValidator())
//     .pipe(bemValidator())
//     .pipe(gulp.dest('build'))
// }
