// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: "Vue d'ensemble",
    },
    {
      type: 'category',
      label: 'Frontend',
      link: { type: 'doc', id: 'frontend/index' },
      items: [
        'frontend/dashboard',
        'frontend/auth',
      ],
    },
    {
      type: 'category',
      label: 'Backend',
      link: { type: 'doc', id: 'backend/index' },
      items: [
        'backend/api',
        'backend/database',
        'backend/stripe',
      ],
    },
    {
      type: 'category',
      label: 'Scraping',
      link: { type: 'doc', id: 'scraping/index' },
      items: [
        'scraping/concepts',
        'scraping/quickstart',
        'scraping/search',
        'scraping/item',
        'scraping/curl',
        'scraping/cookies',
        'scraping/patterns',
        'scraping/erreurs',
      ],
    },
    {
      type: 'category',
      label: 'IA',
      link: { type: 'doc', id: 'ia/index' },
      items: [
        'ia/analyse-visuelle',
      ],
    },
    {
      type: 'category',
      label: 'DB',
      link: { type: 'doc', id: 'db/index' },
      items: [
        'db/mysql_intro',
        'db/mysql_user_guide',
        'db/mysql_guide',
        'db/mysql_full_guide',
        'db/mysql_admin_guide',
      ],
    },
  ],
};

export default sidebars;
