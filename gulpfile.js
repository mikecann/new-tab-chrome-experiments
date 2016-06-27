var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require("merge2");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");
var clean = require("gulp-clean");
var zip = require("gulp-zip");
var argv = require("yargs").argv;
var webpack = require("webpack");
var gutil = require("gulp-util");
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var extensionWebpackConfig = require("./extension.webpack.config");
var clientWebpackConfig = require("./client.webpack.config");
var serverWebpackConfig = require("./server.webpack.config");

function startWebpack(configObj, watch)
{
    var conf = Object.create(configObj);
    var compiler = webpack(conf);

    var handler = function (err, stats) {
        if (err) 
            throw new gutil.PluginError("webpack", err);

        gutil.log("[webpack:build]", stats.toString({
            colors: true,
            chunks: false
        }));
    };
    
    if (watch)
        compiler.watch({}, handler);
    else
        compiler.run(handler);
}

gulp.task("scripts", function () {
    startWebpack(extensionWebpackConfig, false);
    startWebpack(clientWebpackConfig, false);
    startWebpack(serverWebpackConfig, false);
});

gulp.task("watch-scripts", function () {  
    startWebpack(extensionWebpackConfig, true);
    startWebpack(clientWebpackConfig, true);
    startWebpack(serverWebpackConfig, true);
});

var node;
gulp.task('server', function() {
  if (node) 
    node.kill()
    
  node = spawn('node', ['index.js'], {stdio: 'inherit', cwd:"./dist/server"})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });  
})

gulp.task("extension-resources", function () {
    return  gulp.src("src/extension/resources/**/*.*")
        .pipe(gulp.dest("dist/extension"));
});

gulp.task("client-resources", function () {
    return  gulp.src("src/client/resources/**/*.*")
        .pipe(gulp.dest("dist/server/public"));
});

gulp.task("server-resources", function () {
    return  gulp.src("src/server/resources/**/*.*")
        .pipe(gulp.dest("dist/server"));
});

gulp.task("resources", ["extension-resources", "client-resources", "server-resources"], function () {
});

gulp.task("build", ["scripts", "resources"], function () {
});

gulp.task("default", function () {
    return runSequence("build", "watch", "server");
});

gulp.task("clean", function () {
    return gulp.src(["dist"])
        .pipe(clean({ force: true }));
});

gulp.task("release-extension", ["build"], function () {
    if (argv.v == undefined)
        throw new Error("Supply '--v=1.x'");

    return gulp.src(["dist/**/*.*","!dist/**/*.js.map"])
        .pipe(zip("Tabbyships-v" + argv.v + ".zip"))
        .pipe(gulp.dest("./extension-releases"));
});

gulp.task("watch", ["watch-scripts"], function () {    
    watch(["src/extension/resources/**/*.*"], function () { runSequence("extension-resources"); });
    watch(["src/client/resources/**/*.*"], function () { runSequence("client-resources"); });
    watch(["src/server/resources/**/*.*"], function () { runSequence("server-resources", "server"); });
    watch(["dist/server/index.js"], function () { runSequence("server"); });
});