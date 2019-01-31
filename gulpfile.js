'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');

const config = {
    assetsDir: 'src/sass',
    assetsDist: 'public/css',
    npmDir: 'node_modules',
};

gulp.task('stylesPlugins', function () {

    return gulp.src([
            config.npmDir + '/font-awesome/css/font-awesome.css',
        ])
        .pipe(plugins.concat('plugin.css'))
        .pipe(plugins.cleanCss({
            debug: true,
            processImport: false
        }))
        .pipe(gulp.dest(config.assetsDist));
});

gulp.task('build', function () {

    return gulp.src(config.assetsDir + '/**/*.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.postcss([
            autoprefixer({
                browsers: ["last 3 versions"],
            }),
        ]))
        .pipe(plugins.replace("../../Images/", "../Images/"))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.cleanCss({
            debug: true,
            processImport: false
        }))
        .pipe(gulp.dest(config.assetsDist));
});


gulp.task("stylesDev", () => {

    return gulp.src(config.assetsDir + '/**/*.scss')
        .pipe(plugins.stylelint({
            failAfterError: false,
            debug: true,
            reporters: [{
                formatter: 'verbose',
                console: true
            }, ],
        }))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.replace("../../Images/", "../Images/"))
        .pipe(gulp.dest(config.assetsDist));
})

gulp.task('watch', function () {
    gulp.watch(config.assetsDir + '/**/*.scss', gulp.series(
        gulp.parallel('stylesDev')
    ));
});


gulp.task('default',
    gulp.series('watch')
);