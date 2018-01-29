/**
 * Created by JedBr on 1/22/2018.
 */

var gulp = require('gulp');
var sass = require("gulp-sass");


gulp.task('styles', function() {
    gulp.src('nginx-1.10.3/public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('nginx-1.10.3/public/css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('nginx-1.10.3/public/scss/**/*.scss',['styles']);
});