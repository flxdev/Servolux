import gulp from 'gulp'
import config from '../config'
let  imgSvg = config.src.img+'svg/*.*';
// copy static files
gulp.task('copy', function() {
   gulp.src([config.src.img+'**/*.*', '!'+imgSvg])
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

