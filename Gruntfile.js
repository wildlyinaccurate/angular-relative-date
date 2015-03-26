'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      all: {
        files: [{
          expand: true,
          src: '*.coffee',
          ext: '.js'
        }]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    uglify: {
      all: {
        options: {
          sourceMap: 'angular-relative-date.js.map'
        },
        files: {
          'angular-relative-date.min.js': ['angular-relative-date.js']
        }
      }
    }
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', [
    'coffee',
    'uglify',
    'test'
  ]);

  grunt.registerTask('default', ['build']);
};
