/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';

const Banner = () => (
  <div className="serif fw2 ph4 pv4 f3 white bg-black">
    <h1 className="fw2 pb2 mt0 f2">James Acklin</h1>
    <p>james@ackl.in</p>
    <p className="measure lh-copy">
      Thanks for stopping by. I’m a senior user experience designer with a
      programming background in Pittsburgh, USA. My managers have used the term
      &ldquo;unicorn&rdquo;; I prefer &ldquo;generalist.&rdquo;
    </p>
    <p className="measure lh-copy">
      I work on design systems and a broad category of machine learning-assisted
      products for{' '}
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
        <a className="white" href="https://are.na/james-acklin/" rel="external">
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
);

export default Banner;
