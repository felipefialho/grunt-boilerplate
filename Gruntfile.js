
module.exports = function( grunt ) {

// Load all tasks
require('load-grunt-tasks')(grunt);

// Paths
var PathConfig = {
	dev: 'dev/',
	dist: 'dist/'
};

// Set scripts
var scripts = [


];

// Grunt config
grunt.initConfig({

 	// Config path
  	config: PathConfig,

	// Clean files
  	clean: {
	  dist: {
	    src: ["dist/"]
	  }
	},

	// Copy files
	copy: {
  	dist: {
	    files: [
      	{
      		expand: true,
      		dot: true,
      		cwd: 'dev/',
      		src: [
	      		'**',
	      		'*.{md,txt,htaccess}',
	      		'!assets/css/less/**',
	      		'!assets/**/.{png,jpg,gif,jpeg}',
	      		'!assets/js/scripts/**',
      		],
      		dest: 'dist/'
      	} // makes all src relative to cwd
	    ]
  	}
	},

	// Less
	less: {
	  dist: {
	    options: {
	      paths: ["<%= config.dev %>assets/css/less"],
	      compress: true
	    },
	    files: {
	      "<%= config.dist %>assets/css/style.css": "<%= config.dev %>assets/css/less/style.less"
	    }
	  },
	  dev: {
	    options: {
	      paths: ["<%= config.dev %>assets/css/less"]
	    },
	    files: {
	      "<%= config.dev %>assets/css/style.css": "<%= config.dev %>assets/css/less/style.less"
	    }
	  }
	},

 	// Uglify
  uglify: {
    options: {
       mangle : false
     },
     dist: {
       files : {
        '<%= config.dist %>assets/js/scripts.min.js': scripts
      }
    },
    dev: {
       options: {
        beautify : true
      },
      files : {
        '<%= config.dev %>assets/js/scripts.min.js': scripts
      }
    }
  },

 	//JShint
	jshint: {
		files: [
			'<%= config.dev %>assets/js/**/*.js'
		]
	},

 	// ImageMin
  imagemin: {
   dist: {
     options: {
       optimizationLevel: 3
     },
     files: [{
       expand: true,
       cwd: '<%= config.dev %>assets/',
       src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
       dest: '<%= config.dist %>assets/',
     }],
   }
  },

  // HTMLmin
  htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: [{
        expand: true,
        cwd: '<%= config.dist %>',
        src: ['*.html','**/*.html'],
        dest: '<%= config.dist %>',
      }],
    }
  },

 	// Watch
  watch : {
    options: {
      debounceDelay: 500,
    },
    less: {
      files : [
      '<%= config.dev %>**/*.less'
      ],
      tasks : ['less:dev']
    },
    js: {
      files : [
      '<%= config.dev %>**/site/*.js',
      'Gruntfile.js'
      ],
      tasks : ['uglify:dev']
    }
  },

  // Sync
  browser_sync: {
    files: {
      src : [
        '<%= config.dev %>**/*.css',
        '<%= config.dev %>**/*.jpg',
        '<%= config.dev %>**/*.png',
        '<%= config.dev %>**/*.js',
        '<%= config.dev %>*.html'
      ]
    },
    options: {
      watchTask: true,
      host : "",
      server: {
        baseDir: "<%= config.dev %>"
      }
      ghostMode: {
        scroll: true,
        links: true,
        forms: true
      }
    }
  }

});
});

// Grunt plugins
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('svgo-grunt');
grunt.loadNpmTasks( 'grunt-contrib-watch' );

// Less
grunt.registerTask( 'l', ['less:dev'] );

// Js
grunt.registerTask( 'j', ['uglify:dev'] );

// JsLint
grunt.registerTask( 'test', ['jshint'] );

// Build
grunt.registerTask( 'build', [ 'clean', 'copy:dist', 'less:dist', 'uglify:dist', 'imagemin:dist', 'htmlmin:dist' ] );

// Watch
grunt.registerTask( 'w', ["browser_sync", 'watch' ] );

};