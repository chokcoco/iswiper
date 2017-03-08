var gulp = require('gulp');
var gutil = require('gulp-util');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var tap = require('gulp-tap');
var browserSync = require('browser-sync');
var pkg = require('./package.json');

gulp.task('build', function () {
    gulp.src('src/example/**/*')
        .pipe(gulp.dest('dist/example'));

    gulp.src('src/*.less')
        .pipe(less().on('error', function (e){
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist'))
        .pipe(minify())
        .pipe(rename(function (file){
            file.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename(function (file){
            file.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: 8081,
            weinre: {
                port: 9090
            }
        },
        port: 8080,
        startPath: '/example'
    });
});

gulp.task('watch', ['build', 'server'], function (){
    gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['watch']);
