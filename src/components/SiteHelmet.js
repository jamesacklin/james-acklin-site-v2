import React from 'react';
import Helmet from 'react-helmet';

const SiteHelmet = () => {
  return (
    <Helmet
      style={[
        {
          cssText: `
              @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Public+Sans:wght@400&display=swap');
              * {
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                -webkit-hyphens: auto;
                -ms-hyphens: auto;
                hyphens: auto;
              }
              .mono {
                font-family: 'IBM Plex Mono', 'Cascadia Mono', 'SFMono-Regular',
                             Consolas, 'Liberation Mono', Menlo, Courier,
                             monospace;
              }
              .sans-serif {
                font-family: 'Public Sans', -apple-system, BlinkMacSystemFont,
                             'avenir next', avenir, 'helvetica neue', helvetica,
                              ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
                font-kerning: normal;
              }
              .row-outline {
                border-color: transparent;
                box-shadow: 0.25em 0 0 #000 inset, 
                            0 0.25em 0 #000 inset, 
                            -0.25em 0 0 #000 inset, 
                            0 -0.25em 0 #000 inset;
              }
              .row-outline + .row-outline {
                box-shadow: 0.25em 0 0 #000 inset, 
                             
                            -0.25em 0 0 #000 inset, 
                            0 -0.25em 0 #000 inset;
              }
              .list-rarr li {
                list-style-type: '→';
                padding-inline-start: 1ch;
              }
            `,
        },
      ]}
    />
  );
};

export default SiteHelmet;
