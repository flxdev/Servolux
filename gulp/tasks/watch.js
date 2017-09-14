var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'pug:watch',
    'js:watch',
    'svg:watch',
    'svgmin:watch'
]);

gulp.task('sync', function (cb) {
	// setTimeout может быть асинхронной задачей
	setTimeout(function () {
		cb();
	}, 10000);
});

gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['server', 'watch'], function() {});
gulp.task('build', gulpsync.sync(['delete','pug','copy','js','sass','svg','critical']), function() {});