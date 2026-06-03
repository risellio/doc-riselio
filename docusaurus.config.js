// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Riselio',
  tagline: 'Plateforme de revente intelligente — docs techniques',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.riselio.com',
  baseUrl: '/',

  organizationName: 'riselio',
  projectName: 'riselio-doc',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Riselio',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://lucahallet.com',
            label: 'Portfolio',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: "Vue d'ensemble", to: '/docs' },
              { label: 'Frontend', to: '/docs/frontend' },
              { label: 'Backend', to: '/docs/backend' },
              { label: 'Scraping', to: '/docs/scraping' },
              { label: 'IA', to: '/docs/ia' },
            ],
          },
          {
            title: 'Équipe',
            items: [
              {
                label: 'Luca Hallet',
                href: 'https://lucahallet.com',
              },
            ],
          },
          {
            title: 'Blog',
            items: [
              { label: 'Derniers articles', to: '/blog' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Riselio. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json'],
      },
    }),
};

export default config;
