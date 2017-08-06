var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');

var uglify = require('gulp-uglify');
var pkg = require('./package.json');


// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src(['css/styles.css', 'css/accordion.css'])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '',
      index: "index.html"

    },
  })
})

// Compiles SCSS files from /scss into /css
// NOTE: This theme uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
gulp.task('sass', function() {
  return gulp.src(['scss/styles.scss', 'scss/accordion.scss'])
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Dev task with browserSync
gulp.task('serve', ['browserSync', 'sass', 'minify-css'], function() {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});
