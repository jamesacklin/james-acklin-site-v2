/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable(filter: { table: { eq: "Projects" } }) {
          nodes {
            data {
              Imagery {
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
            console.log(image.url);
          });
        }
      });

      resolve();
    });
  });
};
