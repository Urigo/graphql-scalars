import { indexToAlgolia } from '@guild-docs/algolia';
import { resolve } from 'node:path';
import { getRoutes } from '../routes';

indexToAlgolia({
  routes: [getRoutes()],
  source: 'Scalars',
  domain: process.env.SITE_URL!,
  lockfilePath: resolve(__dirname, '../algolia-lockfile.json'),
  dryMode: process.env.ALGOLIA_DRY_RUN === 'true',
});
