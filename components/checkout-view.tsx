'use client'

import type React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Lock, CreditCard, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { product, formatPrice } from '@/lib/product'

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function CheckoutView({
  quantity,
  onBack,
  onSuccess,
}: {
  quantity: number
  onBack: () => void
  onSuccess: () => void
}) {
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const subtotal = product.price * quantity
  const shipping = 0
  const total = subtotal + shipping

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSuccess()
  }

  const fieldClass =
    'w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-accent focus:ring-3 focus:ring-accent/20'
  const labelClass = 'mb-1.5 block text-xs font-medium text-muted-foreground'

  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.1fr] md:gap-12">
      {/* Order summary */}
      <div className="order-2 flex flex-col md:order-1">
        <button
          onClick={onBack}
          className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to product
        </button>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={`${product.brand} ${product.name}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg leading-tight text-foreground">
              {product.brand} {product.name}
            </p>
            <p className="text-xs text-muted-foreground">Qty {quantity} · Matte clay</p>
          </div>
          <span className="font-medium tabular-nums text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums text-foreground">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="text-accent">Free</dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-3">
            <dt className="font-medium text-foreground">Total</dt>
            <dd className="font-serif text-xl tabular-nums text-foreground">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Payment form */}
      <form
        onSubmit={handleSubmit}
        className="order-1 flex flex-col rounded-3xl border border-border bg-card/60 p-6 md:order-2 md:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-light text-foreground">Checkout</h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Secure
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="card" className={labelClass}>
              Card number
            </label>
            <div className="relative">
              <input
                id="card"
                inputMode="numeric"
                required
                placeholder="4242 4242 4242 4242"
                value={card}
                onChange={(e) => setCard(formatCardNumber(e.target.value))}
                className={`${fieldClass} pr-10`}
              />
              <CreditCard className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className={labelClass}>
                Expiry
              </label>
              <input
                id="expiry"
                inputMode="numeric"
                required
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="cvc" className={labelClass}>
                CVC
              </label>
              <input
                id="cvc"
                inputMode="numeric"
                required
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className={labelClass}>
              Name on card
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="cc-name"
              placeholder="Alex Morgan"
              className={fieldClass}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-6 h-12 w-full gap-2 rounded-full bg-accent text-sm text-accent-foreground [a]:hover:bg-accent"
        >
          <Check className="size-4" />
          Pay {formatPrice(total)}
        </Button>
      </form>
    </div>
  )
}
