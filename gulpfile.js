const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const del = require('del');

//compile, prefix, and min scss
function compilescss() {
  return src('src/scss/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
}

function csslibs() {
  return src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
      'src/css/**/*.css'
  ])
      .pipe(concat('_libs.scss'))
      .pipe(dest('src/scss'))
      .pipe(browserSync.stream())
} 

// minify js
function jsmin() {
  return src([
      'node_modules/slick-carousel/slick/slick.js',
      'src/js/**/*.js'
  ])
      .pipe(concat('main.min.js'))
      .pipe(terser())
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream())
}

//optimize and move images
function optimizeimg() {
  return src('src/images/*.{jpg,png}')
      .pipe(imagemin([
          imagemin.mozjpeg({quality: 80, progressive: true}),
          imagemin.optipng({optimizationLevel: 2}),      
      ]))
      .pipe(dest('dist/images'))
}

function moveimg() {
  return src('src/images/icons/*.*')
  .pipe(dest('dist/images/icons'))
}

function webpImage() {
    return src('dist/images/*.{jpg,png}')
      .pipe(imagewebp())
      .pipe(dest('dist/images'))
  };

//Init server
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
}
  
//watchtask
function watching() {
  watch(['dist/*.html']).on('change', browserSync.reload);
  watch(['src/scss/**/*.scss'], compilescss);
  watch('src/images/*.{jpg,png}', optimizeimg); 
  watch('src/images/icons/*.*', moveimg); 
  watch('dist/images/*.{jpg,png}', webpImage); 
  watch(['src/js/**/*.js'], jsmin);
}

//dist version
function cleanDistImages() {
  return del('dist/images')
}

// Default Gulp task 
exports.default = parallel(csslibs, compilescss, jsmin, browsersync, watching)
exports.clean = series(cleanDistImages, optimizeimg, moveimg, webpImage);

function compilewpscss() {
  return src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 2 versions'))
  .pipe(dest('wp/css'))
}

function csswplibs() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'src/css/**/*.css'
  ])
      .pipe(dest('wp/css'))
}

function jswp() {
  return src([
    'src/js/**/*.js'
])
    .pipe(dest('wp/js'))
}

function movewpimg() {
  return src('src/images/**/*.*')
    .pipe(dest('wp/images'))
}

function cleanwp() {
  return del('wp')
}

exports.wp = series(cleanwp, compilewpscss, csswplibs, jswp, movewpimg)