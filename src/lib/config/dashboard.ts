import { Icons } from '@/components/Icons';
import { IntervalE } from '../types/enums';

const configuration = {
  routes: [
    { title: 'Overview', link: '/dashboard/main', icon: Icons.Home },
    { title: 'Todos', link: '/dashboard/todos/create', icon: Icons.Laptop },
    { title: 'Settings', link: '/dashboard/settings/profile', icon: Icons.Settings }
  ],
  subroutes: {
    todos: [
      { title: 'Create', link: '/dashboard/todos/create' },
      { title: 'My Todos', link: '/dashboard/todos/my-todos' },
      { title: 'All Todos', link: '/dashboard/todos/list-todos' }
    ],
    settings: [
      { title: 'Profile', link: '/dashboard/settings/profile' },
      { title: 'Billing', link: '/dashboard/settings/billing' },
      { title: 'Subscription', link: '/dashboard/settings/subscription' }
    ]
  },
  products: [
    {
      name: 'Basic',
      description: 'Best for hobby or individual Projects',
      features: ['Unlimited Posts', '10 Users', '1000 API requests', 'Email Support'],
      plans: [
        {
          name: 'Basic Monthly',
          interval: IntervalE.MONTHLY,
          price: '10',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY,
          isPopular: true
        },
        {
          name: 'Basic Annual',
          interval: IntervalE.YEARLY,
          price: '100',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY,
          isPopular: false
        }
      ]
    },
    {
      name: 'Pro',
      description: 'Best for Teams or organizations',
      features: [
        'Unlimited Posts',
        'Unlimited Users',
        'Unlimited API Requests',
        'Priority Support'
      ],
      plans: [
        {
          name: 'Pro Monthly',
          interval: IntervalE.MONTHLY,
          price: '20',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
          isPopular: false
        },
        {
          name: 'Pro Annual',
          interval: IntervalE.YEARLY,
          price: '200',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_YEARLY,
          isPopular: false
        }
      ]
    }
  ]
};

export default configuration;
