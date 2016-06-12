import gulp from 'gulp'
import gutil from 'gulp-util'
import standard from 'gulp-standard'
import browserify from 'browserify'
import derequire from 'gulp-derequire'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import { Server } from 'karma'

gulp.task('default', ['build', 'test'])
gulp.task('build', ['js', 'minify'])
gulp.task('test', ['standard', 'karma'])

gulp.task('js', () => {
  const b = browserify('src/index.js', {
    transform: ['babelify'],
    standalone: 'relativeDate'
  })

  return b.bundle()
    .on('error', (error) => gutil.log('Browserify Error:', error.toString()))
    .pipe(source('index.js'))
    .pipe(rename('angular-relative-date.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(derequire())
    .pipe(gulp.dest('dist'))
})

gulp.task('minify', ['js'], () => {
  return gulp.src('dist/angular-relative-date.js')
    .pipe(rename('angular-relative-date.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('standard', () => {
  return gulp.src('{gulpfile.babel.js,src/*.js}')
    .pipe(standard())
    .pipe(standard.reporter('default', { breakOnError: true }))
})

gulp.task('karma', ['js'], (done) => {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start()
})
