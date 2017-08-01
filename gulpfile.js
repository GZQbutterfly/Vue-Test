let gulp = require('gulp'),
    md5 = require('gulp-md5-plus'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    cssmin = require('gulp-cssmin'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    concat = require('gulp-concat');

//npm install --save --dev gulp-less
let sync = require('run-sequence');
let webpack = require("webpack-stream");
let todo = require("gulp-todoist");

let pathOp = {
    entry: 'src/app/app.js',
    js: 'src/app/**/*!(.spec.js).js',
    dist: 'dist',
    copy: ['src/**/**.html'],
    images: ['src/app/assest/**/*'],
    css: ['src/**/**.css', 'src/**/**.scss'],
    static: {
        css: 'dist/assest/css/',
        images: 'dist/assest/images/',
        js: 'dist/assest/js/'
    }
};

let host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};


//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function(done) {
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'lessmin'], function(done) {
    var timestamp = +new Date();
    gulp.src('dist/css/style.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest(pathOp.static.css))
        .on('end', done);
});

//将图片拷贝到目标目录
gulp.task('copy:images', function(done) {
    gulp.src(pathOp.images).pipe(gulp.dest(pathOp.static.images)).on('end', done);
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('lessmin', function(done) {
    gulp.src(pathOp.css)
        .pipe(less())
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        .pipe(spriter({}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(pathOp.static.css))
        .on('end', done);
});

gulp.task('copy', function() {
    return gulp.src(pathOp.copy, {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

gulp.task('todo', function() {
    return gulp.src(pathOp.js).pipe(todo({
        silent: false,
        verbose: true
    }));
});


gulp.task('build', ['todo'], function() {
    return gulp.src(pathOp.entry).pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest(pathOp.dist));
});
gulp.task('watch', function() {
    //gulp.watch(paths.app, ['build']);
    gulp.watch(pathOp.toCopy, ['copy']);
});

gulp.task('default', function(done) {
    // 将你的默认的任务代码放在这
    sync('build', 'md5:css', 'copy', 'watch', done);
    console.log('I am starting');
});
