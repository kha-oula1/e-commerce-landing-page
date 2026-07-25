'use client'

import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { product, formatPrice } from '@/lib/product'

export function HeroView({ onShop }: { onShop: () => void }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
      {/* Warm gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 90% at 85% 15%, oklch(0.62 0.14 45 / 0.55) 0%, transparent 55%), linear-gradient(160deg, oklch(0.3 0.03 55) 0%, oklch(0.22 0.02 50) 100%)',
        }}
      />

      <div className="relative grid h-full grid-cols-1 items-center gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-10">
        <div className="order-2 flex flex-col items-start md:order-1">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground/80">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            New · Warm-tech collection
          </span>

          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-light text-balance text-primary-foreground">
            Welcome to{' '}
            <span className="italic text-accent">My</span>
            <br />
            Store.
          </h1>

          <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/70">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-5">
            <Button
              onClick={onShop}
              className="h-12 gap-2 rounded-full bg-accent px-7 text-sm text-accent-foreground"
            >
              Meet {product.name}
              <ArrowRight className="size-4" />
            </Button>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-2xl text-primary-foreground">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-primary-foreground/60">Free shipping</span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-5 w-full max-w-md border-t border-primary-foreground/15 pt-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < Math.round(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-primary-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-primary-foreground/70">
                {product.rating} · {product.reviewCount.toLocaleString()} happy sippers
              </span>
            </div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.testimonials.slice(0, 2).map((t) => (
                <li
                  key={t.name}
                  className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-3 fill-accent text-accent" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-[0.7rem] font-medium text-primary-foreground/60">
                      {t.name}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-pretty text-xs leading-snug text-primary-foreground/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative order-1 flex h-full min-h-0 items-center justify-center md:order-2">
          <div className="absolute inset-0 m-auto aspect-square w-[80%] max-w-md rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-square w-full max-w-[26rem] overflow-hidden rounded-[2rem] border border-primary-foreground/15 bg-primary-foreground/5">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={`${product.brand} ${product.name} smart mug`}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
