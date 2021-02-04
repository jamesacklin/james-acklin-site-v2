import React, { useState, useEffect } from 'react';
import 'tachyons';
import { useStaticQuery, graphql } from 'gatsby';
import _ from 'lodash';
import SEO from '../components/seo';
import Banner from '../components/Banner';
import ProjectRow, { roleTagStyle } from '../components/ProjectRow';
import SiteHelmet from '../components/SiteHelmet';

const IndexPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ongoing');

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

  const ongoing = _.filter(allProjects, (project) => {
    return project.node.data.End_Date === null;
  });

  const uxDesignOnly = _.filter(allProjects, (project) => {
    return _.indexOf(project.node.data.Role_Work, 'UX Designer') !== -1;
  });

  const fedOnly = _.filter(allProjects, (project) => {
    return _.indexOf(project.node.data.Role_Work, 'Web Development') !== -1;
  });

  useEffect(() => {
    if (allData) {
      setAllProjects(allData.projects.edges);
    }
  }, [allData]);

  useEffect(() => {
    console.log(`filter changed to ${activeFilter}`);
  }, [activeFilter]);

  const clientData = allData.clients.edges.reduce((acc, value) => {
    const { recordId, data } = value.node;
    const newObj = { name: data.Client_Name, website: data.Website };
    acc[recordId] = newObj;
    return acc;
  }, []);

  const textClasses = 'sans-serif black';

  const FilterControls = () => {
    return (
      <div>
        <button
          onClick={() => setActiveFilter('ongoing')}
          className={roleTagStyle({ active: activeFilter === 'ongoing' })}
        >
          Ongoing
        </button>

        <button
          onClick={() => setActiveFilter('ux')}
          className={roleTagStyle({ active: activeFilter === 'ux' })}
        >
          UX
        </button>
        <button
          onClick={() => setActiveFilter('frontend')}
          className={roleTagStyle({ active: activeFilter === 'frontend' })}
        >
          Front-end
        </button>
        <button
          onClick={() => setActiveFilter('all')}
          className={roleTagStyle({ active: activeFilter === 'all' })}
        >
          Everything
        </button>
      </div>
    );
  };

  const filteredDisplay = () => {
    switch (activeFilter) {
      case 'ongoing':
        return ongoing;
      case 'ux':
        return uxDesignOnly;
      case 'frontend':
        return fedOnly;
      default:
        return allProjects;
    }
  };

  return (
    <div>
      <SEO />
      <SiteHelmet />
      <Banner />
      <div className="pv3 pv4-m pv4-l">
        <div className="flex-l ph3 ph4-m ph4-l mb3 mb4-l mb0-l">
          <div className="w-50-l ">
            <h2 className="sans-serif mt0 reset  normal f5">
              Professional Index
            </h2>
            <p className="sans-serif normal f5">
              &rarr; Imagery and guided tour available on request.
            </p>
          </div>
          <div className="tr-l w-50-l">
            <FilterControls />
          </div>
        </div>
        <div className="dn flex-l ph3 ph4-m ph4-l">
          <div className={`${textClasses} w-30-l pv2-l mr2 br`}>
            Project Name
          </div>
          <div className={`${textClasses} w-20-l pv2-l mr2 br`}>Client</div>
          <div className={`${textClasses} w-30-l pv2-l mr2 br`}>Roles</div>
          <div className={`${textClasses} w-10-l pv2-l mr2 pr2-l br`}>
            Start Date
          </div>
          <div className={`${textClasses} w-10-l pv2-l`}>End Date</div>
        </div>
        {filteredDisplay().map((edge) => (
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
