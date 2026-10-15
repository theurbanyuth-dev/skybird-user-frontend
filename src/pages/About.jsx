import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  TrendingUp,
  Award,
  CheckCircle,
  BookOpen,
  Store,
  Megaphone,
  Headset,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { fetchSiteContent } from "../api/site";

const defaultStats = [
  { value: "5+ Years", label: "Dedicated E-Commerce Experience", icon: Award },
  { value: "50+", label: "Specialized Marketplace Courses", icon: BookOpen },
  {
    value: "₹15 Cr+",
    label: "Verified Seller Revenue Boosted",
    icon: TrendingUp,
  },
  { value: "10,000+", label: "Happy Sellers", icon: Users },
];

const defaultServices = [
  {
    icon: Store,
    title: "Account Setup",
    description:
      "Get guidance with marketplace account setup and the essential steps to start selling online.",
  },
  {
    icon: ShoppingBag,
    title: "Product Cataloguing",
    description:
      "Learn how to prepare and manage product listings for online marketplaces.",
  },
  {
    icon: Megaphone,
    title: "Ads Management",
    description:
      "Understand marketplace advertising and learn practical ways to manage your campaigns.",
  },
  {
    icon: BookOpen,
    title: "Practical Training",
    description:
      "Learn through detailed, step-by-step video courses built around real store management.",
  },
];

const defaultPromises = [
  {
    title: "100% Practical Learning",
    description:
      "Our courses focus on actionable steps drawn from real store management data, not just theory.",
    icon: CheckCircle,
  },
  {
    title: "Safe & Secure Video Learning",
    description: "Access course videos through our secure streaming facility.",
    icon: ShieldCheck,
  },
  {
    title: "Support When You Need It",
    description: "Our support team is available to help answer your queries.",
    icon: Headset,
  },
];

const defaultAbout = {
  hero: {
    badge: "About Sky Birds Solution",
    title: "Empowering Sellers.",
    highlight: "Growing Businesses.",
    description:
      "Sky Birds Solution is a growth-oriented E-Commerce agency in India, committed to empowering online sellers. From account setup and cataloguing to ads management and practical training, our in-house experts bring essential services together under one roof.",
    primaryCta: "Explore Our Courses",
    secondaryCta: "Talk to Our Team",
  },
  who: {
    badge: "Who We Are",
    title: "Built by Sellers, For Sellers",
    description:
      "Our website is built around the needs of online sellers. We aim to help local manufacturers, retail owners, and enthusiastic entrepreneurs across India understand marketplace selling and build sustainable businesses.",
  },
  vision: {
    badge: "Our Vision",
    title: "Sustainable Online Growth",
    description:
      "To empower local manufacturers, retail owners, and entrepreneurs across India to build sustainable and highly profitable businesses through online marketplaces.",
  },
  mission: {
    badge: "Our Mission",
    title: "Making E-Commerce Simpler",
    description:
      "To eliminate confusion and help sellers overcome the challenges and costs of online selling through high-quality, up-to-date training, hands-on onboarding, and reliable management.",
  },
  services: {
    badge: "What We Do",
    title: "Everything You Need to Grow Online",
    description:
      "Practical services and learning resources designed to help sellers navigate the online marketplace journey.",
  },
  platforms: {
    badge: "Marketplace Learning",
    title: "Learn. Launch. Grow.",
    description:
      "We provide detailed, step-by-step practical training and onboarding management for sellers on these marketplaces.",
    items: ["Amazon India", "Flipkart", "Meesho"],
  },
  impact: {
    badge: "Our Impact",
    title: "Growing Together,",
    highlight: "One Seller at a Time",
    description:
      "Our journey reflects our commitment to practical marketplace education, seller support, and business growth.",
    empoweredValue: "1,00,000+",
    empoweredLabel: "People Empowered",
  },
  cta: {
    title: "Ready to Grow Your Online Business?",
    description:
      "Explore practical marketplace courses and take the next step in your e-commerce journey with Sky Birds Solution.",
    primaryLabel: "Browse Courses",
    secondaryLabel: "Contact Us",
  },
};

export default function About() {
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSiteContent()
      .then((res) => {
        if (!cancelled && res.success) setSiteContent(res.data || {});
      })
      .catch(() => {})
      .finally(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const content = siteContent?.about || {};
  const about = {
    ...defaultAbout,
    ...content,
    hero: { ...defaultAbout.hero, ...(content.hero || {}) },
    who: { ...defaultAbout.who, ...(content.who || {}) },
    vision: { ...defaultAbout.vision, ...(content.vision || {}) },
    mission: { ...defaultAbout.mission, ...(content.mission || {}) },
    services: { ...defaultAbout.services, ...(content.services || {}) },
    platforms: { ...defaultAbout.platforms, ...(content.platforms || {}) },
    impact: { ...defaultAbout.impact, ...(content.impact || {}) },
    cta: { ...defaultAbout.cta, ...(content.cta || {}) },
  };

  const stats =
    Array.isArray(content.stats) && content.stats.length
      ? content.stats.map((item, index) => ({
          ...item,
          icon: defaultStats[index]?.icon || Award,
        }))
      : defaultStats;

  const services =
    Array.isArray(content.servicesList) && content.servicesList.length
      ? content.servicesList.map((item, index) => ({
          ...item,
          icon: defaultServices[index]?.icon || BookOpen,
        }))
      : defaultServices;

  const promises =
    Array.isArray(content.promises) && content.promises.length
      ? content.promises.map((item, index) => ({
          ...item,
          icon: defaultPromises[index]?.icon || CheckCircle,
        }))
      : defaultPromises;

  return (
    <main className="mx-auto max-w-7xl space-y-20 px-2 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* About Trainer */}
      <section aria-labelledby="about-trainer-heading">
        <div className="overflow-hidden rounded-[2rem] border border-forest/10 bg-gradient-to-br from-white via-mint/20 to-leaf/10 shadow-sm">
          <div className="grid items-center gap-8 p-2 sm:gap-10 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-12">
            <div className="order-2 min-w-0 lg:order-1">
              <span className="inline-flex items-center rounded-full border border-leaf/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-forest">
                Meet Your Trainer
              </span>
              <h2
                id="about-trainer-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
              >
                
                <span className="mt-1 block text-forest">Sambhav Sir</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                Learn e-commerce with clear guidance and a practical,
                step-by-step approach. Shambhav Sir helps learners understand
                the essentials of online marketplace selling—from product
                listing and catalogue management to marketplace operations and
                advertising fundamentals.
              </p>
              {/* <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                The focus is on making complex processes easier to understand,
                building confidence through practical learning, and helping you
                apply what you learn to real business tasks.
              </p> */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white/80 p-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-forest">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Practical Guidance
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Understand each step with simple, actionable explanations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white/80 p-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-forest">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Seller-Focused Learning
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Build skills for marketplace work and online business
                      growth.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <Link
                  to="/courses"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-forest sm:w-auto"
                >
                  Learn with Our Courses <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
              <div className="relative mx-auto max-w-[340px]">
                <div className="absolute -inset-3 rounded-[2rem] bg-leaf/15 blur-xl" />
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-xl">
                  <img
                    src="/assets/owner1.jpeg"
                    alt="Shambhav Sir, Sky Birds trainer"
                    className="aspect-[4/5] w-full rounded-[1.25rem] object-cover object-center"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const fallback = event.currentTarget.nextElementSibling;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden aspect-[4/5] w-full flex flex-col items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-forest to-leaf text-white">
                    <span className="grid h-28 w-28 place-items-center rounded-full border border-white/30 bg-white/10 text-4xl font-extrabold">
                      SS
                    </span>
                    <span className="mt-5 text-xl font-bold">Shambhav Sir</span>
                    <span className="mt-1 text-sm text-white/75">
                      E-Commerce Trainer
                    </span>
                  </div>
                  <div className="absolute inset-x-2 bottom-2 rounded-b-[1.2rem] bg-gradient-to-t from-gray-950/90 via-gray-950/45 to-transparent px-5 pb-5 pt-12 text-white">
                    <p className="text-lg font-bold">Shambhav Sir</p>
                    <p className="mt-1 text-xs font-medium text-white/80">
                      E-Commerce Trainer
                    </p>
                  </div>
                </div>
                <div className="absolute -right-2 top-5 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg sm:-right-5">
                  <p className="text-xs font-bold text-forest">
                    Learn • Apply • Grow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-gradient-to-br from-white via-mint/30 to-leaf/10 px-2 py-12 sm:px-10 sm:py-16 lg:px-14">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-leaf/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-mint/60 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest shadow-sm">
              <span className="h-2 w-2 rounded-full bg-leaf" />
              {about.hero.badge}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {about.hero.title}
              <span className="mt-1 block text-forest">
                {about.hero.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              {about.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-forest"
              >
                {about.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-forest transition hover:bg-white"
              >
                {about.hero.secondaryCta}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-forest/10 pt-6">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CheckCircle className="h-4 w-4 text-leaf" />
                Practical Learning
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CheckCircle className="h-4 w-4 text-leaf" />
                Expert Support
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-leaf/10 blur-xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-forest p-7 text-white shadow-2xl sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                    Our Approach
                  </span>
                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Real Experience.
                    <span className="block text-leaf">Practical Results.</span>
                  </h2>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
                  <TrendingUp className="h-6 w-6 text-leaf" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Every course and service is built around real store management
                experience, helping sellers understand the practical side of
                online business.
              </p>
              <div className="mt-7 space-y-3">
                {promises.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:bg-white/[0.12]"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf/15">
                        <Icon className="h-5 w-5 text-leaf" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-6 text-white/65">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">
              {about.who.badge}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {about.who.title}
            </h2>
          </div>
          <p className="self-center text-sm leading-relaxed text-gray-600">
            {about.who.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
              {about.vision.badge}
            </span>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              {about.vision.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              {about.vision.description}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
              {about.mission.badge}
            </span>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              {about.mission.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              {about.mission.description}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">
              {about.services.badge}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {about.services.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-600">
            {about.services.description}
          </p>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-mint text-forest">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-300">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-forest/10 bg-gray-50 px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">
            {about.platforms.badge}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {about.platforms.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            {about.platforms.description}
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {(about.platforms.items || []).map((platform) => (
            <div
              key={platform}
              className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm"
            >
              <CheckCircle className="h-5 w-5 text-leaf" />
              <span className="font-bold text-gray-800">{platform}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="overflow-hidden rounded-[2rem] bg-forest p-7 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-leaf">
                {about.impact.badge}
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {about.impact.title}
                <span className="block text-leaf">
                  {about.impact.highlight}
                </span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {about.impact.description}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-leaf/15">
                <Users className="h-5 w-5 text-leaf" />
              </div>
              <div>
                <p className="text-2xl font-extrabold">
                  {about.impact.empoweredValue}
                </p>
                <p className="mt-1 text-xs text-white/65">
                  {about.impact.empoweredLabel}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 transition hover:bg-white/[0.12] sm:p-6"
                >
                  <Icon className="h-5 w-5 text-leaf" />
                  <p className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/65">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="rounded-3xl border border-leaf/20 bg-mint/30 px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-forest shadow-sm">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {about.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            {about.cta.description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-forest"
            >
              {about.cta.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-semibold text-forest transition hover:bg-gray-50"
            >
              {about.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
