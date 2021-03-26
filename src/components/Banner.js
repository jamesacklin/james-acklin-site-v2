import React from 'react';

const Banner = () => (
  <div className="pa3 pa4-m pa4-l sans-serif bg-black white">
    <h1 className="sans-serif pb2 mt0 f5 normal">James Acklin</h1>
    <p>
      <a className="white underline" href="mailto:james@ackl.in">
        james@ackl.in
      </a>
    </p>
    <p className="measure lh-copy">
      Thanks for stopping by. I’m a senior user experience designer with web
      development and audio production backgrounds in Pittsburgh, Pennsylvania,
      USA.
    </p>
    <p className="measure lh-copy">
      Professionally, I work on design systems and a broad category of machine
      learning-assisted products for{' '}
      <a
        className="white underline"
        href="https://www.nielsen.com/us/en/solutions/nielsen-global-media/"
      >
        Nielsen Global Media
      </a>{' '}
      (NYC, USA) and media planning software for{' '}
      <a className="white underline" href="https://pointlogic.com/">
        PointLogic
      </a>{' '}
      (Rotterdam, NL). Before this, I designed mapping software for{' '}
      <a className="white underline" href="https://www.rhiza.com/">
        Rhiza
      </a>{' '}
      and made frozen food websites for{' '}
      <a className="white underline" href="https://www.smithbrosagency.com/">
        Smith Brothers
      </a>
      .
    </p>
    <p className="measure lh-copy">
      Personally, I ride road bikes and hike; currently I’m teaching myself
      Blender and Unity.
    </p>
    I’m active elsewhere:
    <ul className="lh-copy mb0">
      <li>
        <a
          className="white underline"
          href="https://are.na/james-acklin/"
          rel="external"
        >
          Are.na
        </a>
      </li>
      <li>
        <a
          className="white underline"
          href="https://www.github.com/jamesacklin/"
          rel="external"
        >
          GitHub
        </a>
      </li>
    </ul>
  </div>
);

export default Banner;
