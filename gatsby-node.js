const fs = require('fs');
const https = require('https');
const path = require('path');
const del = require('del');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const imageryPublicPath = path.resolve(process.cwd(), 'public/imagery');
  var exists = fs.existsSync(imageryPublicPath);
  if (exists) {
    async () => {
      try {
        await del(imageryPublicPath);
        console.log('deleted public imagery directory');
        fs.mkdirSync(imageryPublicPath);
      } catch (err) {
        console.error(
          'there was an error deleting the public imagery directory',
        );
      }
    };
  } else {
    fs.mkdirSync(imageryPublicPath);
  }

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable(filter: { table: { eq: "Projects" } }) {
          nodes {
            data {
              Imagery {
                url
                filename
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
          node.data.Imagery.map((image, i) => {
            const imgPath = path.resolve(
              process.cwd(),
              'public/imagery',
              `${image.filename}`,
            );

            const request = https.get(image.url, (res) => {
              let imageData = '';
              res.setEncoding('binary');
              res.on('data', (chunk) => {
                imageData += chunk;
              });
              res.on('end', () => {
                fs.writeFileSync(imgPath, imageData, 'binary');
              });
            });

            // fs.writeFileSync(imgPath, Buffer, 'binary');
          });
        }
      });

      resolve();
    });
  });
};
