'use client'

import { useState } from 'react'
import { Flame, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroView } from '@/components/hero-view'
import { ProductView } from '@/components/product-view'
import { CheckoutView } from '@/components/checkout-view'
import { product } from '@/lib/product'

type View = 'hero' | 'product' | 'checkout' | 'success'

const steps: { id: View; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'checkout', label: 'Checkout' },
]

export function HearthStore() {
  const [view, setView] = useState<View>('hero')
  const [quantity, setQuantity] = useState(1)

  const activeIndex = steps.findIndex((s) => s.id === view)

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between px-6 py-5 md:px-12">
        <button
          onClick={() => setView('hero')}
          className="flex items-center gap-2 text-foreground"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Flame className="size-4" />
          </span>
          <span className="font-serif text-xl tracking-tight">{product.brand}</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Checkout steps">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-1">
              <span
                className={`text-xs font-medium tracking-wide transition-colors ${
                  i <= activeIndex && view !== 'success'
                    ? 'text-foreground'
                    : 'text-muted-foreground/60'
                }`}
              >
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 h-px w-6 bg-border" aria-hidden="true" />
              )}
            </div>
          ))}
        </nav>

        <span className="text-xs text-muted-foreground">Cozy tech · Est. 2025</span>
      </header>

      {/* Views */}
      <section className="min-h-0 flex-1 px-6 pb-8 md:px-12">
        <div className="mx-auto h-full max-w-6xl">
          {view === 'hero' && <HeroView onShop={() => setView('product')} />}
          {view === 'product' && (
            <ProductView
              quantity={quantity}
              setQuantity={setQuantity}
              onBack={() => setView('hero')}
              onBuy={() => setView('checkout')}
            />
          )}
          {view === 'checkout' && (
            <CheckoutView
              quantity={quantity}
              onBack={() => setView('product')}
              onSuccess={() => setView('success')}
            />
          )}
          {view === 'success' && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-8" />
              </span>
              <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-foreground">
                Warmth is on its way.
              </h2>
              <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                Thanks for your order. Your {product.brand} {product.name} will arrive
                cozy and ready in 3–5 days.
              </p>
              <Button
                onClick={() => {
                  setQuantity(1)
                  setView('hero')
                }}
                variant="outline"
                className="mt-8 h-11 rounded-full border-border px-6 text-sm"
              >
                Back to home
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
