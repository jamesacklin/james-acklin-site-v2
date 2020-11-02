import React from 'react';
import 'tachyons';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import ClientLink from '../components/ClientLink';

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
          .sans-serif {
            font-family: "Inter";
          }
        `,
          },
        ]}
      />
      <table className="collapse">
        <thead>
          <tr>
            <td className="pa2 sans-serif b black">Project</td>
            <td className="pa2 sans-serif b black">Client</td>
            <td className="pa2 sans-serif b black">Role</td>
            <td className="pa2 sans-serif b black">Start ▼</td>
            <td className="pa2 sans-serif b black">End</td>
          </tr>
        </thead>
        <tbody>
          {data.allAirtable.edges.map((edge) => (
            <tr className="" key={edge.node.id}>
              <td className="bt bw1 sans-serif f5 pa2 black">
                {edge.node.data.Project_Name}
              </td>
              <td className="bt bw1 sans-serif f5 pa2 black">
                {edge.node.data.Client.map((client, i) => [
                  i > 0 && ', ',
                  <ClientLink key={client} clientId={client} />,
                ])}
              </td>
              <td className="bt bw1 sans-serif f5 pa2 black">
                {edge.node.data.Role_Work.sort().map((role) => (
                  <span
                    className={`sans-serif f6 br-pill ba bw1 ph3 pv2 mb1 mr2 dib ${
                      role === 'UX Designer'
                        ? 'white bg-black'
                        : 'black bg-white'
                    }`}
                    key={role}
                  >
                    {role}
                  </span>
                ))}
              </td>
              <td className="bt bw1 sans-serif f5 nowrap pa2 black">
                {edge.node.data.Start_Date}
              </td>
              <td className="bt bw1 sans-serif f5 nowrap pa2 black">
                {edge.node.data.End_Date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
