const util = require('util');
const fs = require('fs');
const streamPipeline = util.promisify(require('stream').pipeline);
const fetch = require('node-fetch');
const path = require('path');
const dither = require('./dither.js');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const imageryPublicPath = path.resolve(process.cwd(), 'public/imagery');
  var exists = fs.existsSync(imageryPublicPath);
  if (!exists) {
    fs.mkdirSync(imageryPublicPath);
  }

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable(filter: { table: { eq: "Projects" } }) {
          nodes {
            data {
              Imagery {
                filename
                type
                url
              }
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors);
      }

      data.allAirtable.nodes.map((node) => {
        if (node.data.Imagery !== null) {
          node.data.Imagery.map((image) => {
            const imgPath = path.resolve(
              process.cwd(),
              'public/imagery',
              `${image.filename}`,
            );

            async function download() {
              const response = await fetch(image.url);
              await streamPipeline(
                response.body,
                fs.createWriteStream(imgPath),
              );
              dither(image.filename);
            }
            if (image.type !== 'application/pdf') {
              download();
            }
          });
        }
      });

      resolve();
    });
  });
};
