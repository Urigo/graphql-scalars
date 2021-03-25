import Link from '@docusaurus/Link';
// import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
// import classnames from 'classnames';
import React from 'react';
import Button from '../components/ui/Button';
import styles from './styles.module.css';

// const features = [
//   {
//     title: <>GraphQL as a Query Language</>,
//     imageUrl: 'img/GraphQL_Logo.svg',
//     description: (
//       <>
//         Use GraphQL as a query language to fetch data from your data-sources
//         directly, without the need for a running gateway server, or any other
//         bottleneck.
//       </>
//     ),
//   },
//   {
//     title: <>Any Data Source</>,
//     imageUrl: 'img/mesh-example.png',
//     description: (
//       <>
//         With GraphQL Mesh, you can use GraphQL query language to fetch from
//         (almost) any data source, without changing the source or modify it's
//         code.
//       </>
//     ),
//   },

//   {
//     title: <>Open Source</>,
//     imageUrl: 'img/open-source.svg',
//     description: (
//       <>
//         GraphQL Mesh is free and open-source, and been built with the community.
//         You can contribute, extend and have your custom logic easily.
//       </>
//     ),
//   },
// ];

// function Feature({ imageUrl, title, description }) {
//   const imgUrl = useBaseUrl(imageUrl);
//   return (
//     <div className={classnames('col col--4', styles.feature)}>
//       {imgUrl && (
//         <div className="text--center">
//           <img className={styles.featureImage} src={imgUrl} alt={title} />
//         </div>
//       )}
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </div>
//   );
// }

function Home() {
  return (
    <Layout title={`GraphQL Mesh`} description="">
      <header className={styles.header}>
        <img src="/static/img/header.gif" />
        <img
          className={styles.npmBadge}
          alt="npm"
          src="https://img.shields.io/npm/v/graphql-scalars?color=%231BCBE2&label=stable&style=for-the-badge"
        />
        <div className={styles.buttons}>
          <Link to={`/docs/getting-started/introduction`}>
            <Button>View Docs</Button>
          </Link>
        </div>
      </header>
      {/*
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main> */}
    </Layout>
  );
}

export default Home;
