var syntax        = 'sass'; 
var gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browsersync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	rsync         = require('gulp-rsync'),
	babelify      = require('babelify'),
	browserify    = require('browserify'),
	source        = require('vinyl-source-stream');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('browserify', function() {
 return browserify({ entries: 'app/libs/react/index.jsx', debug: true})
 .transform(babelify, {presets: ["es2015", "react"]})
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['styles', 'browserify', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch('app/libs/react/index.jsx', ['browserify']);
	gulp.watch(['app/*.html', 'app/libs/react/index.jsx'], browsersync.reload)
});

gulp.task('default', ['watch']);
