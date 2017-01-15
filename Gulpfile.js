//Loading Dependences

(function(){
  'use strict';

  var paths,
      env         = require( 'minimist' )( process.argv.slice( 2 ) ),
      gulp        = require( 'gulp' ),
      plugins     = require( 'gulp-load-plugins' )(),
      del         = require( 'del' ),
      runSequence = require( 'run-sequence' ),
      browserSync = require( 'browser-sync' ).create(),
      reload      = browserSync.reload,
      dev         = 'default',
      prod        = 'prod',
      deploy      = 'deploy';

  //Config Paths
  paths = {
    dir: './',
    src: 'src/',
    app: '/build'
  };

  // Static Server + watching styl/scritps/html files
  gulp.task( 'server', [ 'styles', 'scripts' ], function() {
    browserSync.init({
      server: './',
      open: false,
      port: 1337
    });

    gulp.watch( 'src/styles/**/*.scss', [ 'styles' ] ).on( 'change', reload );
    gulp.watch( 'src/scripts/**/*.js', [ 'scripts' ] ).on( 'change', reload );
    gulp.watch( '*.html' ).on( 'change', reload );
  });

  // Compile sass into CSS & auto-inject into browsers
  gulp.task( 'styles', function() {
    return gulp.src( 'src/styles/*.scss' )
      .pipe( plugins.plumber() )
      .pipe( plugins.sourcemaps.init() )
      .pipe( plugins.sass( {
        outputStyle: 'compressed'
      } ) )
      .pipe( plugins.autoprefixer() )
      .pipe( plugins.concat( 'main.min.css' ) )
      .pipe( plugins.sourcemaps.write( './maps/' ) )
      .pipe( gulp.dest('build/css') )
      .pipe( browserSync.stream() );
  });

  // Browserify, concat, generate sourcemaps and uglify scripts
  gulp.task( 'scripts', function() {
    return gulp.src( 'src/scripts/*.js' )
      .pipe( plugins.plumber() )
      .pipe( plugins.sourcemaps.init() )
      .pipe( plugins.browserify ( {
        insertGlobals: true,
        debug: !env.p
      } ) )
      .pipe( plugins.uglify() )
      .pipe( plugins.concat( 'main.min.js' ) )
      .pipe( plugins.sourcemaps.write( './maps/' ) )
      .pipe( gulp.dest( 'build/js' ) )
      .pipe( browserSync.stream() );
  } );

  // Clean -> it will clean the app dir
  gulp.task( 'clean:appDir', function() {
    return del( './build' );
  } );

  //Call for Clean Task
  gulp.task( 'clean', [ 'clean:appDir' ] );

  //Call for Build Task
  gulp.task( 'build', function() {
    runSequence( 'styles', 'scripts' );
  } );

  //Dev
  gulp.task( dev, function() {
    runSequence( 'build', 'server' );
  } );

  //Prod
  gulp.task( prod, function() {
    runSequence( 'build' );
  } );

})();

