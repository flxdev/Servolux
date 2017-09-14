import gulp from 'gulp'
import rimraf from 'rimraf'
import config from '../config'
let gulpsync = require('gulp-sync')(gulp);

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'pug:watch',
    'js:watch',
    'svg:watch',
    'svgmin:watch'
]);

gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['server', 'watch'], function() {});
gulp.task('build', gulpsync.sync(['delete','pug','copy','js','sass','svg','critical']), function() {});