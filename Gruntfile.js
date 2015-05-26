// Init Grunt modules
// ---------------------------------
module.exports = function(grunt) {

  // Grunt Time
  // ---------------------------------
  require('time-grunt')(grunt);
  
   // Load all tasks
  // ---------------------------------
  require('jit-grunt')(grunt);


  // Init Grunt config
  // ---------------------------------
  grunt.initConfig({


    // Define our source and build folders
    // --------------------------------- 

    build:     '_public',
    css_build: '<%= build %>/css',
    js_build:  '<%= build %>/js',
    img_build: '<%= build %>/img',
    vendor:    '<%= build %>/vendors',

    src:       '_source',
    css_src:   '<%= src %>/stylus',
    js_src:    '<%= src %>/js',
    img_src:   '<%= src %>/img',
    svg_src:   '<%= src %>/svg',
 
 
    // Task: Stylus
    // ---------------------------------
    stylus: {
      dev: {
        options: { 
          compress: false,
          paths: [
            'node_modules/grunt-contrib-stylus/node_modules',
            'node_modules/jeet/stylus',
            'node_modules/nib/lib',
            'node_modules/stylus-font-face/lib',
            'node_modules/stylus-font-face/lib/plugin.js'
          ]
        },
        files: {
          '<%= css_build %>/style.css': '<%= css_src %>/style.styl'
        }
      },
      compress: {
        files: {
          '<%= css_build %>/style.css': '<%= css_build %>/style.css'
        }
      }
    }, 


    // Task: Agroup Media Querie
    // ---------------------------------
    combine_mq: {
      options: {
        log: true
      },
      dev: {
        files: {
          '<%= css_build %>/style.css': ['<%= css_build %>/style.css']
        }
      } 
    },
    

    // CSSMin
    // ---------------------------------
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: { 
          '<%= css_build %>/style.css': '<%= css_build %>/style.css', 
        }
      }
    },


    // Task: Ugligy
    // ---------------------------------
    uglify: { 
      vendor: {
        files: {
          '<%= js_build %>/_vendor.js': [

            // Vendor Plugins 

          ]
        }
      },

      dev: {  
        options: {
          mangle: false, 
          compress : false,
          sourceMap: true,
          report: 'min'
        }, 
        files: {
          '<%= js_build %>/app.js': [
            '<%= js_src %>/*.js',
            '<%= js_src %>/**/*.js', 
          ]
        }
      },

      build: { 
        files: { 
          '<%= js_build %>/app.min.js': [
            '<%= js_build %>/*.js', 
          ]
        }
      }
    },


    // Task: JShint
    // ---------------------------------
    jshint: {

      ignore_warning: {
        options: {
          '-W033': true,
          '-W099': true,
        },
        src: ['<%= js_src %>/*.js', '<%= js_src %>/**/*.js', '<%= test %>/spec/*.js', '<%= test %>/spec/**/*.js'],
      },

    },


    // Task: Jade
    // ---------------------------------
    jade: {
      compile: {
        options: {
          client: false,
          preserveComments: false, 
          pretty: false,
        },
        files: [{
          cwd: '<%= src %>/jade',
          src: '*.jade',
          dest: '<%= build %>', 
          expand: true,
          ext: '.html'
        }]
      }
    },
 

    // Task: ImageMin
    // ---------------------------------
    imagemin: {
      img: {
        options: {
          progressive: true,
          interlaced: true,
        },
        files: [{
          expand: true,
          cwd: '<%= img_src %>/',
          src: [
            '**/*.{png,jpg,jpeg,gif}'
          ],
          dest: '<%= img_build %>'
        }],
      },
      svg: {
        files: [{
          expand: true,
          cwd: '<%= svg_src %>/',
          src: [
            '**/*.{svg}'
          ],
          dest: '<%= svg_build %>'
        }],
      }
    },


    // Task: Watch
    // ---------------------------------
    watch: {
      options: {
        interval: 200
      },
      stylus: {
        files: [
          '<%= css_src %>/**/*.styl'
        ],
        tasks: ['styl']
      },

      js: {
        files: ['<%= js_src %>/*.js', '<%= js_src %>/**/*.js'],
        tasks: ['uglify:dev']
      },

      html: {
        files: ['<%= src %>/*.jade','<%= src %>/**/*.jade'],
        tasks: ['jade']
      },

      img: {
        files: [
          '<%= src %>/**/*.{png,jpg,jpeg,gif,svg}'
        ],
        tasks: ['img']
      },
 
      build: {
        files: [
          'Gruntfile.js'
        ],
        tasks: ['build']
      }
    },


    // Task: BrowserSync
    // ---------------------------------
    browserSync: {
      bsFiles: {
        src : [
          '<%= build %>/css/*.css',
          '<%= build %>/js/*.js',
          '<%= build %>/**/*.jpg',
          '<%= build %>/**/*.png',
          '<%= build %>/**/*.svg',
          '<%= build %>/*.html'
        ]
      },
      options: {
        watchTask: true,
        host : '',
        server: {
          baseDir: '<%= build %>/'
        },
        ghostMode: {
          clicks: true,
          scroll: true,
          links: true,
          forms: true
        }
      }
    }

  });

 
  // Grunt registers
  // ---------------------------------

  // Stylus
  grunt.registerTask( 'styl', ['stylus'] );

  // Js
  grunt.registerTask('js', ['jshint', 'uglify']);

  // CSS
  grunt.registerTask('css', ['stylus:dev', 'combine_mq', 'cssmin']);
 
  // Build
  grunt.registerTask( 'build', ['imagemin', 'jshint', 'uglify', 'jade', 'stylus', 'combine_mq', 'cssmin' ] );

  // Watch
  grunt.registerTask( 'w', ['browserSync', 'watch' ] ); 
}; 