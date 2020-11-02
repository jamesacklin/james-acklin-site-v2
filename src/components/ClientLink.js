import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const ClientLink = (props) => {
  const { clientId } = props;
  const clients = useStaticQuery(graphql`
    query clients {
      allAirtable(filter: { table: { eq: "Clients" } }) {
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

  const clientData = clients.allAirtable.edges.reduce((acc, value) => {
    const { recordId, data } = value.node;
    const newObj = { name: data.Client_Name, website: data.Website };
    acc[recordId] = newObj;
    return acc;
  }, []);

  const clientName = clientData[clientId].name;
  const clientHref = clientData[clientId].website;

  return (
    <a className="black underline" href={clientHref} rel="external">
      {clientName}
    </a>
  );
};

ClientLink.propTypes = {
  clientId: PropTypes.string.isRequired,
};

export default ClientLink;
