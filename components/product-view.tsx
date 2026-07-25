'use client'

import Image from 'next/image'
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { product, formatPrice } from '@/lib/product'

export function ProductView({
  quantity,
  setQuantity,
  onBack,
  onBuy,
}: {
  quantity: number
  setQuantity: (n: number) => void
  onBack: () => void
  onBuy: () => void
}) {
  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
      <div className="relative order-1 flex h-full min-h-0 items-center justify-center">
        <div className="relative aspect-square w-full max-w-[24rem] overflow-hidden rounded-[2rem] border border-border bg-card">
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

      <div className="order-2 flex flex-col items-start">
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>

        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {product.brand}
        </span>
        <h2 className="mt-1 font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-light text-foreground">
          {product.name}
        </h2>
        <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {product.tagline}. {product.description}
        </p>

        <dl className="mt-6 grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5">
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-foreground">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex w-full max-w-md flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-2 py-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="size-3.5" />
            </Button>
            <span className="w-4 text-center text-sm font-medium tabular-nums">{quantity}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              aria-label="Increase quantity"
              onClick={() => setQuantity(Math.min(9, quantity + 1))}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>

          <span className="font-serif text-2xl text-foreground">
            {formatPrice(product.price * quantity)}
          </span>
        </div>

        <div className="mt-6 flex w-full max-w-md flex-col gap-2">
          <Button
            onClick={onBuy}
            className="h-12 w-full gap-2 rounded-full bg-accent text-sm text-accent-foreground [a]:hover:bg-accent"
          >
            <ShoppingBag className="size-4" />
            Buy Now
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Check className="size-3.5 text-accent" />
            30-day cozy guarantee · Free returns
          </p>
        </div>
      </div>
    </div>
  )
}
