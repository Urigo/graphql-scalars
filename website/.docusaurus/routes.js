import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
  {
    path: '/',
    component: ComponentCreator('/', 'deb'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '3d6'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '914'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'c28'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '3cf'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '31b'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '0da'),
    exact: true,
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '244'),
    exact: true,
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'b3f'),
    exact: true,
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'a19'),

    routes: [
      {
        path: '/docs/introduction',
        component: ComponentCreator('/docs/introduction', 'fca'),
        exact: true,
      },
      {
        path: '/docs/quick-start',
        component: ComponentCreator('/docs/quick-start', '5fa'),
        exact: true,
      },
      {
        path: '/docs/scalars/big-int',
        component: ComponentCreator('/docs/scalars/big-int', '952'),
        exact: true,
      },
      {
        path: '/docs/scalars/byte',
        component: ComponentCreator('/docs/scalars/byte', 'dff'),
        exact: true,
      },
      {
        path: '/docs/scalars/currency',
        component: ComponentCreator('/docs/scalars/currency', '3ad'),
        exact: true,
      },
      {
        path: '/docs/scalars/date',
        component: ComponentCreator('/docs/scalars/date', '81e'),
        exact: true,
      },
      {
        path: '/docs/scalars/date-time',
        component: ComponentCreator('/docs/scalars/date-time', '926'),
        exact: true,
      },
      {
        path: '/docs/scalars/duration',
        component: ComponentCreator('/docs/scalars/duration', '93b'),
        exact: true,
      },
      {
        path: '/docs/scalars/email-address',
        component: ComponentCreator('/docs/scalars/email-address', '38f'),
        exact: true,
      },
      {
        path: '/docs/scalars/hex-color-code',
        component: ComponentCreator('/docs/scalars/hex-color-code', '192'),
        exact: true,
      },
      {
        path: '/docs/scalars/hexadecimal',
        component: ComponentCreator('/docs/scalars/hexadecimal', '529'),
        exact: true,
      },
      {
        path: '/docs/scalars/hsl',
        component: ComponentCreator('/docs/scalars/hsl', '4f2'),
        exact: true,
      },
      {
        path: '/docs/scalars/i-pv-4',
        component: ComponentCreator('/docs/scalars/i-pv-4', 'd47'),
        exact: true,
      },
      {
        path: '/docs/scalars/i-pv-6',
        component: ComponentCreator('/docs/scalars/i-pv-6', 'cb0'),
        exact: true,
      },
      {
        path: '/docs/scalars/iban',
        component: ComponentCreator('/docs/scalars/iban', '1a2'),
        exact: true,
      },
      {
        path: '/docs/scalars/isbn',
        component: ComponentCreator('/docs/scalars/isbn', 'fed'),
        exact: true,
      },
      {
        path: '/docs/scalars/json',
        component: ComponentCreator('/docs/scalars/json', '52c'),
        exact: true,
      },
      {
        path: '/docs/scalars/json-object',
        component: ComponentCreator('/docs/scalars/json-object', 'b69'),
        exact: true,
      },
      {
        path: '/docs/scalars/jwt',
        component: ComponentCreator('/docs/scalars/jwt', '3c0'),
        exact: true,
      },
      {
        path: '/docs/scalars/latitude',
        component: ComponentCreator('/docs/scalars/latitude', 'e25'),
        exact: true,
      },
      {
        path: '/docs/scalars/local-date',
        component: ComponentCreator('/docs/scalars/local-date', 'bac'),
        exact: true,
      },
      {
        path: '/docs/scalars/local-end-time',
        component: ComponentCreator('/docs/scalars/local-end-time', 'c12'),
        exact: true,
      },
      {
        path: '/docs/scalars/local-time',
        component: ComponentCreator('/docs/scalars/local-time', 'e9f'),
        exact: true,
      },
      {
        path: '/docs/scalars/longitude',
        component: ComponentCreator('/docs/scalars/longitude', 'f46'),
        exact: true,
      },
      {
        path: '/docs/scalars/mac',
        component: ComponentCreator('/docs/scalars/mac', 'fb4'),
        exact: true,
      },
      {
        path: '/docs/scalars/negative-float',
        component: ComponentCreator('/docs/scalars/negative-float', 'e6b'),
        exact: true,
      },
      {
        path: '/docs/scalars/negative-int',
        component: ComponentCreator('/docs/scalars/negative-int', '732'),
        exact: true,
      },
      {
        path: '/docs/scalars/non-empty-string',
        component: ComponentCreator('/docs/scalars/non-empty-string', 'e43'),
        exact: true,
      },
      {
        path: '/docs/scalars/non-negative-float',
        component: ComponentCreator('/docs/scalars/non-negative-float', '7ba'),
        exact: true,
      },
      {
        path: '/docs/scalars/non-negative-int',
        component: ComponentCreator('/docs/scalars/non-negative-int', '40f'),
        exact: true,
      },
      {
        path: '/docs/scalars/non-positive-float',
        component: ComponentCreator('/docs/scalars/non-positive-float', '4a6'),
        exact: true,
      },
      {
        path: '/docs/scalars/non-positive-int',
        component: ComponentCreator('/docs/scalars/non-positive-int', 'd02'),
        exact: true,
      },
      {
        path: '/docs/scalars/object-id',
        component: ComponentCreator('/docs/scalars/object-id', '232'),
        exact: true,
      },
      {
        path: '/docs/scalars/phone-number',
        component: ComponentCreator('/docs/scalars/phone-number', '6fa'),
        exact: true,
      },
      {
        path: '/docs/scalars/port',
        component: ComponentCreator('/docs/scalars/port', 'a6d'),
        exact: true,
      },
      {
        path: '/docs/scalars/positive-float',
        component: ComponentCreator('/docs/scalars/positive-float', '96d'),
        exact: true,
      },
      {
        path: '/docs/scalars/positive-int',
        component: ComponentCreator('/docs/scalars/positive-int', '8d2'),
        exact: true,
      },
      {
        path: '/docs/scalars/postal-code',
        component: ComponentCreator('/docs/scalars/postal-code', '940'),
        exact: true,
      },
      {
        path: '/docs/scalars/regular-expression',
        component: ComponentCreator('/docs/scalars/regular-expression', 'b98'),
        exact: true,
      },
      {
        path: '/docs/scalars/rgb',
        component: ComponentCreator('/docs/scalars/rgb', '18c'),
        exact: true,
      },
      {
        path: '/docs/scalars/rgba',
        component: ComponentCreator('/docs/scalars/rgba', '817'),
        exact: true,
      },
      {
        path: '/docs/scalars/safe-int',
        component: ComponentCreator('/docs/scalars/safe-int', '732'),
        exact: true,
      },
      {
        path: '/docs/scalars/time',
        component: ComponentCreator('/docs/scalars/time', 'd95'),
        exact: true,
      },
      {
        path: '/docs/scalars/timestamp',
        component: ComponentCreator('/docs/scalars/timestamp', '527'),
        exact: true,
      },
      {
        path: '/docs/scalars/url',
        component: ComponentCreator('/docs/scalars/url', 'f21'),
        exact: true,
      },
      {
        path: '/docs/scalars/us-currency',
        component: ComponentCreator('/docs/scalars/us-currency', '003'),
        exact: true,
      },
      {
        path: '/docs/scalars/utc-offset',
        component: ComponentCreator('/docs/scalars/utc-offset', 'b21'),
        exact: true,
      },
      {
        path: '/docs/scalars/uuid',
        component: ComponentCreator('/docs/scalars/uuid', '2aa'),
        exact: true,
      },
      {
        path: '/docs/scalars/void',
        component: ComponentCreator('/docs/scalars/void', '52b'),
        exact: true,
      },
      {
        path: '/docs/usage/apollo-server',
        component: ComponentCreator('/docs/usage/apollo-server', '4f3'),
        exact: true,
      },
      {
        path: '/docs/usage/mocks',
        component: ComponentCreator('/docs/usage/mocks', '70d'),
        exact: true,
      },
      {
        path: '/docs/usage/regex',
        component: ComponentCreator('/docs/usage/regex', '78c'),
        exact: true,
      },
    ],
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
