var gulp = require('gulp');
//编译less
var less = require('gulp-less');
// 添加hash版本号
var rev = require('gulp-rev-append');
//压缩css
let cleanCSS = require('gulp-clean-css');
//压缩js
let uglify = require("gulp-uglify");
//压缩图片
const imagemin = require('gulp-imagemin');
//为css添加前缀
const autoprefixer = require('gulp-autoprefixer');
//babel
const babel = require('gulp-babel');
//编译less
gulp.task('less', function() {
    // 将你的默认的任务代码放在这
    //将less文件 输出 为 css文件
    gulp.src('./less/*.less').pipe(less())
        //添加前缀
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // 压缩css
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        //打包出来
        .pipe(gulp.dest('./dist/css'));
});
//压缩js
gulp.task("uglify", function() {
    //获取要压缩的js
    return gulp.src("./js/*.js")
        //把es6 -> es5
        .pipe(babel({
            presets: ['es2015']
        }))
        //压缩js    
        .pipe(uglify())
        //输出压缩后的结果
        .pipe(gulp.dest("./dist/js"));
});

//压缩图片
gulp.task('imagemin', () =>
    gulp.src('./imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/imgs'))
);

//添加版本号，清除页面引用缓存
gulp.task('hash', function() {
    gulp.src('./questionAndAnswer.html')
        .pipe(rev())
        .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['less', 'uglify', 'imagemin', 'hash'], function() {
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./js/*.js', ['uglify']);
    gulp.watch('./imgs/*', ['imagemin']);

    gulp.watch('./questionAndAnswer.html', ['hash']);
});