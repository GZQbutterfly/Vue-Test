let gulp = require('gulp');

let pathOp = {
    dist: 'dist',
    copy: ['src/**/**.html']
};

let host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

gulp.task('copy', function() {
    return gulp.src(pathOp.copy, {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});



gulp.task('default', ['copy'], function() {
    // 将你的默认的任务代码放在这
    console.log('I am starting');
});
