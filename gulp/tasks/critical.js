import gulp from 'gulp'
import config from '../config'
let gutil = require('gulp-util');
let critical = require('critical').stream;

gulp.task("critical", function(){
	return gulp.src([config.dest.html + "*.html"])
			.pipe(critical({
				base: config.dest.html, 
				inline: true,
				minify: true,
				css: [config.dest.css + "screen.css"]
			}))
			.on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
			.pipe(gulp.dest(config.dest.html));
});


gulp.task('critical:watch', function() {
	gulp.watch(config.dest.html + '*.html', ['critical']);
});
