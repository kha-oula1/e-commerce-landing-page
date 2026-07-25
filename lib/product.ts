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
} as const

export function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}
