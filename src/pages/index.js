import React from 'react';
import 'tachyons';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import Banner from '../components/Banner';
import ProjectRow from '../components/ProjectRow';

const IndexPage = () => {
  const allData = useStaticQuery(graphql`
    query ProjectQuery {
      projects: allAirtable(
        filter: { table: { eq: "Projects" }, data: { Hidden: { ne: true } } }
        sort: { fields: data___Start_Date, order: DESC }
      ) {
        edges {
          node {
            data {
              Client
              Project_Name
              Role_Work
              End_Date
              Start_Date
              Challenge
              Result
              Tools___Tech
            }
            id
          }
        }
      }
      clients: allAirtable(filter: { table: { eq: "Clients" } }) {
        edges {
          node {
            data {
              Client_Name
              Website
            }
            recordId
          }
        }
      }
    }
  `);

  const projectData = allData.projects;

  const clientData = allData.clients.edges.reduce((acc, value) => {
    const { recordId, data } = value.node;
    const newObj = { name: data.Client_Name, website: data.Website };
    acc[recordId] = newObj;
    return acc;
  }, []);

  const textClasses = 'mono black';

  return (
    <div>
      <SEO />
      <Helmet
        style={[
          {
            cssText: `
              @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Public+Sans:wght@200&display=swap');
              * {
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                -webkit-hyphens: auto;
                -ms-hyphens: auto;
                hyphens: auto;
              }
              .mono {
                font-family: 'IBM Plex Mono', 'Cascadia Mono', 'SFMono-Regular',
                             Consolas, 'Liberation Mono', Menlo, Courier,
                             monospace;
              }
              .sans-serif {
                font-family: 'Public Sans', -apple-system, BlinkMacSystemFont,
                             'avenir next', avenir, 'helvetica neue', helvetica,
                              ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
                font-kerning: normal;
              }
              .row-outline {
                border-color: transparent;
                box-shadow: 0.25em 0 0 #000 inset, 
                            0 0.25em 0 #000 inset, 
                            -0.25em 0 0 #000 inset, 
                            0 -0.25em 0 #000 inset;
              }
              .row-outline + .row-outline {
                box-shadow: 0.25em 0 0 #000 inset, 
                             
                            -0.25em 0 0 #000 inset, 
                            0 -0.25em 0 #000 inset;
              }
            `,
          },
        ]}
      />
      <Banner />
      <div className="">
        <h2 className="sans-serif mt0 reset ph3 ph4-m ph4-l">
          Professional Index
        </h2>
        <div className="dn flex-l ph3 ph4-m ph4-l">
          <div className={`${textClasses} w-30-l pv2-l`}>Project Name</div>
          <div className={`${textClasses} w-20-l pv2-l`}>Client</div>
          <div className={`${textClasses} w-30-l pv2-l`}>Roles</div>
          <div className={`${textClasses} w-10-l pv2-l pr2-l`}>Start Date</div>
          <div className={`${textClasses} w-10-l pv2-l`}>End Date</div>
        </div>
        {projectData.edges.map((edge) => (
          <ProjectRow
            edge={edge}
            key={edge.node.id}
            clients={edge.node.data.Client.map(
              (thisClient) => clientData[thisClient],
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
