//Установка Gulp: npm install gulp
const gulp = require('gulp');

//**Работа с html */
//Минификация html: npm i gulp-htmlmin
const htmlmin = require('gulp-htmlmin');


//**Работа с SASS и СSS */
//Подключение компиляции sass файлов: npm install sass gulp-sass --save-dev
//https://www.npmjs.com/package/gulp-sass
//var sass = require('gulp-sass');
var sass = require('gulp-sass')(require('sass'));
//sass.compiler = require('node-sass');


//**Очищение CSS кода */
//https://www.npmjs.com/package/gulp-clean-css : npm install gulp-clean-css --save-dev
const cleanCSS = require('gulp-clean-css');


//**Работа с JavaScript */
//Собирает все модули require и конпонует в один файл: npm install -g browserify
//http://browserify.org/
const browserify = require('browserify');

//Преобразует читаемый поток , который вы получаете от browserify , в виниловый поток , который ожидает получить gulp: npm i vinyl-source-stream
//https://www.npmjs.com/package/vinyl-source-stream
const source = require('vinyl-source-stream');

//Сохранение JS кода в буфер, для последующей информации: npm i vinyl-buffer
//https://www.npmjs.com/package/vinyl-buffer
var buffer = require('vinyl-buffer');

//Сокращение Java Script кода: npm i gulp-uglify
//https://www.npmjs.com/package/gulp-uglify
var uglify = require('gulp-uglify');


//**Перенос html и минификация
gulp.task('copy-html', function(done){
   return gulp.src('./src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./'))
      done();
});

//**Преобразование scss, минифицирование и перенос
gulp.task('build-scss', ()=> {
    return gulp.src('./src/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("./css"));
});

//**Перенос css 
gulp.task('copy-css', function(done){
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("./css"))
    done();
});

//**Перенос img
gulp.task('copy-img', function(done){
  return gulp.src('./src/image/*.*')
    .pipe(gulp.dest("./image"))
    done();
});

//**Сборка и перенос js
gulp.task('build-js', ()=>{
    //Взятие файла для сборки
    return browserify('./src/scripts/main.js',{debug: true})//debug: true Подключение опции ориентировки
      //Перевод документа на старый стандарт 
      //npm install babelify --save-dev @babel/core @babel/preset-env
      //.transform("babelify", {presets: ["@babel/preset-env"], sourceMaps: true})//sourceMaps: true Подключение опции ориентировки
      .bundle()
      //Создание файла js        
      .pipe(source('bundl.js'))
      //.pipe(buffer())
      //.pipe(uglify())
      .pipe(gulp.dest("./scripts"));
});

//**Перенос шрифтов */
gulp.task('copy-fonts', function(done){
    return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./fonts')),
    done();
});

//*!Отслеживание изменения файлов*/
gulp.task('watch', ()=>{
  //Gulp.watch следит за файлaми, и когда будут изменяться файлы, будут запускаться с помощью gulp.parallel наши gulp функции
  gulp.watch('./src/*.html', gulp.parallel('copy-html'));
  gulp.watch('./src/css/*.css', gulp.parallel('copy-css'));
  gulp.watch('./src/scss/**/*.*', gulp.parallel('build-scss'));
  gulp.watch('./src/scripts/**/*.js', gulp.parallel('build-js'));
  gulp.watch('./src/image/*.*', gulp.parallel('copy-img'));
  gulp.watch('./src/fonts/**/*', gulp.parallel('copy-fonts'));
});

//Полная сборка
gulp.task('build', gulp.parallel('copy-html','copy-css','build-scss','build-js','copy-img','copy-fonts'));

gulp.task('default', gulp.parallel("watch", "build"));