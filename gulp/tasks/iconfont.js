import gulp from 'gulp';
import notify from 'gulp-notify';
import iconfont from "gulp-iconfont";
import consolidate from "gulp-consolidate";
import config from '../config';
import browserSync from 'browser-sync';

let reload = browserSync.reload;

let fontname = 'svgfont';
gulp.task('font', function(){
  return gulp.src(config.src.img+'svg/*.svg')
    // .pipe(svgmin())
    .pipe(iconfont({
      fontName: fontname,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }))
    .on('glyphs', function(glyphs, options) {
        console.log(glyphs);
        gulp.src(config.src.helpers+'_svgfont.sass')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: 'fonts/',
                className: 'icon'
            }))
            .pipe(gulp.dest(config.src.sass+'lib/'));
        gulp.src(config.src.helpers+'icons.html')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: 'fonts/',
                className: 'icon',
                htmlBefore: '<i class="icon ',
                htmlAfter: '"></i>',
                htmlBr: ''
            }))
            .pipe(gulp.dest(config.dest.root));
    })
    .pipe(gulp.dest(config.dest.css+'fonts/'))
    .pipe(reload({stream: true}))
    .pipe(notify("Icon font updated!"));
});

gulp.task('font:watch', function() {
    gulp.watch(config.src.img+'svg/*', ['font']);
});
