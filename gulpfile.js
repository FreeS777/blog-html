import gulp from "gulp";
import browserSync from "browser-sync";
import ignore from "gulp-ignore";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
const bs = browserSync.create();

gulp.task("sass", () => {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(ignore.exclude("**/config.sass"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(bs.stream());
});

gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("public/js"))
    .pipe(bs.stream());
});

gulp.task("img", () => {
  return gulp
    .src("src/img/**/*")
    .pipe(gulp.dest("public/img"))
    .pipe(bs.stream());
});

gulp.task("html", () => {
  return gulp.src("src/**/*.html").pipe(gulp.dest("public")).pipe(bs.stream());
});

gulp.task("browser-sync", () => {
  bs.init({
    server: {
      baseDir: "public",
    },
  });
  bs.watch("src/sass/**/*.scss", gulp.series("sass"));
  bs.watch("src/js/**/*.js", gulp.series("js"));
  bs.watch("src/img/**/*", gulp.series("img"));
  bs.watch("src/**/*.html", gulp.series("html"));
});

gulp.task(
  "default",
  gulp.parallel("sass", "js", "img", "html", "browser-sync")
);
