var gulp = require('gulp'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minify_css = require('gulp-minifycss'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		concat = require('glup-concat'),
		minify_html = require('gulp-htmlmin'),
		browser_sync = require('browser-sync').create();

gulp.task('html', function() {
	return gulp.src('./*.html')
		.pipe(minify_html({ collapseWhitespace: true }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
	return sass('./sass/*.scss', { style: 'compresse' })
		.pipe(gulp.dest('./dist/css'))
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(minify_css())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browser_sync.stream());
});

gulp.task('js', function() {
	return src('./js/*.js')
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('serve', ['html', 'sass', 'js'], function() {
	browser_sync.init({ server: './dist/' });

	gulp.watch('./*.html', ['html'], browser_sync.reload);
	gulp.watch('./sass/*.scss', ['sass']);
	gulp.watch('./js/*.js', ['js'], browser_sync.reload);
});

gulp.task('default', ['serve']);