<template>
  <u-container as="section" id="pricing">
    <div class="mb-8 flex justify-center">
      <main-title title="Pricing" />
    </div>
    <u-pricing-table :tiers="tiers" :sections="section" />
  </u-container>
</template>

<script lang="ts" setup>
const tiers = ref([
  {
    id: "single",
    title: "Single Page",
    description: "Perfect for landing pages,",
    price: "₦100k",
    discount: "₦50k",
    badge: "popular",
    button: {
      label: "Select",
      color: "neutral",
      href: getWhatsappLink('Single Page Website'),
      target: '__blank'
    },
    billingCycle: "one-time",
    billingPeriod: "none",
    highlight: false,
  },
  {
    id: "five",
    title: "5 Pages Website",
    description: "businesses that need multiple pages.",
    price: "₦200k",
    discount: "₦120k",
    button: {
      label: "Select",
      color: "neutral",
      href: getWhatsappLink('5 Page Website'),
      target: '__blank'
    },
    billingCycle: "one-time",
    billingPeriod: "none",
    highlight: false,
    badge: "",
  },
  {
    id: "business",
    title: "Business Website",
    description: "Websites with advanced features.",
    price: "₦350k",
    discount: "₦250k",
    button: {
      label: "Select",
      color: "neutral",
      href: getWhatsappLink('Business Website'),
      target: '__blank'
    },
    badge: "",
    billingCycle: "one-time",
    billingPeriod: "none",
    highlight: false,
  },
  {
    id: "custom",
    title: "Custom Plan",
    description: "Tailored solution, Price depends on scope.",
    price: "Custom",
    discount: "",
    button: {
      label: "Select",
      color: "neutral",
      href: getWhatsappLink('Custom Tier'),
      target: '__blank'
    },
    billingCycle: "one-time",
    billingPeriod: "none",
    highlight: false,
    badge: "",
  },
]);

const section = ref([
  {
    title: "Features",
    features: [
      {
        title: "No of Pages",
        tiers: { single: "1", five: "5", business: "10", custom: "Custom" },
      },
      {
        title: "Responsive Design",
        tiers: {
          single: true,
          five: true,
          business: true,
          custom: true,
        },
      },
      {
        title: "Source Code",
        tiers: {
          single: true,
          five: true,
          business: true,
          custom: true,
        },
      },
      {
        title: "SEO Optimization (Basic)",
        tiers: {
          single: true,
          five: true,
          business: true,
          custom: true,
        },
      },
      {
        title: "High Performance",
        tiers: {
          single: true,
          five: true,
          business: true,
          custom: true,
        },
      },
      {
        title: "Contact Form Integration",
        tiers: {
          single: true,
          five: true,
          business: true,
          custom: true,
        },
      },
      {
        title: "E-commerce Functionality",
        tiers: {
          single: false,
          five: false,
          business: true,
          custom: true,
        },
      },
      {
        title: "Database Integration",
        tiers: {
          single: false,
          five: false,
          business: true,
          custom: true,
        },
      },
      {
        title: "Revision",
        tiers: { single: "1", five: "3", business: "4", custom: "5" },
      },
      {
        title: "Delivery Time",
        tiers: {
          single: "1 day",
          five: "3 days",
          business: "4 days",
          custom: "Depends",
        },
      },
    ],
  },
]);

const phone = "+2348061982520"; // no +, no spaces

function getWhatsappLink(plan: string) {
  const message = `
I need a website for my business,
Plan: ${plan},
- My Business name is: 
- I'M planing to launch on or before: 
`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
</script>

<style></style>
