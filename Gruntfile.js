module.exports = function( grunt ) {
 
  grunt.initConfig({
 	copy: {
	  	dist: {
		    files: [
		      	{
		      		expand: true, 
		      		cwd: 'dev/', 
		      		src: ['**','!assets/css/less/**','!assets/**/.{png,jpg,gif,jpeg}','!assets/js/site/**'], 
		      		dest: 'dist/'
		      	} // makes all src relative to cwd
		    ]
	  	}
	}, // copy files

    uglify: {                                 
	    dist: {   
			options: {
				mangle : false
			},
			files : {
				'dist/assets/js/scripts.js' : [ 
					'dev/assets/js/scripts.js' 
				]
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

   	watch : {
   		dev : {
   			files : [
   				'dev/**/**/*',
   				'dev/**/**/**/*'
   			],
   			tasks : [ 'uglify', 'htmlmin:dev', 'less:dev']
   		}
	} // watch
	 
  });


 
  // Grunt plugins
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks('grunt-contrib-less');
 
 
  // Tasks runnings
  grunt.registerTask( 'default', ['uglify', 'htmlmin:dev', 'less:dev'] );

  // Build
  grunt.registerTask( 'build', [ 'uglify', 'htmlmin:dist', 'imagemin:dist', 'less:dist' ] );

  // Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};