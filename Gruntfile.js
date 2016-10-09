module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
        },
        src: ['test/**/*.js']
      }
    },
  });

  grunt.registerTask('test', ['mochaTest']);
};
