// 引入 gulp及组件
var gulp = require('gulp'),  //gulp基础库
    minifycss = require('gulp-minify-css'),   //css压缩
    concat = require('gulp-concat'),   //合并文件
    uglify = require('gulp-uglify'),   //js压缩
    rename = require('gulp-rename'),   //文件重命名
    notify = require('gulp-notify');   //提示

//css处理
gulp.task('css', function () {
    return gulp.src('libs/payboard.css')      //设置css
        .pipe(rename({ suffix: '.min' }))         //修改文件名
        .pipe(minifycss())                    //压缩文件
        .pipe(gulp.dest('libs'))            //输出文件目录
        .pipe(notify({ message: 'css task ok' }));   //提示成功
});
//JS处理
gulp.task('js', function () {
    return gulp.src(['./libs/payboard.js'])  //选择合并的JS
    .pipe(rename({ suffix: '.min' }))     //重命名
    .pipe(uglify())                    //压缩
    .pipe(gulp.dest('dist'))            //输出 
    .pipe(notify({ message: "js task ok" }));    //提示
});