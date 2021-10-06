import { HeroGradient, InfoList } from '@theguild/components';

import { handlePushRoute, NPMBadge } from '@guild-docs/client';

export default function Index() {
  return (
    <>
      <HeroGradient
        title="GraphQL Scalars"
        description="Data Integrity and Strict Validations on GraphQL"
        link={{
          href: '/docs',
          children: 'Get Started',
          title: 'Get started with GraphQL Scalars',
          onClick: (e) => handlePushRoute('/docs', e),
        }}
        version={<NPMBadge name="graphql-scalars" />}
        colors={['#ff3289', '#000000']}
/*        image={{
          src: '/assets/home-claw.png',
          alt: 'Illustration',
        }}*/
      />
    </>
  );
}
