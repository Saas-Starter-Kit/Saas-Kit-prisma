import { Metadata } from 'next';
import siteConfig from './site';

const config = {
  routes: [
    { title: 'Pricing', link: '/pricing' },
    { title: 'FAQ', link: '/faq' }
  ],
  footer_nav: {
    about: {
      title: 'About',
      routes: [
        { title: 'Pricing', link: '/pricing' },
        { title: 'FAQs', link: '/faq' }
      ]
    },
    resources: {
      title: 'Resources',
      routes: [
        { title: 'Blog', link: '/' },
        { title: 'Docs', link: '/' }
      ]
    },
    legal: {
      title: 'Legal',
      routes: [
        { title: 'Privacy Policy', link: '/' },
        { title: 'Terms and Conditions', link: '/' }
      ]
    }
  },
  metadate: {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
    authors: [
      {
        name: ''
      }
    ],
    creator: '',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' }
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}/og.jpg`],
      creator: ''
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png'
    },
    manifest: `${siteConfig.url}/site.webmanifest`
  },
  copy: {}
};

export default config;
