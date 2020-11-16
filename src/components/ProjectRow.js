import React from 'react';
import PropTypes from 'prop-types';
import ClientLink from './ClientLink';

function roleTagStyle(role) {
  const base = 'serif f4 fw2 br-pill ba bw1 ph3 pv2 mt1 mr2 dib ';
  switch (role) {
    case 'UX Designer':
      return `${base} white bg-black`;
    case 'Freelance':
      return `${base} silver bg-white`;
    default:
      return `${base} black bg-white`;
  }
}

const ProjectRow = (props) => {
  const { edge } = props;
  return (
    <tr className="">
      <td className="bt serif f3 fw2 ph4 pv2 black">
        {edge.node.data.Project_Name}
      </td>
      <td className="bt serif f3 fw2 ph4 pv2 black">
        {edge.node.data.Client.map((client, i) => [
          i > 0 && ', ',
          <ClientLink key={client} clientId={client} />,
        ])}
      </td>
      <td className="bt serif f3 fw2 ph4 pv2 black">
        {edge.node.data.Role_Work.sort().map((role) => (
          <span className={roleTagStyle(role)} key={role}>
            {role}
          </span>
        ))}
      </td>
      <td className="bt serif f3 fw2 nowrap ph4 pv2 black">
        {edge.node.data.Start_Date}
      </td>
      <td className="bt serif f3 fw2 nowrap ph4 pv2 black">
        {edge.node.data.End_Date}
      </td>
    </tr>
  );
};

ProjectRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  edge: PropTypes.object.isRequired,
};

export default ProjectRow;
