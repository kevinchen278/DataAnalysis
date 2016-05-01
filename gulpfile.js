/* required methods 
*/
var gulp	= require('gulp'),
 	concat	= require('gulp-concat'),
	rename	= require('gulp-rename'),
	gulpCopy = require('gulp-copy'),
	uglify	= require('gulp-uglify'),
	watch 	= require('gulp-watch'),
	less 	= require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	jshint  = require('gulp-jshint'),
	browserSync	= require('browser-sync'),
	sourcemaps = require('gulp-sourcemaps'),
	htmlmin = require('gulp-htmlmin'),
	templateCache = require('gulp-angular-templatecache'),
	runSequence = require('run-sequence');

/* tasks */

gulp.task('js', function() {
	return gulp.src(['Settings.js', 'main.js','public/**/*.js'])
    	.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
    	.pipe(sourcemaps.write('maps'))
    	.pipe(gulp.dest('release'));
});

gulp.task('html', function(){
	return gulp.src('public/modules/**/*.html')
		  .pipe(htmlmin({collapseWhitespace: true}))
		  .pipe(templateCache('html.js',{module:'app',base:'/Users/licong/git/openshift/dataanalysis/public/'}))
		  .pipe(uglify())
    	  .pipe(gulp.dest('release'));
});


gulp.task('vendor', function() {
	return gulp.src(['bower_components/angular/angular.js',
					 'bower_components/jquery/dist/jquery.js',
					 'bower_components/angular-ui-router/release/angular-ui-router.js',
					 ''
					])
    	.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'))
		.pipe(uglify())
    	.pipe(sourcemaps.write('maps'))
    	.pipe(gulp.dest('/release'));
});


gulp.task('copyfile',function(){
	return gulp.src(['public/favicon.ico','public/index.html','public/Env.json'])
		   .pipe(gulp.dest('./release'));

});

gulp.task('copycss',function(){
	return gulp.src(['public/css/*.css'])
		   .pipe(gulp.dest('./release/css'));

});

gulp.task('build',function(callback){
	runSequence('js','html','copyfile','copycss',callback);
});


gulp.task('sass',function(){
	gulp.src(['app/css/styles.scss'])
		.pipe(sass({style:"expanded"}))
		.on('error',console.error.bind(console))
		.pipe(gulp.dest('app/css'));
});

gulp.task('sass-watch',function() {
	gulp.watch('app/css/**/*.scss',['sass']);
	gulp.watch('app/css/*.css',browserSync.reload);
});


gulp.task('watch',function(){
	   	browserSync({
	   		server: {
	   			baseDir: 'app/'
	   		}
	   	});
		gulp.watch('app/css/**/*.scss',['sass']);
		gulp.watch('app/js/**/*.js',browserSync.reload);
		gulp.watch('app/**/*.html',browserSync.reload);
    	gulp.watch('app/css/*.css',browserSync.reload);
});


gulp.task('imagemin', function () {
    return gulp.src('app/assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('cssmin', function () {
    gulp.src('app/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});


gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(myReporter));
});
 


