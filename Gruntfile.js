
module.exports = function( grunt ) {
 
// Paths
var PathConfig = {
	dev: 'dev/',
	dist: 'dist/'
};

var scripts = [

]; // Set scripts here
 

grunt.initConfig({

  	config: PathConfig, // config path

  	clean: {
	  dist: {
	    src: ["dist/"]
	  }
	}, // clean files


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
			      		'!assets/js/site/**'
		      		], 
		      		dest: 'dist/'
		      	} // makes all src relative to cwd
		    ]
	  	}
	}, // copy files

	less: {
	  dist: {
	    options: {
	      paths: ["dev/assets/css/less"],
	      yuicompress: true,
	      compress: true
	    },
	    files: {
	      "dist/assets/css/style.css": "dev/assets/css/less/style.less"
	    }
	  },
	  dev: {
	    options: {
	      paths: ["dev/assets/css/less"]
	    },
	    files: {
	      "dev/assets/css/style.css": "dev/assets/css/less/style.less"
	    }
	  }
	}, // Less

	uglify: {  
		options: {
			mangle : false 
		},                               
	    dist: {   
			files : {
				'dist/assets/js/scripts.min.js': scripts
		},                        
	    dev: {   
			options: {
				beautify : true 
			},   
			files : {
				'dev/assets/js/scripts.min.js': scripts
			}
		}
    }, // uglify
 
    htmlmin: {                                     
	    dist: {                                       
	      options: {                                  
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: [{
	          expand: true,      
	          cwd: 'dev/',       
	          src: '*.html',  
	          dest: 'dist/',    
	      }],
	    },                              
	    dev: {   
	      files: [{
	          expand: true,      
	          cwd: 'dev/',       
	          src: '*.html',  
	          dest: 'dev/',    
	      }],
	    }
  	}, // HTMLmin

	imagemin: {                           
	    dist: {                            
	      options: {                       
	        optimizationLevel: 3
	      },
	      files: [{
	          expand: true,      
	          cwd: 'dev/',       
	          src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],   
	          dest: 'dist/',    
	      }],
	    }
	}, // imageMin

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
   				'!<%= config.dev %>**/js/*.js',
   				'Gruntfile.js'
   			],
   			tasks : ['uglify:dev']
   		} 
	} // watch 
	 
});



// Grunt plugins
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('svgo-grunt');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-watch');


// Tasks runnings
grunt.registerTask( 'default', [] );

// Dev
grunt.registerTask( 'dev', ['less:dev', 'uglify:dev'] );

// Build
grunt.registerTask( 'build', [ 'clean', 'copy:dist', 'less:dist', 'uglify:dist', 'imagemin:dist', 'svgo', 'htmlmin:dist' ] );

// Watch
grunt.registerTask( 'w', [ 'watch' ] );

};