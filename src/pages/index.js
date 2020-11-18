import React from 'react';
import 'tachyons';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
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
              End_Date(formatString: "")
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

  const textClasses = 'serif f4 f3-m f3-l fw2 black';

  return (
    <div>
      <Helmet
        style={[
          {
            cssText: `
              @import url('/fonts/alpina.css');
              .serif {
                font-family: "Alpina";
                letter-spacing: -0.025em;
              }
            `,
          },
        ]}
      />
      <Banner />
      <div className="pa3 pa4-m pa4-l">
        <h2 className="serif mt0 fw2 f3 f2-m f2-l">Professional Index</h2>
        <div className="dn flex-l">
          <div className={`${textClasses} w-30-l pv2-l`}>Project Name</div>
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
              // eslint-disable-next-line comma-dangle
              (thisClient) => clientData[thisClient]
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
