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

  const textClasses = 'serif f5 f4-m f4-l fw2 black';

  return (
    <div>
      <SEO />
      <Helmet
        style={[
          {
            cssText: `
              @import url('/fonts/cmun-serif.css');
              * {
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                -webkit-hyphens: auto;
                -ms-hyphens: auto;
                hyphens: auto;
              }
              .serif {
                font-family: "Computer Modern Serif", Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
              }
            `,
          },
        ]}
      />
      <Banner />
      <div className="pa3 pa4-m pa4-l">
        <h2 className="serif mt0 fw2 f4 f3-m f3-l">Professional Index</h2>
        <div className="dn flex-l">
          <div className={`${textClasses} w-30-l pv2-l ph2-l`}>
            Project Name
          </div>
          <div className={`${textClasses} w-30-l pv2-l`}>Client</div>
          <div className={`${textClasses} w-30-l pv2-l`}>Roles</div>
          <div className={`${textClasses} w-10-l pv2-l`}>Start Date</div>
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
