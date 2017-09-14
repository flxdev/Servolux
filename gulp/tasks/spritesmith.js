import gulp from 'gulp'
import notify from 'gulp-notify'
import spritesmith from 'gulp.spritesmith'
import config from '../config'

gulp.task('sprite', function() {
    let spriteData = gulp.src(config.src.img + '/icons/*.png')
    .pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_sprite.sass',
        imgPath: '../img/icons.png',
        cssFormat: 'sass',
        padding: 4,
        // algorithm: 'top-down',
        cssTemplate: config.src.helpers + '/sprite.template.mustache'
    }));
    spriteData.img
        .pipe(gulp.dest(config.dest.img));
    spriteData.css
        .pipe(gulp.dest(config.src.sass+'/lib/'))
        .pipe(notify("New sprite created!"));
});

gulp.task('sprite:watch', function() {
    gulp.watch(config.src.img + '/icons/*.png', ['sprite']);
});

