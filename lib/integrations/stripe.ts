export const pricingPlans = {
  free: {
    routes: 100,
    priceId: process.env.STRIPE_FREE_PRICE_ID
  },
  pro: {
    routes: 3000,
    priceId: process.env.STRIPE_PRO_PRICE_ID
  },
  team: {
    routes: 20000,
    priceId: process.env.STRIPE_TEAM_PRICE_ID
  }
} as const;
