import gulp from 'gulp'
import notify from 'gulp-notify'
import plumber from "gulp-plumber"
import pug from "gulp-pug"
import config from '../config'
import cache from 'gulp-cached'
// var changed = require("gulp-changed");

gulp.task('pug', function() {
    return gulp.src([
            config.src.pug + '/*.pug', 
            '!' + config.src.pug + '/_*.pug', 
            '!' + config.src.pug + '/includes/*.pug'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        // .pipe(changed(dest.html, {extension: '.html'}))
        .pipe(pug({pretty: true}))
        .pipe(cache('pugging'))
        .pipe(gulp.dest(config.dest.html));
});


gulp.task('pug-all', function() {
    return gulp.src([
        config.src.pug + '/*.pug', 
        '!' + config.src.pug + '/_*.pug', 
        '!' + config.src.pug + '/includes/*.pug'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(pug({pretty: true}))
        .pipe(cache('puggingall'))
        .pipe(gulp.dest(config.dest.html));
});

gulp.task('pug:watch', function() {
    gulp.watch(config.src.pug + '/**/*.pug', ['pug']);
    gulp.watch([config.src.pug + '/_*.pug', config.src.pug + '/includes/*.pug'], ['pug-all']);
});
