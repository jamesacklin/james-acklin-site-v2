import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';

const Row = (props) => {
  const { classes, children } = props;
  const baseClasses =
    'db flex-l flex-wrap-l items-baseline-l bt-l mb3 mb4-m mb0-l lh-copy lh-solid-l';
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
  const base = 'sans-serif f5 f6-l fw2 br-pill ba ph3 pv2 mt1 mr1 mr2-l dib ';
  switch (role) {
    case 'UX Designer':
      return `${base} white bg-black`;
    default:
      return `${base} black bg-white`;
  }
};

const ProjectRow = (props) => {
  const { edge, clients } = props;
  const textClasses = 'serif f5 f4-m f4-l fw2 black';
  return (
    <Row>
      <div className={`${textClasses} di dn-l`}>
        <TimeAgo datetime={edge.node.data.Start_Date} />
        :&nbsp;
      </div>
      <div className={`${textClasses} di db-l w-30-l pv2-l ph2-l`}>
        {edge.node.data.Project_Name}
      </div>
      <span className={`${textClasses} di dn-l`}>&nbsp;for&nbsp;</span>
      <div className={`${textClasses} di db-l w-20-l pv2-l`}>
        {clients.map((client, i) => [
          i > 0 && ', ',
          client.website ? (
            <a
              className={`${textClasses} underline`}
              key={client.name}
              href={client.website}
            >
              {client.name}
            </a>
          ) : (
            <span key={client.name} className={`${textClasses}`}>
              {client.name}
            </span>
          ),
        ])}
      </div>
      <div className="dn db-l w-30-l pv2-l">
        {edge.node.data.Role_Work.sort().map((role) => (
          <span className={roleTagStyle(role)} key={role}>
            {role}
          </span>
        ))}
      </div>
      <span className={`${textClasses} dn-l`}>
        {edge.node.data.End_Date ? '' : ' (Ongoing)'}
      </span>
      <div className={`${textClasses} dn db-l w-10-l pv2-l`}>
        {edge.node.data.Start_Date}
      </div>
      <div className={`${textClasses} dn db-l w-10-l pv2-l`}>
        {edge.node.data.End_Date ? edge.node.data.End_Date : 'Ongoing'}
      </div>
      <div className={`w-100 pa2-l flex-l`}>
        <div className={`w-30-l`}>
          <p className={`${textClasses} tj lh-copy measure`}>
            Challenge: {edge.node.data.Challenge}
          </p>
          <p className={`${textClasses} tj lh-copy measure`}>
            Result: {edge.node.data.Result}
          </p>
          <p className={`${textClasses} tj lh-copy measure`}>
            Tools &amp; Tech:{' '}
            {edge.node.data.Tools___Tech.map((tool, i) => [
              i > 0 && ', ',
              <span>{tool}</span>,
            ])}
          </p>
        </div>
        <div className={`w-30-l`}></div>
      </div>
    </Row>
  );
};

ProjectRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  edge: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  clients: PropTypes.array.isRequired,
};

export default ProjectRow;
