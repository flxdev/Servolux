import gulp from 'gulp'
import browserSync from 'browser-sync'
import config from '../config'

//webserver
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: config.dest.root
        },
        files: [config.dest.html + '*.html', config.dest.css + '*.css', config.dest.js + '*.js'],
        port: 8080,
        notify: false,
        ghostMode: false,
        online: true,
        open: "local",
        logLevel: "info"
    });
});