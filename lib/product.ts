export const product = {
  brand: 'Hearth',
  name: 'Ember',
  tagline: 'The smart mug for slow mornings',
  price: 129,
  currency: 'USD',
  image: '/ember-mug.png',
  description:
    'Ember keeps your coffee, tea, or cocoa at the exact temperature you love — from the first sip to the last. A little warmth that lingers.',
  specs: [
    { label: 'Battery', value: '80 min cordless' },
    { label: 'Capacity', value: '295 ml' },
    { label: 'Control', value: 'App + dial' },
    { label: 'Finish', value: 'Matte clay' },
  ],
  rating: 4.9,
  reviewCount: 1284,
  testimonials: [
    { name: 'Maya R.', rating: 5, quote: 'My coffee stays perfect from sunrise to my second meeting. Pure cozy magic.' },
    { name: 'Devon L.', rating: 5, quote: 'Beautiful on my desk and genuinely useful. The last sip is as warm as the first.' },
    { name: 'Priya S.', rating: 4, quote: 'Slow mornings feel a little more intentional now. Worth every penny.' },
  ],
} as const

export function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}
