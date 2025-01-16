import { HeroGradient, NPMBadge } from '@theguild/components';

export const metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <HeroGradient
      title="GraphQL Scalars"
      description="Data Integrity and Strict Validations on GraphQL"
      link={{
        href: '/docs',
        children: 'Get Started',
        title: 'Get started with GraphQL Scalars',
      }}
      version={<NPMBadge name="graphql-scalars" />}
      colors={['#ff3388', '#000']}
    />
  );
}
