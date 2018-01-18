// initalize Gulp.js
var gulp = require('gulp');

// initalize Plugins
var sass = require ('gulp-sass'),
    imagemin = require ('gulp-imagemin'),
    uglify = require ('gulp-uglify'),
    concat = require ('gulp-concat'),
    rename = require ('gulp-rename'),
    postcss = require ('gulp-postcss');
    autoprefixer = require ('autoprefixer');

gulp.task('default', ['styles', 'images', 'js'], function() {
    // place code for your default task here
});

//Compress, compile and autoprefix SASS (SCSS) files
gulp.task('styles', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([autoprefixer({
            browsers: ['> 1%', 'last 2 versions']
        })]))
        .pipe(gulp.dest('assets/css/'))
});

//Compress all images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img'))
});

//Compress and combine JS files
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.js'))
        .pipe(gulp.dest('assets/js/'))
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/js/*.js', ['js']);
});