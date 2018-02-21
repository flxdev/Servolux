import gulp         from 'gulp';
import postcss      from 'gulp-postcss';
import sass         from 'gulp-sass';
import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import mqpacker     from 'css-mqpacker';
import config       from '../config';
import cssnano      from 'cssnano';
import cssvariables from 'postcss-css-variables';
import pxtorem      from 'postcss-pxtorem';
import rename from 'gulp-rename'
import cache from 'gulp-cached'
import notify from 'gulp-notify'



let processors = [
	autoprefixer({
		browsers: ['last 4 versions', 'IE 6'],
		cascade: false
	}),
	cssvariables({
		preserve: true
	}),
	pxtorem({
		rootValue: 16,
		propList: ['*'],
		mediaQuery: false,
		minPixelValue: 12
	}),
	mqpacker({
		sort: sortMediaQueries
	}),
	cssnano({
		minifyFontValues: false,
		discardUnused: false
	})
];

gulp.task('sass', () => {
	return gulp
		.src(`${config.src.sass}/*.{sass,scss}`)
		.pipe(sourcemaps.init())
		.pipe(sass({precision: 5}).on('error', notify.onError({
			title: 'Sass Error!',
			message: '<%= error.message %>'
		})))
		.pipe(cache('sassing'))
		.pipe(postcss(processors))
		.pipe(gulp.dest(config.dest.css))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', () => {
	gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, ['sass']);
});

let isMax = (mq) => /max-width/.test(mq);
let isMin = (mq) => /min-width/.test(mq);

function sortMediaQueries (a, b) {
	const A = a.replace(/\D/g, '');
	const B = b.replace(/\D/g, '');

	if (isMax(a) && isMax(b)) {
		return B - A;
	} else if (isMin(a) && isMin(b)) {
		return A - B;
	} else if (isMax(a) && isMin(b)) {
		return 1;
	} else if (isMin(a) && isMax(b)) {
		return -1;
	}

	return 1;
}
