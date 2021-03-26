import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureContent}>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title="Welcome" description={siteConfig.tagline}>
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        {/*         <h1 className="hero__title">{siteConfig.title}</h1>
  <p className="hero__subtitle">{siteConfig.tagline}</p>*/}
        <img src="/img/banner.gif" className={styles.heroImage} />
        <a href="https://npmjs.com/graphql-scalars" className={styles.npmBadge}>
          <img src="https://img.shields.io/npm/v/graphql-scalars?color=%23ff3289&label=stable&style=for-the-badge" />
        </a>
        <div className={styles.buttons}>
          <Link
            className={classnames(
              'button button--outline button--secondary button--lg',
              styles.getStarted,
            )}
            to={useBaseUrl('docs/introduction')}
          >
            Get Started
          </Link>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features?.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
