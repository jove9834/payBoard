// 引入 gulp及组件
var gulp = require('gulp'),  //gulp基础库
    minifycss = require('gulp-minify-css'),   //css压缩
    concat = require('gulp-concat'),   //合并文件
    uglify = require('gulp-uglify'),   //js压缩
    rename = require('gulp-rename'),   //文件重命名
    notify = require('gulp-notify'),   //提示
    through2 = require('through2'),
    replace = require('gulp-replace')

//JS处理
gulp.task('build', function () {
    gulp.src('src/payboard.css')      //设置css
        .pipe(rename({ suffix: '.min' }))         //修改文件名
        .pipe(minifycss())
        .pipe(through2.obj(function (chunk, enc, callback){
            if (chunk.isStream()) {
                return callback();
            }
            if (chunk.isBuffer()) {
                var contents = '<style type="text/css">' + chunk.contents.toString('utf8') + '</style>'
                gulp.src(['./src/payboard.js'])  //选择合并的JS
                    .pipe(rename('payboard.min.js'))     //重命名
                    .pipe(replace(/var\sstyles\s=\s'[^']*'/, "var styles = '" + contents + "'"))
                    .pipe(uglify())                    //压缩
                    .pipe(gulp.dest('dist'))            //输出
                    .pipe(notify({ message: "minjs files builded" }));    //提示
                gulp.src(['./src/payboard.js'])  //选择合并的JS 
                    .pipe(rename('payboard.common.js'))     //重命名
                    .pipe(replace(/var\sstyles\s=\s'[^']*'/, "var styles = '" + contents + "'"))
                    .pipe(replace(/window.PayBoard=payBoard/, "module.exports=payBoard"))
                    .pipe(uglify()) 
                    .pipe(gulp.dest('dist'))
                    .pipe(notify({ message: "commonjs files builded" }));    //提示
            }
            this.push(chunk);
            callback()
        }))  //加载css到js文件中动态插入
        .pipe(notify({ message: 'css files builded' }));   //提示成功
});