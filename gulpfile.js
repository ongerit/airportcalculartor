'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
compass = require('gulp-compass'),
livereload= require('gulp-livereload'),
webserver = require('gulp-webserver');


livereload({ start:true})

gulp.task('default',['sass','compass','webserver'], function(){
//gulp tasks
	

});


//WEBSERVER

gulp.task('webserver',function(){
	gulp.src('../airportcalculator')
		.pipe(webserver({
			livereload:true,
			directoryListing: true,
			open:true
		}));	
});

//SASS

gulp.task('sass',function(){
//gulp tasks
	gulp.src('sass/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
	;

});
gulp.task('sass:watch',function(){
	gulp.watch('sass/*.scss',['sass']);
	
});

//COMPASS

gulp.task('compass', function(){
	
	gulp.src('sass/*.scss')
		.pipe(compass({
			config_file:'config.rb',
			css:'css',
			sass:'sass'
		}))
		.pipe(gulp.dest('css'))
	
});

//WATCH


gulp.task('watch', function () {
    var server = livereload();

    gulp.watch('sass/*.scss', ['compass']).on('change', function(e){
        console.log('Your scss file ' + e.path + ' has been compiled');
    });

    gulp.watch(watched.all).on('change', function(e){
        server.changed(e.path);
    });

});


/*-------------------------------------------------------------------
    Configuration
-------------------------------------------------------------------*/
var path = {
    app: "app",
    scss: "app/css",
    css: "app/css",
    js: "app/js",
    img: "app/img"
}

var watched = {
    scss: path.scss + 'sass/*.scss',
    html: path.app + '/**/*.html',
    img: path.img + '/**/*',
    all: path.app + '*.*'
}