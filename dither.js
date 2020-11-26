'use strict';

var DitherJS = require('ditherjs/server');
var fs = require('fs');
var find = require('find');
var sharp = require('sharp');

function dither(img) {
  let options = {
    step: 1,
    palette: [
      [0, 0, 0],
      [255, 255, 255],
    ],
    algorithm: 'atkinson',
  };
  var ditherjs = new DitherJS(options);
  var imageList = [];
  imageList.push(img);
  imageList.forEach((imageName) => {
    const pathList = find.fileSync(new RegExp(imageName), './public/imagery');
    pathList.forEach(async (path) => {
      var resizedImg = await sharp(path)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .grayscale()
        .normalize()
        .resize({ height: 300 })
        .png()
        .toBuffer();
      var ditheredImg = ditherjs.dither(resizedImg, options);
      fs.writeFileSync(path, ditheredImg);
    });
  });
}

module.exports = dither;
