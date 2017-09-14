import gulp from 'gulp'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import autoprefixer from 'autoprefixer'
import notify from 'gulp-notify'
import mqpacker from "css-mqpacker"
import config from '../config'
import cssnano from 'cssnano'
import rename from 'gulp-rename'
import cssvariables from 'postcss-css-variables'
import cache from 'gulp-cached'


gulp.task('sass', function() {

    var processors = [
        autoprefixer({browsers: ['last 10 versions', 'IE 11'], cascade: false}),
        cssvariables({
            preserve: true
        }),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g,'');
                b = b.replace(/\D/g,'');
                return b-a;
                // replace this with a-b for Mobile First approach
            }
        })
    ];
    var processorsNano = [
        autoprefixer({browsers: ['last 10 versions', 'IE 11'], cascade: false}),
        cssvariables({
            preserve: true
        }),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g,'');
                b = b.replace(/\D/g,'');
                return b-a;
                // replace this with a-b for Mobile First approach
            }
        }),
        cssnano()
    ];

    return gulp.src(config.src.sass+'*.sass')
    .pipe(sass().on('error', notify.onError({
            title: 'Sass Error!',
            message: '<%= error.message %>'
        })))
    .pipe(postcss(processors))
    .pipe(cache('sassing'))
    .pipe(gulp.dest(config.dest.css))
    .pipe(postcss(processorsNano))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*', ['sass']);
});