module.exports = function( grunt ) {
 
  grunt.initConfig({
 
    uglify: {                                 
	    dist: {   
			options: {
				mangle : false
			},
			min: {
				files : {
					'dist/assets/js/scripts.min.js' : [ 'src/assets/js/scripts.js' ]
				}
			}
		},	
		dev: {
			concat:{
				files : {
					'src/assets/js/scripts.js' : [ 'src/assets/js/scripts.js' ]
				}
			}
		}
    }, // uglify

	less: {
	  dist: {
	    options: {
	      paths: ["src/assets/css/less"],
	      yuicompress: true,
	      compress: true
	    },
	    files: {
	      "dist/assets/css/style.css": "src/assets/css/less/style.less"
	    }
	  },
	  dev: {
	    options: {
	      paths: ["src/assets/css/less"]
	    },
	    files: {
	      "src/assets/css/style.css": "src/assets/css/less/style.less"
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
	          cwd: 'src/',       
	          src: '*.html',  
	          dest: 'dist/',    
	      }],
	    },                              
	    dev: {   
	      files: [{
	          expand: true,      
	          cwd: 'src/',       
	          src: '*.html',  
	          dest: 'src/',    
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
	          cwd: 'src/',       
	          src: ['**/**/*.png', '**/**/*.jpg', '**/**/*.jpeg'],  
	          dest: 'dist/',    
	      }],
	    }
	}, // imageMin

   	watch : {
   		dev : {
   			files : [
   				'src/**/**/*',
   				'src/**/**/**/*'
   			],
   			tasks : [ 'uglify:dev', 'htmlmin:dev', 'less:dev']
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
  grunt.registerTask( 'default', ['uglify:dev', 'htmlmin:dev', 'less:dev'] );

  // Build
  grunt.registerTask( 'build', [ 'uglify:dist', 'htmlmin:dist', 'imagemin:dist', 'less:dist' ] );

  // Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};