var scripts = [

]; // Set scripts here
 

module.exports = function( grunt ) {
 
  grunt.initConfig({


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
		      		cwd: 'dev/',
		      		src: [
			      		'**',
			      		'*.{md,txt,htaccess}',
			      		'!assets/css/less/**',
			      		'!assets/**/.{png,jpg,gif,jpeg}',
			      		'!assets/js/site/**'
		      		], 
		      		dest: 'dist/',
		      		dot: true
		      	} // makes all src relative to cwd
		    ]
	  	}
	}, // copy files

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

   	watch: {
   		dev : {
   			files : [
   				'dev/**/*.{less,js}',
   				'Gruntfile.js'
   			],
   			tasks : [ 'uglify:dev', 'less:dev']
   		}
	} // watch
	 
  });


 
  // Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks('grunt-contrib-less');
 
 
  // Tasks runnings
  grunt.registerTask( 'default', [] );

  // Dev
  grunt.registerTask( 'dev', ['uglify:dev', 'less:dev'] );

  // Build
  grunt.registerTask( 'build', [ 'clean', 'copy:dist', 'uglify:dist', 'htmlmin:dist', 'imagemin:dist', 'less:dist' ] );

  // Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};