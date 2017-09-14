var gulp = require('gulp')
var include = require('gulp-include')
var uglify = require('gulp-uglify')
var eslint = require('gulp-eslint')
var config = require('../config')
var browserSync = require('browser-sync')
var babel = require('gulp-babel')
var cache = require('gulp-cached')

reload = browserSync.reload
var rename = require('gulp-rename')

gulp.task('js', function () {
  gulp.src(config.src.js + '**/*.js')
    .pipe(cache('linting'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(eslint({
      // конфиг в папке
      fix: true,
      configFile: 'gulp/tasks/jsconfig.json'
    }))
    .pipe(eslint.format())
    .pipe(include())
    .on('error', function () {notify('Javascript include error')})

    .pipe(gulp.dest(config.dest.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.dest.js))
    .pipe(reload({stream: true}))
})

gulp.task('js:watch', function () {
  gulp.watch(config.src.js + '*', ['js'])
})