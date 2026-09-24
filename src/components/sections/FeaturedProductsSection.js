"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings2 } from "lucide-react";
import Container from "@/components/Container";
import FeaturedProducts from "@/components/FeaturedProducts";

/*
  The original component was built on shadcn/ui (Card, Badge, Button, Switch).
  Those aren't in this project, so the cards below use plain elements styled
  with the site's colour tokens instead of adding the library.
*/
function Card({ children, className = "" }) {
  return (
    <div className={`h-full rounded-2xl border border-line bg-white ${className}`}>
      {children}
    </div>
  );
}

function IntegrationCard() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Card className="flex flex-col overflow-hidden">
      {/*
        The photo runs edge to edge across the top half of the card; the card's
        rounded corners and overflow-hidden clip it. On desktop the text keeps its
        natural height and the photo fills the rest, roughly half the card.
        Cut from the "Built to Standards" hero picture, the only inverter photo we have.
      */}
      <div className="relative aspect-35/27 w-full bg-surface md:aspect-auto md:flex-1">
        <Image
          src="/assets/featured-inverter.jpg"
          alt="ZING-SP54-10KW inverter"
          fill
          sizes="(min-width: 1200px) 360px, (min-width: 768px) 30vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col p-6">
        <h3 className="text-2xl font-semibold tracking-tight text-ink">
          Solar Inverters
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Smart, reliable solar inverters designed to turn clean solar energy
           into dependable power for modern homes and businesses. Built for efficient
            energy conversion, intelligent system control, and seamless everyday performance.
        </p>

      </div>
    </Card>
  );
}

function TrackersCard() {
  return (
    <Card className="flex flex-col justify-between p-6">
      <div>
        <h3 className="text-base font-medium text-ink">Distributers Connected</h3>
        <p className="text-sm text-muted">30 Active Integrations</p>
      </div>
      <div className="flex -space-x-2 overflow-hidden">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="https://cdn.21st.dev/assets/mirror/59/5926d7983d8b49d335297de31e17ff824d4ca1da7ccad81d69d05768cb9e8f36.jpg"
          alt="User 1"
        />
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="https://cdn.21st.dev/assets/mirror/54/5443ccf8560145188f5b2ff194679bba640203451821e29aeda4ebf1008bc099.jpg"
          alt="User 2"
        />
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="https://cdn.21st.dev/assets/mirror/7f/7ff1d828c4e5fdf44425010688bb32d0a843384f2e43b32a3196206a12963708.jpg"
          alt="User 3"
        />
      </div>
    </Card>
  );
}

function FocusCard() {
  return (
    <Card className="flex flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-ink">Focusing</h3>
          <p className="text-sm text-muted">Productivity Analytics</p>
        </div>
        <span className="rounded-full border border-orange-300 px-2.5 py-0.5 text-xs font-medium text-orange-600">
          Range Ratio
        </span>
      </div>
      <span className="text-6xl font-bold text-ink">42%</span>
      <div className="flex justify-between text-xs text-muted">
        <span>Maximum of focus</span>
        <span>Monthly Focus</span>
      </div>
    </Card>
  );
}

function StatisticCard() {
  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full items-center justify-center p-6">
        <span className="text-8xl font-bold text-ink/90">10X</span>
      </div>
    </Card>
  );
}

function ProductivityCard() {
  return (
    <Card className="flex flex-col justify-end p-6">
      <h3 className="text-base font-medium text-ink">Team&apos;s Productivity</h3>
      <p className="text-sm text-muted">
        Boost your team&apos;s efficiency with our next-gen productivity
        solutions.
      </p>
    </Card>
  );
}

function ShortcutsCard() {
  return (
    <Link
      href="/products"
      className="flex h-full items-center justify-center rounded-2xl border border-ink bg-ink p-6 text-white transition-colors hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <span className="text-5xl font-semibold tracking-tight md:text-6xl">
        See product
      </span>
    </Link>
  );
}

export default function FeaturedProductsSection() {
  return (
    <section id="featured-products" className="bg-surface py-20 md:py-28">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Featured Product
          </h2>
          
        </div>

        <FeaturedProducts
          integration={<IntegrationCard />}
          trackers={<TrackersCard />}
          statistic={<StatisticCard />}
          focus={<FocusCard />}
          productivity={<ProductivityCard />}
          shortcuts={<ShortcutsCard />}
        />
      </Container>
    </section>
  );
}
