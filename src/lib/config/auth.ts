const config = {
  routes: {
    login: {
      link: '/auth/login'
    },
    signup: {
      link: '/auth/signup'
    }
  },
  redirects: {
    toDashboard: '/dashboard/main',
    toSubscription: '/dashboard/settings/subscription',
    toBilling: '/dashboard/settings/billing',
    requireAuth: '/auth/required',
    authConfirm: '/auth/confirm',
    toProfile: '/dashboard/settings/profile',
    requireSub: '/dashboard/settings/subscription-required',
    toAddSub: '/dashboard/settings/add-subscription'
  }
};

export default config;
