var commandExists = require('command-exists');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    config: {
      dev: {
        options: {
          variables: {
            buildDir: "build",
          }
        }
      },
      dist: {
        options: {
          variables: {
            buildDir: "dist",
          }
        }
      }
    },

    clean: ["<%= grunt.config.get('buildDir') %>/**/*"],

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: "**",
            dest: "<%= grunt.config.get('buildDir') %>/",
            cwd: "Source/public",
            dot: true
          }
        ]
      }
    },

    jade: {
      compile: {
        files: [
          {
            expand: true,
            cwd: "Source/views",
            src: "**/*.jade",
            dest: "<%= grunt.config.get('buildDir') %>/",
            ext: ".html"
          }
        ]
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= grunt.config.get('buildDir') %>/js",
            src: "*.js",
            dest: "<%= grunt.config.get('buildDir') %>/js",
            ext: ".js"
          }
        ]
      }
    },

    webpack: {
      someName: {
        entry: {
          content_script: "./Source/javascripts/content_script.js",
          toggle: "./Source/javascripts/toggle.js",
        },
        output: {
          path: "<%= grunt.config.get('buildDir') %>/js",
          filename: "[name].js",
        },
        resolve: {
          extensions: [
            '',
            '.js',
            '.jsx',
          ],
        },
        module: {
          loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader?presets[]=es2015,presets[]=react" }
          ]
        },
        failOnError: true,
      },
    },

    zip: {
      "using-cwd": {
        cwd: "<%= grunt.config.get('buildDir') %>/",
        src: "<%= grunt.config.get('buildDir') %>/**/*",
        dest: "<%= grunt.config.get('buildDir') %>/export.zip"
      }
    },

    watch: {
      scripts: {
        files: ["Source/**"],
        tasks: ["default"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask("reloadChrome", "reload extension", function() {
    var done = this.async();
    return commandExists('chrome-cli', function(err, exists) {
      if (exists) {
        reloadExtension('chrome-cli', done);
      } else {
        return commandExists('canary-cli', function(err, exists) {
          if (exists) {
            return reloadExtension('canary-cli', done);
          }
        })
      }
    })
  });

  function reloadExtension(command, done) {
    var sys = require("sys");
    var exec = require("child_process").exec;
    return exec(command + " list tabs", function(error, stdout, stderr) {
      var tabId, _ref;
      if (tabId = (_ref = stdout.match(/\[(\d+:)?([\d]+)\] Extensions/)) != null ? _ref[2] : void 0) {
        return exec(command + " reload -t " + tabId, function(error, stdout, stderr) {
          return done();
        });
      } else {
        return exec(command + " open chrome://extensions && " + command + " reload", function(error, stdout, stderr) {
          return done();
        });
      }
    });
  }

  grunt.loadNpmTasks("grunt-config");
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-notify");
  grunt.loadNpmTasks("grunt-zip");

  grunt.registerTask("main", ["clean", "webpack", "jade", "copy"]);

  var defaultTasks = ["config:dev", "main"];
  if (grunt.option('reload-extension')) {
    defaultTasks.push("reloadChrome");
  }

  grunt.registerTask("default", defaultTasks.concat(["watch"]));
  grunt.registerTask("dist", ["config:dist", "main", "uglify", "zip"]);
};
