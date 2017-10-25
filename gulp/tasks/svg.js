import gulp from 'gulp'
import svgstore from 'gulp-svgstore'
import config from '../config'
import inject from 'gulp-inject'
import svgmin from 'gulp-svgmin'
import rename from 'gulp-rename'

gulp.task('svg', function() {
    let target = gulp.src(config.src.pug + "/includes/_svg-template.pug"),
        source = gulp.src(config.src.svg + '*.svg')
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }));


    function fileContents (filePath, file) {
        return file.contents.toString();
    }
    return target
        .pipe(inject(source, { transform: fileContents }))
        .pipe(gulp.dest(config.src.pug + "/includes"));
});

gulp.task('svgmin', function(){
    return gulp
        .src(config.src.svg + "*.svg")
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dest.svg))
})

gulp.task('svg:watch', function() {
    gulp.watch(config.src.svg + '*', ['svg']);
});