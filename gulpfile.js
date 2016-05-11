const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const angularProtractor = require('gulp-angular-protractor');
const server = require(__dirname + '/server.js');

var serverFiles = ['./*.js'];
var specFiles = ['./test/**/*spec.js'];
var testFiles = ['./test/**/*test.js'];
var appFiles = ['./app/**/*.js'];

gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  return gulp.src(testFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:spec', () => {
  return gulp.src(specFiles)
  .pipe(eslint('./test/integration/.eslintrc.json'))
  .pipe(eslint.format());
});

gulp.task('lint:app', () => {
  return gulp.src(appFiles)
    .pipe(eslint('./app/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  gulp.src('app/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('test:protractor', ['build:dev'], () => {
  return gulp.src(['./test/integration/*spec.js'])
    .pipe(angularProtractor({
      'configFile': './test/integration/config.js',
      'debug': true,
      'autoStartStopServer': true
    }))
    .on('end', () => {
      server.close();
    });
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('lint', ['lint:server', 'lint:spec', 'lint:test', 'lint:app']);
gulp.task('test', ['test:protractor']);

gulp.task('default', ['build:dev', 'lint', 'test']);
