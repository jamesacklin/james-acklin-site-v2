import React from 'react';
import 'tachyons';
import SiteHelmet from '../components/SiteHelmet';
import SEO from '../components/seo';

const CvPage = () => {
  const col = `w-50-l ph4-l`;
  const hed = `f5 normal ma0 lh-copy`;
  const rarr = `list list-rarr ma0 lh-copy measure pl3`;
  const graf = `lh-copy mt0 mb3 measure`;
  const job = `${graf} pl3`;

  return (
    <div>
      <SEO />
      <SiteHelmet />
      <div className="flex-l flex-wrap-l pa4 sans-serif black bg-white mw8 center">
        <div className={col}>
          <h1 className={hed}>James Acklin</h1>
          <p className={graf}>
            Designer-developer multi-class
            <br />
            Based in Pittsburgh, PA, USA
          </p>
        </div>
        <div className={col}>
          <ul className={`${rarr} mb3`}>
            <li>james@ackl.in</li>
            <li>https://ackl.in/</li>
          </ul>
        </div>
        <div className={col}>
          <h2 className={hed}>Introduction</h2>
          <p className={graf}>
            I am a designer-developer hybrid with over a decade of professional
            experience who thrives in pro-complexity UX vacuums. My design
            practice concentrates on low- and high-fidelity prototyping, design
            systems, interactions for data visualizations, and comprehensive,
            actionable specifications. I take great joy in implementing design
            concepts as living interface code and developing visual systems.{' '}
          </p>
          <h2 className={hed}>Skills</h2>
          <h3 className={hed}>Experience Design</h3>
          <ul className={rarr}>
            <li>
              Qualitative interviews, usability testing, journey mapping,
              storyboarding, heuristic evaluations, persona development
            </li>
            <li>
              Other organizational design exercises from the standard
              human-centered design playbook
            </li>
          </ul>
          <h3 className={hed}>2D Layout &amp; Prototyping</h3>
          <ul className={rarr}>
            <li>
              Concepts, wireframes, prototypes, and detailed specifications in
              Figma, Sketch, Balsamiq, Adobe XD, InVision
            </li>
            <li>
              Developing design systems, documentation, and usage guidelines
              alongside working UI components (Storybook, static site
              generators)
            </li>
            <li>
              Working on 3D skills (Blender, Cinema 4D), game design (Unity){' '}
            </li>
          </ul>
          <h3 className={hed}>Web Development</h3>
          <ul className={`${rarr} mb3`}>
            <li>
              ClojureScript (Reagent, re-frame), JavaScript (React + Redux, Vue,
              Angular, Svelte), and Docker
            </li>
            <li>
              Styling (styled-components, emotion, stylefy [cljs], SCSS/Less)
              and templating (Jinja, ES templates, hiccup [cljs], Markdown
              parsing [remark])
            </li>
          </ul>
          <h2 className={hed}>Education</h2>
          <h3 className={hed}>B.A., Journalism &amp; Mass Communication</h3>
          <p className={job}>
            Point Park University, Pittsburgh, PA
            <br />
            August 2006 - May 2010
          </p>
        </div>
        <div className={col}>
          <h2 className={hed}>Projects &amp; Employment</h2>
          <h3 className={hed}>
            The Nielsen Company, Senior UX Designer
            <br />
            January 2017 - Present
          </h3>
          <p className={job}>
            Leading a variety of teams (Pittsburgh, NYC, Rotterdam) in interface
            concept validation, usability audits, feature design and
            development, design strategy alignment, and some ClojureScript
            sprinkled in. Developed core guidance principles for all UX and
            design-focused product teams. Leading research and visual design of
            an inner-sourced, WCAG-compliant (AA+) interface design system which
            will serve as the global point of reference for all screen-based
            design.
          </p>
          <h3 className={hed}>
            Bloomfield Robotics, Front-End Developer (Contract)
            <br />
            July 2020 - Present
          </h3>
          <p className={job}>
            Designing and building a client-facing analytics portal in React for
            crop health and performance assessment in agricultural applications,
            built atop groundbreaking stereoscopic camera hardware, phenotype ML
            models, and 3D geospatial positioning.
          </p>
          <h3 className={hed}>
            Rhiza, UX Designer &amp; Front-End Developer
            <br />
            November 2013 - May 2015;
            <br />
            November 2015 - January 2017
          </h3>
          <p className={job}>
            Designed and helped build a data visualization platform for
            geospatial analysis with a generalizable approach to data
            exploration and user-configurable workflows. Conducted field
            research and user interviews for early concept validation, iterative
            improvements, and usability enhancements. Exit by acquisition in
            2017 by The Nielsen Company.
          </p>
          <h3 className={hed}>
            C-Leveled, Visual Designer &amp; Front-End Developer
            <br />
            May 2015 - November 2015
          </h3>
          <p className={job}>
            Stretched pre-Gutenberg WordPress beyond its comfortable limits;
            some iOS screen design and prototyping.
          </p>
          <h3 className={hed}>
            Smith Brothers Agency, Front-End Developer
            <br />
            March 2011 - November 2013
          </h3>
          <p className={job}>
            Frozen food websites in ASP at the dawn of responsive design.
          </p>
          <h3 className={`${hed} mb3`}>
            Nine:10 Interactive, Designer &amp; Front-End Developer
            <br />
            June 2010 - March 2011
          </h3>
          <h3 className={hed}>
            Elisco Advertising, Design Intern &amp; Designer (Contract)
            <br />
            January 2009 - June 2010
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CvPage;
