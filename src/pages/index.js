/* eslint-disable react/jsx-one-expression-per-line */
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

  function roleTagStyle(role) {
    const base = 'serif f4 fw2 br-pill ba bw1 ph3 pv2 mb1 mr2 dib ';
    switch (role) {
      case 'UX Designer':
        return `${base} white bg-black`;
      case 'Freelance':
        return `${base} silver bg-white`;
      default:
        return `${base} black bg-white`;
    }
  }

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
      <div className="serif fw2 ph4 pv4 f4 white bg-black">
        <h1 className="fw7 pb2 mt0 f2">James Acklin</h1>
        <p>james@ackl.in</p>
        <p className="measure lh-copy">
          Thanks for stopping by. I’m a senior user experience designer with a
          programming background in Pittsburgh, USA. My managers have used the
          term &ldquo;unicorn&rdquo;; I prefer &ldquo;generalist.&rdquo;
        </p>
        <p className="measure lh-copy">
          I work on design systems and a broad category of machine
          learning-assisted products for{' '}
          <a
            className="white"
            href="https://www.nielsen.com/us/en/solutions/nielsen-global-media/"
          >
            Nielsen Global Media
          </a>{' '}
          (NYC, USA) and media planning software for{' '}
          <a className="white" href="https://pointlogic.com/">
            PointLogic
          </a>{' '}
          (Rotterdam, NL). Before this, I designed mapping software for{' '}
          <a className="white" href="https://www.rhiza.com/">
            Rhiza
          </a>{' '}
          and made frozen food websites for{' '}
          <a className="white" href="https://www.smithbrosagency.com/">
            Smith Brothers
          </a>
          .
        </p>
        I am active elsewhere:
        <ul className="lh-copy">
          <li>
            <a
              className="white"
              href="https://are.na/james-acklin/"
              rel="external"
            >
              Are.na
            </a>
          </li>
          <li>
            <a
              className="white"
              href="https://www.github.com/jamesacklin/"
              rel="external"
            >
              GitHub
            </a>
          </li>
          <li>~rilfun-lidlen</li>
        </ul>
      </div>
      <h2 className="serif fw7 ph4 pv2 f2 black">Index</h2>
      <table className="collapse">
        <thead>
          <tr>
            <td className="ph4 pv3 serif fw2 f4 black">Project</td>
            <td className="ph4 pv3 serif fw2 f4 black">Client</td>
            <td className="ph4 pv3 serif fw2 f4 black">Role</td>
            <td className="ph4 pv3 serif fw2 f4 black">Start ▼</td>
            <td className="ph4 pv3 serif fw2 f4 black">End</td>
          </tr>
        </thead>
        <tbody>
          {data.allAirtable.edges.map((edge) => (
            <tr className="" key={edge.node.id}>
              <td className="bt b--silver serif f4 fw2 ph4 pv2 black">
                {edge.node.data.Project_Name}
              </td>
              <td className="bt b--silver serif f4 fw2 ph4 pv2 black">
                {edge.node.data.Client.map((client, i) => [
                  i > 0 && ', ',
                  <ClientLink key={client} clientId={client} />,
                ])}
              </td>
              <td className="bt b--silver serif f4 fw2 ph4 pv2 black">
                {edge.node.data.Role_Work.sort().map((role) => (
                  <span className={roleTagStyle(role)} key={role}>
                    {role}
                  </span>
                ))}
              </td>
              <td className="bt b--silver serif f4 fw2 nowrap ph4 pv2 black">
                {edge.node.data.Start_Date}
              </td>
              <td className="bt b--silver serif f4 fw2 nowrap ph4 pv2 black">
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
