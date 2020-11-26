'use strict';

const DitherJS = require('ditherjs/server');
const fs = require('fs');
const find = require('find');
const sharp = require('sharp');

function dither(img) {
  let options = {
    step: 1,
    palette: [
      [0, 0, 0],
      [255, 255, 255],
    ],
    algorithm: 'atkinson',
  };
  const ditherjs = new DitherJS(options);
  const imageList = [];
  imageList.push(img);
  imageList.forEach((imageName) => {
    const pathList = find.fileSync(new RegExp(imageName), './public/imagery');
    pathList.forEach(async (path) => {
      const resizedFile = await sharp(path)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .toColorspace('b-w')
        .normalize()
        .resize({ height: 500 })
        .toBuffer();
      fs.writeFileSync(path, ditherjs.dither(resizedFile, options));
    });
  });
}

module.exports = dither;
