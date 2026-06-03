import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            Lire la documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentation technique de Riselio — plateforme de revente intelligente">
      <HomepageHeader />
      <main>
        <section className="container" style={{padding: '3rem 0'}}>
          <div className="row">
            <div className="col col--3">
              <div className="card">
                <div className="card__header"><h3>Frontend</h3></div>
                <div className="card__body"><p>Dashboard React, TanStack Query, Recharts</p></div>
                <div className="card__footer"><Link className="button button--primary button--sm" to="/docs/frontend">Voir</Link></div>
              </div>
            </div>
            <div className="col col--3">
              <div className="card">
                <div className="card__header"><h3>Backend</h3></div>
                <div className="card__body"><p>API Hono, Prisma, Stripe, Better Auth</p></div>
                <div className="card__footer"><Link className="button button--primary button--sm" to="/docs/backend">Voir</Link></div>
              </div>
            </div>
            <div className="col col--3">
              <div className="card">
                <div className="card__header"><h3>Scraping</h3></div>
                <div className="card__body"><p>Python, vinted_scraper, patterns asyncio</p></div>
                <div className="card__footer"><Link className="button button--primary button--sm" to="/docs/scraping">Voir</Link></div>
              </div>
            </div>
            <div className="col col--3">
              <div className="card">
                <div className="card__header"><h3>IA</h3></div>
                <div className="card__body"><p>Analyse visuelle Anthropic Claude</p></div>
                <div className="card__footer"><Link className="button button--primary button--sm" to="/docs/ia">Voir</Link></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
