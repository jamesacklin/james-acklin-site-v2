const DitherJS = require('ditherjs/server');

var fs = require('fs');
var find = require('find');

function dither(img) {
  let options = {
    step: 3, // The step for the pixel quantization n = 1,2,3...
    palette: [
      [0, 0, 0],
      [255, 255, 255],
    ], // an array of colors as rgb arrays
    algorithm: 'atkinson', // one of ["ordered", "diffusion", "atkinson"]
  };

  const ditherjs = new DitherJS(options);

  let imageList = [];
  imageList.push(img);

  imageList.forEach((imageName) => {
    const pathList = find.fileSync(new RegExp(imageName), './public/imagery');
    pathList.forEach((path) => {
      let file = fs.readFileSync(path);
      fs.writeFileSync(path, ditherjs.dither(file, options));
    });
  });
}

module.exports = dither;
