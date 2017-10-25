import gulp from 'gulp'
import config from '../config'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cached'
import notify from 'gulp-notify'
let  imgSvg = config.src.img+'svg/*.*';

// copy static files
gulp.task('copy', function() {
	gulp.src([config.src.img+'**/*.*', '!'+imgSvg])
	.pipe(cache('coping'))
	.pipe(gulp.dest(config.dest.img));
	gulp.src(config.src.root+'fonts/*.*')
	.pipe(gulp.dest(config.dest.root+'fonts/'));
	gulp.src(config.src.root+'video/*.*')
	.pipe(gulp.dest(config.dest.root+'video/'));
});

// copy and minify images
gulp.task('copy:build', function() {
	gulp.src([config.src.img+'**/*.*', '!'+imgSvg])
	.pipe(notify("May need some time to minify images"))
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 7})
	]))
	.pipe(gulp.dest(config.dest.img));
	gulp.src(config.src.root+'fonts/*.*')
	.pipe(gulp.dest(config.dest.root+'fonts/'));
	gulp.src(config.src.root+'video/*.*')
	.pipe(gulp.dest(config.dest.root+'video/'));
});

gulp.task('copy:watch', function() {
	gulp.watch(config.src.img + '**/*.*', ['copy']);
	gulp.watch(config.src.root+'fonts/*', ['copy']);
});

