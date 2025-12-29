import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'awsome-BFT',
  description: 'A comprehensive guide for studying Byzantine Fault Tolerance and consensus mechanisms',
  lang: 'ko-KR',

  themeConfig: {
    siteTitle: '📝 awsome-BFT',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Papers', link: '/papers/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/devJZen/awsome-BFT' }
    ],

    footer: {
      message: 'BFT 합의 메커니즘을 공부하는 모두를 위한 지식 허브',
      copyright: 'Released under the MIT License.'
    }
  },

  head: [
    ['link', {
      rel: 'icon',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>'
    }],
    ['meta', { name: 'theme-color', content: '#fdfdf8' }],
  ]
})
