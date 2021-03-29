
// 引入本地安装的gulp
var gulp = require('gulp');

var less = require('gulp-less');

var cssmin = require('gulp-cssmin');

var imagemin = require('gulp-imagemin');

var uglify = require('gulp-uglify');

var concat = require('gulp-concat');

var htmlmin = require('gulp-htmlmin');

var autoprefix = require('gulp-autoprefixer');

var rev = require('gulp-rev');

var revCollector = require('gulp-rev-collector');

var useref = require('gulp-useref');

var gulpif = require('gulp-if');

// 返回值gulp是一个对象，借助此对象可以实现任务清单订制
// 通过一系列方法实现

// 定义任务(将less转成css)
gulp.task('less', function () {
	/*
	  gulp 寻找路径
	 	/* 表示目录下所有
		/* .js表示目录下所有js文件
		/** 递归子文件夹所有文件
	*/
	// 借助gulp.src来指定less文件位置
	gulp.src('./public/less/*.less')
		// 借助于gulp插件实现less 转 css 的操作
		.pipe(less())
		.pipe(cssmin())
		.pipe(autoprefix())
		.pipe(rev())
		// 通过gulp.dest进行存储
		.pipe(gulp.dest('./release/public'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./release/rev'));

});

// 处理图片(压缩图片)
gulp.task('image', function () {

	gulp.src('./public/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./release/public/images'));

});

// 压缩JS
// 注意js在压缩的时候，方法参数名，会被压缩成单字母
gulp.task('js', function () {

	gulp.src('./scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./release'))
});

// 压缩html
gulp.task('html', function () {

	//{base:./}    表示前面路径指定的文件，保持当前路径 ，即./index.html路径还是当前文件夹，后面路径的文件，操作完成之后，放在desk指定路径
	gulp.src(['./index.html', './views/*.html'], {base: './'})
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyJS: true}))
		.pipe(gulp.dest('./release'));

});

// 替换操作
gulp.task('rev', function () {

	gulp.src(['./release/rev/*.json', './release/**/*.html'], {base: './release'})
		.pipe(revCollector())
		.pipe(gulp.dest('./release'));
});



// 
gulp.task('useref', function () {

	gulp.src('./index.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest('./release'));

})