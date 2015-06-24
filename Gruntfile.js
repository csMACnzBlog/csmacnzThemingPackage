module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      less: {
        files: [
        '<%= source_location %>Style.less',
        ],
        tasks: ['less']
      },
      replacecss: {
        files: [
        'compiled_css/*'
        ],
        tasks: ['cssrb']
      },
      css: {
        files: [
        'replaced_css/*'
        ],
        tasks: ['copy']//['cssmin']
      }
    },

    less: {
      components: {
        files: {
          'compiled_css/compiled_css.css': ['<%= source_location %>Style.less']
        }
      },
      options: {
        expand: true,
        paths: [
        'bower_components/lesshat',
        'LESS'
        ]
      }
    },

    cssmin: {
      combine: {
        files: {
          '<%= ghost_location %>content/themes/<%= ghost_theme_name %>/assets/css/style.css': ['replaced_css/replaced_css.css']
        }
      }
    },

    copy: {
      main: {
        files: {
          '<%= ghost_location %>content/themes/<%= ghost_theme_name %>/assets/css/style.css': ['replaced_css/replaced_css.css']
        }
      },
    },
    
    cssrb: {
      main: {
        src: 'compiled_css/compiled_css.css',
        dest: 'replaced_css/replaced_css.css',
        options: {
          old_base: '/img',
          new_base: '/assets/images',
          patterns:  {
            '^/img/tiles': '/assets/images/tiles', 
            '^/img': '/assets/images'
          },
          copy: false
        },
      },
    },
    
    'ghost_location': '../ghostblog/',
    'ghost_theme_name': 'csmacnz',
    'source_location': '../csmacnz.web/csmacnz.web/Content/',
  });

  // Load grunt plugins.
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cssrb');
};