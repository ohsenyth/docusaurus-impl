/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const isBuilding = process.env.npm_lifecycle_script
  && process.env.npm_lifecycle_script === 'docusaurus-build'; 

const siteConfig = {
  title: 'Documentation for Developers', // Title for your website.
  tagline: 'Code documentation',
  url: '/', // Your website URL

  /* baseUrl is ../../ when building, otherwise it is / */
  baseUrl: isBuilding ? '../../' : '/',

  // Used for publishing and more
  projectName: 'OmotenashiSystem',
  organizationName: 'G-angle Entertainment Cebu',
  headerLinks: [],

  /* path to images for header/footer */
  headerIcon: 'img/omotenashi.png',
  footerIcon: 'img/favicon/favicon.png',
  favicon: 'img/favicon/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#5ab1be',
    secondaryColor: '#337882',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Your Name or Your Company Name`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    defaultLang: 'typescript'
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  // cleanUrl: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  scrollToTop: true,
  docsSideNavCollapsible: true,
  docsURL: '',
  stylesheets: ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css']
};

module.exports = siteConfig;
