import gulp from 'gulp'
import include from 'gulp-include'
import uglify from 'gulp-uglify'
import eslint from 'gulp-eslint'
import config from '../config'
import browserSync from 'browser-sync'
import babel from 'gulp-babel'
import cache from 'gulp-cached'
import error from './error'

let reload = browserSync.reload,
  rename = require('gulp-rename')

gulp.task('js', function () {
  gulp.src(config.src.js + '**/*.js')
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
    .on('error', error)
    .pipe(cache('jsing'))
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