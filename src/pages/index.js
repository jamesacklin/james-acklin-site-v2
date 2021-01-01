import React from 'react';
import 'tachyons';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import Banner from '../components/Banner';
import ProjectRow from '../components/ProjectRow';
import SiteHelmet from '../components/SiteHelmet';

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

  const textClasses = 'sans-serif black';

  return (
    <div>
      <SEO />
      <SiteHelmet />
      <Banner />
      <div className="pv3 pv4-m pv4-l">
        <h2 className="sans-serif mt0 reset ph3 ph4-m ph4-l normal f5">
          Professional Index
        </h2>
        <p className="sans-serif ph3 ph4-m ph4-l normal f5">
          Imagery and guided tour available on request.
        </p>
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
