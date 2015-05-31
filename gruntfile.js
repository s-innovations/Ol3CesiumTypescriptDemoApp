

function copyGen(package, id,src,files, bower)
{
    return {
        expand: true,
        cwd: (bower?"bower_components/":"node_modules/") + id + "/" + src,
        src: files,
        dest: "artifacts/local/libs/" + id + "/" + package.dependencies[id] + "/"
    };
}

module.exports = function (grunt) {

    var package = grunt.file.readJSON('package.json');
    var bpackage = grunt.file.readJSON('bower.json');

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-build-number');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-tsd');

    grunt.registerTask('local', ["tsd", "buildnumber","copy:installLibs", "typescript:local"]);

    grunt.initConfig({
        buildnumber: {
            options: {
                field: 'buildnum',
            },
            files: ['package.json']
        },
        typescript: {
            local: {
                src: ["src/**/*.ts"],
                dest: "artifacts/local",
                options: {
                    module: "amd",
                    target: "es5",
                    basePath: "",
                    sourceMap: true,
                    declaration: true,
                    watch: {
                        path: ["src"],
                        after: ["sync"],
                        //  before:[],
                        atBegin: true,
                    },
                    references: ["src/**/*.d.ts", "libs/**/*.d.ts", "typings/**/*.d.ts"]
                }
            },
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: true,

                    // specify config file
                    config: 'tsd.json',

                    // experimental: options to pass to tsd.API
                    opts: {
                        // props from tsd.Options
                    }
                }
            }
        },
        copy: {
            installLibs: {
                files: [
                     copyGen(package,"knockout","build/output/","*"),
                     copyGen(package, "requirejs", "", "require.js"),
                     copyGen(package,"requirejs","bin/","r.js"),
                     copyGen(package, "requirejs-text", "", "text.js"),
                     copyGen(bpackage, "require-css", "", "*.js", true),
                     copyGen(bpackage, "proj4", "dist", "*", true),
                     copyGen(bpackage, "knockout-es5", "dist", "*", true),
                     {
                         expand: true,
                         src: "libs/**/*",
                         dest: "artifacts/local",
                     }
                ]

            }

        },
        sync: {
            local: {
                files: [{
                    cwd:"src",
                    src: [
                        "**/*.html",  "assets/**/*.css"                     
                    ],
                    dest: 'artifacts/local/',
                }],
                pretend: false,
                verbose: true
            },
        }

    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
}