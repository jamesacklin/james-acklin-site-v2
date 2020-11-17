import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';
import ClientLink from './ClientLink';

const Row = (props) => {
  const { classes, children } = props;
  const baseClasses = 'db flex-l mb3 mb4-m mb0-l lh-copy';
  return <div className={`${baseClasses} ${classes}`}>{children}</div>;
};

Row.defaultProps = {
  classes: '',
  children: null,
};

Row.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node,
};

const roleTagStyle = (role) => {
  const base = 'serif f5 f4-l fw2 br-pill ba bw1 ph3 pv2 mt1 mr1 mr2-l dib ';
  switch (role) {
    case 'UX Designer':
      return `${base} white bg-black`;
    case 'Freelance':
      return `${base} silver bg-white`;
    default:
      return `${base} black bg-white`;
  }
};

const ProjectRow = (props) => {
  const { edge } = props;
  const textClasses = 'serif f4 f3-m f3-l fw2 black';
  return (
    <Row>
      <div className={`${textClasses} di dn-l`}>
        <TimeAgo datetime={edge.node.data.Start_Date} />
        :&nbsp;
      </div>
      <div className={`${textClasses} di db-l w-30-l pv2-l bt-l`}>
        {edge.node.data.Project_Name}
      </div>
      <span className={`${textClasses} di dn-l`}>&nbsp;for&nbsp;</span>
      <div className={`${textClasses} di db-l w-30-l pv2-l bt-l`}>
        {edge.node.data.Client.map((client, i) => [
          i > 0 && ', ',
          <ClientLink key={client} clientId={client} />,
        ])}
      </div>
      <div className="dn db-l w-30-l pv2-l bt-l">
        {edge.node.data.Role_Work.sort().map((role) => (
          <span className={roleTagStyle(role)} key={role}>
            {role}
          </span>
        ))}
      </div>
      <span className={`${textClasses} dn-l`}>
        {edge.node.data.End_Date ? '' : ' (Ongoing)'}
      </span>
      <div className={`${textClasses} dn db-l w-10-l pv2-l bt-l`}>
        {edge.node.data.Start_Date}
      </div>
      <div className={`${textClasses} dn db-l w-10-l pv2-l bt-l`}>
        {edge.node.data.End_Date ? edge.node.data.End_Date : 'Ongoing'}
      </div>
    </Row>
  );
};

ProjectRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  edge: PropTypes.object.isRequired,
};

export default ProjectRow;
