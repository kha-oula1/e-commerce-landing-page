'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { product, formatPrice } from '@/lib/product'

export function HeroView({ onShop }: { onShop: () => void }) {
  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
      <div className="order-2 flex flex-col items-start md:order-1">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          New · Warm-tech collection
        </span>

        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-light text-balance text-foreground">
          Keep it{' '}
          <span className="italic text-accent">warm</span>,
          <br />
          all day long.
        </h1>

        <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-5">
          <Button
            onClick={onShop}
            className="h-12 gap-2 rounded-full bg-primary px-7 text-sm text-primary-foreground"
          >
            Meet {product.name}
            <ArrowRight className="size-4" />
          </Button>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-2xl text-foreground">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground">Free shipping</span>
          </div>
        </div>
      </div>

      <div className="relative order-1 flex h-full min-h-0 items-center justify-center md:order-2">
        <div className="absolute inset-0 m-auto aspect-square w-[80%] max-w-md rounded-full bg-accent/10 blur-2xl" aria-hidden="true" />
        <div className="relative aspect-square w-full max-w-[26rem] overflow-hidden rounded-[2rem] border border-border bg-card">
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
  )
}
