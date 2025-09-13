<template>
  <main class="text-white">
    <div class="py-20 px-5 md:px-20 bg-base-100" data-aos="fade-up">
      <h1 class="text-5xl font-extrabold !font-playfair my-6">About Me</h1>
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p class="text-lg leading-loose text-subtitle1 text-balance">
            I'm <strong>Ebube Ireneaus</strong>, a full-stack developer
            passionate about creating websites that do more than just look good.
            I help businesses build SEO-optimized, high-converting, and
            performance-driven digital platforms that attract real customers and
            grow online.
          </p>
        </div>
        <div>
          <!-- Hero Image -->
          <img
            src="/images/about/1_400.webp"
            alt="developer working on laptop at desk professional setup"
            class="rounded-xl shadow-lg w-full object-cover oject-center"
            width="400"
            height="400"
            
          />
        </div>
      </div>
    </div>

    <!-- MISSION -->
    <div class="py-16 px-5 md:px-20" data-aos="fade-up">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="/images/about/2_400.webp"
            alt="person walking toward target arrow graphic"
            class="rounded-xl shadow-lg w-full object-cover object-center h-[320px]"
            width="400"
            height="350"
            loading="lazy"
          />
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-4 !font-arial">My Mission</h2>
          <p class="text-subtitle1 leading-loose">
            My goal is simple:
            <strong>to help businesses succeed online</strong>. I believe your
            website should be more than just a digital brochure — it should be
            your best salesperson. I design, develop, and optimize websites that
            rank on Google, tell your brand story, and generate leads — even
            while you sleep.
          </p>
        </div>
      </div>
    </div>

    <!-- WHAT MAKES ME DIFFERENT -->
    <div class="py-16 px-5 md:px-20 bg-base-200" data-aos="fade-right">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-4 !font-arial">What Sets Me Apart?</h2>
          <ul class="list-disc list-inside text-subtitle1 space-y-3">
            <li>
              <strong>Business-first mindset:</strong> I research your industry,
              audience, and competitors before writing a single line of code.
            </li>
            <li>
              <strong>SEO from the ground up:</strong> Every page I build is
              optimized to rank, using smart keyword strategy and clean
              structure.
            </li>
            <li>
              <strong>No templates here:</strong> Every site is custom-built to
              match your unique business goals and brand voice.
            </li>
            <li>
              <strong>Focused on results:</strong> Whether it’s leads,
              conversions, or speed — I build with outcomes in mind.
            </li>
          </ul>
        </div>
        <div>
          <img
            src="/images/about/3_400.webp"
            alt="spotlight on winner concept"
            class="rounded-xl shadow-lg w-full h-[320px]"
            width="400"
            height="300"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- HOW I WORK -->
    <div class="py-16 px-5 md:px-20" data-aos="fade-left">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="/images/about/4_400.webp"
            alt="My Workflow"
            class="rounded-xl shadow-lg w-full h-[320px] object-cover object-center"
            width="400"
            height="320"
            loading="lazy"
          />
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-4 !font-arial">My Process</h2>
          <ol class="list-decimal list-inside text-subtitle1 space-y-3">
            <li>
              <strong>Discovery & Strategy:</strong> I get to know your business
              inside-out.
            </li>
            <li>
              <strong>Design & Development:</strong> Custom UI with real
              performance under the hood.
            </li>
            <li>
              <strong>SEO & Launch:</strong> Keyword-driven, search-ready,
              lightning-fast.
            </li>
            <li>
              <strong>Growth & Support:</strong> Ongoing tracking, updates, and
              content strategy.
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- CTA (as-is per your request) -->
    <div class="py-20 px-5 md:px-20 bg-base-100 text-center" data-aos="zoom-in">
      <h2 class="text-3xl font-bold mb-6 !font-arial">Let’s Build Something That Works</h2>
      <p class="text-subtitle1 max-w-2xl mx-auto mb-8">
        If you're ready for a website that brings real business results — not
        just traffic but conversions — let’s talk. Whether you're starting from
        scratch or need a redesign, I’ll guide you every step of the way.
      </p>
      <ui-action-button label="Book a Free Discovery Call" />
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: "canonical", href: "https://rankwithebube.com/about" }],
  htmlAttrs: {
    lang: 'en'
  },
});

useSeoMeta({
  title: "Web Design by Ebube Ireneaus | Full-Stack Developer - Abuja, Nigeria",
  description:
    "I’m a passionate full-stack developer helping businesses in Abuja, Lagos, Enugu, and Africa succeed online with high-performance, SEO-optimized websites.",
  ogTitle: "Web Design by Ebube Ireneaus | Full-Stack Developer - Abuja, Nigeria",
  ogDescription:
    "I’m a passionate full-stack developer helping businesses in Abuja, Lagos, Enugu, and Africa succeed online with high-performance, SEO-optimized websites.",
  ogType: "profile",
  ogUrl: "https://rankwithebube.com/about",
  ogImage: "https://rankwithebube.com/og-about-image.png",  
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_US",

  twitterCard: "summary",
  twitterTitle: "Web Design by Ebube Ireneaus | Full-Stack Developer - Abuja, Nigeria",
  twitterDescription:
    "I’m a passionate full-stack developer helping businesses in Abuja, Lagos, Enugu, and Africa succeed online with high-performance, SEO-optimized websites.",
  twitterImage: "https://rankwithebube.com/og-about-image.png",
  twitterCreator: "@EbubeIreneaus",
});

useSchemaOrg([
  defineWebPage({
    '@type': 'AboutPage',
    '@id': 'https://rankwithebube.com/about#webpage',
    name: 'Web Design by Ebube Ireneaus | Full-Stack Developer - Abuja, Nigeria',
    url: 'https://rankwithebube.com/about',
    description:
      'Get to know Ebube Ireneaus — a Full-Stack Developer helping businesses build SEO-optimized websites that rank, convert, and grow. Discover the passion, values, and skills behind Rank With Ebube.',
    isPartOf: { '@id': 'https://rankwithebube.com/#website' },
  }),

  definePerson({
    '@id': 'https://rankwithebube.com/#ebube',
    name: 'Ebube Ireneaus',
    url: 'https://rankwithebube.com/about',
    image: 'https://rankwithebube.com/images/ebube.webp', // ✅ Update to actual image URL
    jobTitle: 'Full-Stack Web Developer',
    worksFor: {
      '@id': 'https://rankwithebube.com/#organization',
    },
    sameAs: [
      'https://twitter.com/EbubeIreneaus',
      'https://linkedin.com/in/ebubeireneaus',
    ],
  }),

  defineOrganization({
    '@id': 'https://rankwithebube.com/#organization',
    name: 'Rank With Ebube',
    url: 'https://rankwithebube.com',
    logo: 'https://rankwithebube.com/logo.webp',
    founder: {
      '@id': 'https://rankwithebube.com/#ebube',
    },
  }),

  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Home',
        item: 'https://rankwithebube.com',
      },
      {
        name: 'About',
        item: 'https://rankwithebube.com/about',
      },
    ],
  }),
])

</script>

<style scoped></style>
