const sass = require('sass'),
path = require('path'),
root = path.resolve(__dirname, "..");

sass.render({
  file: path.resolve(root, "src/sass/mod.scss"),
  includePaths: [ path.resolve(root, "src/sass/plyr") ],
  outFile: path.resolve(root, "dist/css/mod.css"),
  outputStyle: "compressed",
  sourceMap: true,
}, (error, result) => {
  if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    console.log(result.stats);
  }
});

sass.render({
  file: path.resolve(root, "src/sass/plyr/plyr.scss"),
  includePaths: path.resolve(root, "src/sass/plyr"),
  outFile: path.resolve(root, "dist/css/plyr.css"),
  outputStyle: "compressed",
  sourceMap: true,
}, (error, result) => {
  if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    // console.log(result.css.toString());
    console.log(result.stats);
    //console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
  }
});