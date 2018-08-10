'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import htmlmin from 'gulp-htmlmin';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
const browserSync = require('browser-sync').create();

const commonDest = './';
const cssFile = 'main';

const paths = {
	move: {
		src: ['./src/img/*.*'],
		dest: commonDest
	},
	html: {
		src: './src/*.html',
		dest: commonDest
	},
	sass: {
		src: `./src/scss/${cssFile}.scss`,
		dest: commonDest
	},
	htmlmin: {
		src: './*.html',
		dest: commonDest
	},
	cleanCss: {
		src: `./${cssFile}.css`,
		dest: commonDest
	}
};

/**
*	Move miscellaneous directories/files from
* 	the source to the dest.
*/
gulp.task('move', () => {
	const { src, dest } = paths.move;
	return gulp
		.src(src, {base: './src'})
		.pipe(gulp.dest(dest));
});

/**
*	Move HTML from the source to the dest.
*/
gulp.task('html', () => {
	const { src, dest } = paths.html;
	return gulp
		.src(src)
		.pipe(gulp.dest(dest))
		.pipe(browserSync.stream());
});

/**
*	Move sass files from the source, convert to css, add
*	prefixes to css properties, and place them in the dest.
*/
gulp.task('sass', () => {
	const { src, dest } = paths.sass;
	return gulp
		.src(src)
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
	const { src, dest } = paths.htmlmin;
	return gulp
		.src(src)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(dest));
});

/**
*	Compress CSS in the public directory.
*/
gulp.task('cleanCss', ['sass'], () => {
	const { src, dest } = paths.cleanCss;
	return gulp
		.src(src)
		.pipe(cleanCss())
		.pipe(gulp.dest(dest));
});

/**
*	Watch for changes to HTML and Sass, and 
*	start up the browsersync server.
*/
gulp.task('serve', ['move', 'html', 'sass'], () => {
	browserSync.init({ 
	    server: commonDest,
	    open: false, // don't open tab in browser
	    ui: false
	});

	gulp.watch('./src/*.html', ['html'])
		.on('change', browserSync.reload);

	gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
gulp.task('build', ['move', 'htmlmin', 'cleanCss']);