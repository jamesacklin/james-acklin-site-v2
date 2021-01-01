import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';

const Row = (props) => {
  const { classes, children, onClick } = props;
  const baseClasses =
    `border-box lh-copy pointer db ` +
    `pv3 ph4 pv2-l ` +
    `flex-l flex-wrap-l items-baseline-l bt-l `;
  return (
    <div onClick={onClick} className={`${baseClasses} ${classes}`}>
      {children}
    </div>
  );
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
  const base = 'sans-serif br-pill ba ph3 pv2 lh-solid mt1 mr1 mr2-l dib f6';
  switch (role) {
    case 'UX Designer':
      return `${base} white bg-black`;
    default:
      return `${base} black bg-white`;
  }
};

const ProjectRow = (props) => {
  const { edge, clients } = props;
  const textClasses = 'sans-serif black';
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);
  return (
    <Row onClick={toggleDetails} classes={showDetails && `row-outline`}>
      <div className={`${textClasses} di dn-l`}>
        <TimeAgo datetime={edge.node.data.Start_Date} />
        :&nbsp;
      </div>
      <div className={`${textClasses} di db-l w-30-l pv2-l pr2-l`}>
        {edge.node.data.Project_Name}
      </div>
      <span className={`${textClasses} di dn-l`}>&nbsp;for&nbsp;</span>
      <div className={`${textClasses} di db-l w-20-l pv2-l pr2-l`}>
        {clients.map((client, i) => [
          i > 0 && ', ',
          client.website ? (
            <a
              className={`${textClasses} underline`}
              key={client.name}
              href={client.website}
              onClick={(e) => e.stopPropagation()}
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
      <div className={`${textClasses} dn db-l w-10-l pv2-l pr2-l`}>
        {edge.node.data.Start_Date}
      </div>
      <div className={`${textClasses} dn db-l w-10-l pv2-l`}>
        {edge.node.data.End_Date ? edge.node.data.End_Date : 'Ongoing'}
      </div>
      {showDetails && (
        <div className={`w-100 flex-l`}>
          <div className={`w-30-l pr2-l`}>
            {edge.node.data.Challenge ? (
              <p className={`${textClasses} lh-copy measure`}>
                {edge.node.data.Challenge}
              </p>
            ) : (
              <></>
            )}
            {edge.node.data.Result ? (
              <p className={`${textClasses} lh-copy measure`}>
                {edge.node.data.Result}
              </p>
            ) : (
              <p className={`${textClasses} lh-copy measure`}>
                Currently ongoing.
              </p>
            )}
            {edge.node.data.Tools___Tech ? (
              <p className={`${textClasses} lh-copy measure mb0 mb3-l`}>
                Tools &amp; Tech:{' '}
                {edge.node.data.Tools___Tech.map((tool, i) => [
                  i > 0 && ', ',
                  <span>{tool}</span>,
                ])}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className={`w-30-l`}></div>
        </div>
      )}
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
