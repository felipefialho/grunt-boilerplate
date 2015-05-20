// Init Grunt modules
// ---------------------------------
module.exports = function(grunt) {

  // Grunt Time
  // ---------------------------------
  require('time-grunt')(grunt);
 
  // Init Grunt config
  // ---------------------------------
  grunt.initConfig({
  

    // Define our source and build folders
    // ---------------------------------
    base_path: '',

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
 

    // Task: Agroup Media Queries
    // ---------------------------------
    cmq: {
      options: {
        log: true
      },
      dev: {
        files: {
          '<%= css_src %>': ['<%= css_build %>/style.css']
        }
      }
    },

 
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


    // Task: Ugligy
    // ---------------------------------
    uglify: { 
      vendor: {
        files: {
          '<%= js_src %>/_vendor.js': [
              // Your vendors scripts
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
          '<%= js_build %>/app.min.js': [
            '<%= js_src %>/_vendor.js',
            '<%= js_src %>/functions/*',  
            '<%= js_src %>/main.js'
          ]
        }
      },

      build: { 
        files: { 
          '<%= js_build %>/app.min.js': [
            '<%= js_src %>/_vendor.js',
            '<%= js_src %>/functions/*',  
            '<%= js_src %>/main.js'
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
        src: ['<%= js_src %>/main.js', '<%= js_src %>/functions/*.js'],
      },

    },


    // Task: Jade
    // ---------------------------------
    jade: {
      compile: {
        options: {
          client: false,
          preserveComments: false,
          pretty: true
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


    // Task: Htmlmin
    // ---------------------------------
    htmlmin: {                                     
      dist: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
           expand: true,
           cwd: '<%= build %>/',
           src: '**/*.html',
           dest: '<%= build %>/'
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
        tasks: ['js_dev']
      },

      html: {
        files: ['<%= src %>/*.jade','<%= src %>/**/*.jade'],
        tasks: ['jade_dev']
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
        tasks: ['js_vendor', 'js_dev', 'img', 'html']
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
  grunt.registerTask('styl', [], function() {
     grunt.loadNpmTasks('grunt-contrib-stylus');
     grunt.task.run('stylus:dev');
  });
 
  // CSS
  grunt.registerTask('css', [], function() {
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-combine-media-queries'); 
    grunt.task.run('stylus:dev', 'cmq', 'stylus:compress');
  });

  // Jade 
  grunt.registerTask('jade_dev', [], function() {
    grunt.loadNpmTasks('grunt-contrib-jade'); 
    grunt.task.run('jade');
  });

  // HTML
  grunt.registerTask('html', [], function() {
    grunt.loadNpmTasks('grunt-contrib-jade'); 
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.task.run('jade', 'htmlmin');
  });

  // Js Dev
  grunt.registerTask('js_dev', [], function() {
    grunt.loadNpmTasks('grunt-contrib-jshint'); 
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.task.run('uglify:dev');
  });

  // Js Vendor
  grunt.registerTask('js_vendor', [], function() {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.task.run('uglify:vendor');
  }); 

  // Jshint
  grunt.registerTask('jshint', [], function() {
    grunt.loadNpmTasks('grunt-contrib-jshint'); 
    grunt.task.run('jshint');
  });    

  // Imagemin
  grunt.registerTask('img', [], function() {
    grunt.loadNpmTasks('grunt-contrib-imagemin'); 
    grunt.task.run('imagemin');
  });  

  // Build 
  grunt.registerTask('build', [], function() {
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.loadNpmTasks('grunt-contrib-imagemin'); 
    grunt.loadNpmTasks('grunt-contrib-jade'); 
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.loadNpmTasks('grunt-contrib-stylus'); 
    grunt.loadNpmTasks('grunt-combine-media-queries'); 
    grunt.task.run('uglify:vendor', 'uglify:dev', 'imagemin', 'jade', 'htmlmin', 'stylus:dev', 'cmq', 'stylus:compress');
  });    

  // Watch
  grunt.registerTask('w', [], function() {
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.task.run('browserSync','watch');
  });  

};