import gulp from 'gulp'
import config from '../config'
import critical from 'critical'

gulp.task("critical", function(){
	return gulp.src([config.dest.html + "*.html"])
			.pipe(critical({
				base: config.dest.html, 
				inline: true,
				minify: true,
				css: [config.dest.css + "screen.css"]
			}))
			.pipe(gulp.dest(config.dest.html));
});

gulp.task('critical:watch', function() {
	gulp.watch(config.dest.html + '*.html', ['critical']);
});
