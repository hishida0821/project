import gulp from 'gulp';
import pug from 'gulp-pug';
import gulpSass from "gulp-sass";
import sassCompiler from "sass";
const sass = gulpSass(sassCompiler);
import autoprefixer from 'gulp-autoprefixer';
import typescript from 'gulp-typescript';
import browserSync from "browser-sync";

gulp.task("browser-sync", () => {
  browserSync({ server: {
      baseDir: "./dist",
      index : "index.html"
    }
  })
})

gulp.task('browser-reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('pug', () => {
  console.log('=== pug コンパイル ===');
  return gulp.watch('./src/**/*.pug', function(){
    return(
      gulp.src(
          ['./src/pug/**/*.pug', '!./src/pug/**/_*.pug', '!./src/pug/inc/**/*.pug']
      )
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
    );
  })
});

gulp.task("scss", function() {
  console.log('=== scss コンパイル ===');
  return gulp.watch('./src/scss/*.scss', function(){
    return (
      gulp
        .src('src/scss/*.scss')
        .pipe(sass())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({
          cascade: false,
          grid: true
        }))
        .pipe(gulp.dest("./dist/assets/css"))
    );
  })
});

gulp.task('ts', function() {
  console.log('=== typescript コンパイル ===');
  return gulp.watch('src/ts/*.ts', function(){
    return(  
      gulp
        .src('src/ts/*.ts')
        .pipe(typescript())
        .pipe(gulp.dest('./dist/assets/js'))
    );
  })
});

gulp.task('default', gulp.series( gulp.parallel('browser-sync', 'pug', 'scss', 'ts')));
