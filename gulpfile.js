'use strict';
const rimraf = require('gulp-rimraf');
const pngquant = require('imagemin-pngquant');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const markdown = require('gulp-markdown');
const watch = require('gulp-watch');
//**** ****//
const dirSync = require('gulp-directory-sync');
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const mincss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const del = require('del');
sass.compiler = require('node-sass');
//**** ****//


//browser


gulp.task('browser-sync', function () {
    browserSync.init({
        port: 1337,
        server: {
            baseDir: 'dist'
        }
    });
});
//**** ****//


//Политика


//

//Mailer

//////////////

//**** ****//

//cleaner

gulp.task('clean', function (cb) {
    return del('dist', cb);
});
//**** ****//

//перетащим html файлы в dist
gulp.task('html', function () {
    return gulp.src(['app/*.html'])
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
})
//**** ****//


//скомпилируем scss

gulp.task('sass', function () {
    return gulp.src('app/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(mincss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});
//**** ****//

// перекидываем js объединяем

gulp.task('js', function () {
    return gulp.src('app/js/main.js')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});
//**** ****//

// image, svg, png, jpeg
gulp.task('image', function () {
    return gulp.src('app/img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
})
//**** ****//

// Шрифты
gulp.task('fonts', function () {
    return gulp.src(['app/fonts/*.ttf'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
})
//**** ****//

//Будем следить за файлами
gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/js/**/*.js', gulp.parallel('js'));
    gulp.watch('app/**/*.html', gulp.parallel('html'));
    gulp.watch('app/img/**/*.*', gulp.parallel('image'));
    gulp.watch('app/fonts/*.*', gulp.parallel('fonts'))
});
//**** ****//


//Построим проект
gulp.task('build', gulp.series('clean', gulp.parallel('fonts','sass', 'js', 'html', 'image')));
//**** ****//



//Построим, запустим и будем смотреть
gulp.task('default', gulp.parallel('fonts','html', 'sass', 'js', 'image', 'browser-sync', 'watch'));
//**** ****//
