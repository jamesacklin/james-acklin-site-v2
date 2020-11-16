import React from 'react';
import 'tachyons';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import Banner from '../components/Banner';
import ProjectRow from '../components/ProjectRow';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query ProjectQuery {
      allAirtable(
        filter: { table: { eq: "Projects" } }
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
    }
  `);

  return (
    <div>
      <Helmet
        style={[
          {
            cssText: `
              @import url('/fonts/alpina.css');
              .serif {
                font-family: "Alpina";
              }
            `,
          },
        ]}
      />
      <Banner />
      <h2 className="serif fw2 ph4 pv2 f2 black">Index</h2>
      <table className="collapse">
        <thead>
          <tr>
            <td className="w-30 ph4 pv3 serif fw2 f3 black">Project</td>
            <td className="w-20 ph4 pv3 serif fw2 f3 black">Client</td>
            <td className="w-30 ph4 pv3 serif fw2 f3 black">Role</td>
            <td className="w-10 ph4 pv3 serif fw2 f3 black">Start ▼</td>
            <td className="w-10 ph4 pv3 serif fw2 f3 black">End</td>
          </tr>
        </thead>
        <tbody>
          {data.allAirtable.edges.map((edge) => (
            <ProjectRow edge={edge} key={edge.node.id} />
          ))}
        </tbody>
      </table>
      <div className="pa4 serif fw2 f4 black bt">
        Thank you, please come again
      </div>
    </div>
  );
};

export default IndexPage;
