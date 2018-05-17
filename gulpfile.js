'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const dest = './';
const cssFile = 'main';

/**
*	Move miscellaneous directories/files from
* 	the source to the dest.
*/
gulp.task('move', () => {
	return gulp.src([
			'./src/img/*.*'
		], {base: './src'})
		.pipe(gulp.dest(dest));
});

/**
*	Move HTML from the source to the dest.
*/
gulp.task('html', () => {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest(dest))
		.pipe(browserSync.stream());
});

/**
*	Move sass files from the source, convert to css, add
*	prefixes to css properties, and place them in the dest.
*/
gulp.task('sass', () => {
	return gulp.src(`./src/scss/${cssFile}.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(dest))
		.pipe(browserSync.stream());
});

/**
*	Compress HTML in the public directory.
*/
gulp.task('htmlmin', ['html'], () => {
	return gulp.src('./*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(dest));
});

/**
*	Compress CSS in the public directory.
*/
gulp.task('cleanCss', ['sass'], () => {
	return gulp.src(`./${cssFile}.css`)
		.pipe(cleanCss())
		.pipe(gulp.dest(dest));
});

/**
*	Watch for changes to HTML and Sass, and 
*	start up the browsersync server.
*/
gulp.task('serve', ['move', 'html', 'sass'], () => {
	browserSync.init({ 
	    server: dest,
	    open: false, // don't open tab in browser
	    ui: false
	});

	gulp.watch('./src/*.html', ['html'])
		.on('change', browserSync.reload);

	gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
gulp.task('build', ['move', 'htmlmin', 'cleanCss']);