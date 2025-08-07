<script setup>
import { onBeforeUnmount, onMounted } from "vue";

defineOptions({
  name: "MainLayout",
});

function navControl() {
  const body = document.body;
  const offCanvasToggle = document.querySelectorAll(".offcanvas-toggle");
  const offCanvas = document.querySelector(".offcanvas");
  const offCanvasOverlay = document.querySelector(".offcanvas-overlay");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const offCanvasClose = document.querySelectorAll(
    ".offcanvas-clos, .offcanvas-overlay"
  );
  const offCanvasLinks = document.querySelectorAll(".offcanvas-menu a");

  offCanvasToggle.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#mobile-menu-offcanvas");
      body.classList.add("offcanvas-open");
      target.classList.add("offcanvas-open");
      offCanvasOverlay.style.display = "block";
      if (toggle.parentElement.classList.contains("mobile-menu-toggle")) {
        toggle.classList.add("close");
      }
    });
  });

  const closeOffCanvas = (e) => {
    e.preventDefault();
    body.classList.remove("offcanvas-open");
    offCanvas.classList.remove("offcanvas-open");
    offCanvasOverlay.style.display = "none";
    const closeBtn = mobileMenuToggle.querySelector("a");
    if (closeBtn) {
      closeBtn.classList.remove("close");
    }
  };

  offCanvasClose.forEach((close) => {
    close.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.remove("offcanvas-open");
      offCanvas.classList.remove("offcanvas-open");
      offCanvasOverlay.style.display = "none";
      const closeBtn = mobileMenuToggle.querySelector("a");
      if (closeBtn) {
        closeBtn.classList.remove("close");
      }
    });
  });

  offCanvasClose.forEach((close) => {
    close.addEventListener("click", closeOffCanvas);
  });

  offCanvasLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        event.preventDefault();
        document.querySelector(targetId).scrollIntoView();
      }
      closeOffCanvas(event);
    });
  });
}

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const stickyHeader = document.querySelector(".header");
  if (scrollTop < 100) {
    stickyHeader.classList.remove("sticky");
  } else {
    stickyHeader.classList.add("sticky");
  }
};

const handleMobileScroll = () => {
  const scrollTop = window.scrollY;
  const stickyHeader = document.querySelector(".m-header");
  if (scrollTop < 100) {
    stickyHeader.classList.remove("sticky");
  } else {
    stickyHeader.classList.add("sticky");
  }
};

onMounted(() => {
  navControl();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleMobileScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", handleMobileScroll);
});

useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-MQMBG3LX38",
      async: true,
      tagPosition: 'head'
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MQMBG3LX38');
      `,
      type: "text/javascript",
       id: 'gtag-init',
        tagPosition: 'head'
    }
  ]
});

</script>

<template>
  <div class="overflow-x-hidden">
    <header class="header hidden lg:block py-2 shadow">
      <div class="">
        <div class="container mx-auto">
          <div class="flex justify-between gap-x-5 items-center">
            <div class="">
              <img
                src="/logo_75.webp"
                alt="Logo"
                height="50"
                width="50"
                class="rounded-lg"
              />
            </div>
            <div class="flex-grow flex justify-end">
              <ul class="flex gap-x-6">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li><nuxt-link to="/about">About</nuxt-link></li>
                <li class="has-dropdown">
                  <nuxt-link to="/#service">Service</nuxt-link>
                </li>
                <li class="has-dropdown">
                  <nuxt-link to="/project">Projects</nuxt-link>
                </li>
                <li class="has-dropdown">
                  <nuxt-link to="/blog">Blog</nuxt-link>
                </li>
              </ul>
              <!-- End Header Menu -->
            </div>
            <div class="">
              <div class="text-end">
                <ui-action-button label="Let's Talk" class="!px-3 !py-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="m-header lg:hidden block shaddow">
      <div class="container px-5 py-2">
        <div class="flex justify-between items-center">
          <div class="">
            <div class="mobile-logo">
              <img
                src="/logo_75.webp"
                alt="Personal Brand Logo"
                height="50"
                width="50"
                class="rounded-lg"
              />
            </div>
          </div>
          <div class="">
            <div class="mobile-action-link text-end">
              <u-button class="offcanvas-toggle btn border-0 rounded-lg text-slate-100" aria-label="toggle sidebar" icon="fa6-solid:bars" />
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <div
      id="mobile-menu-offcanvas"
      class="offcanvas offcanvas-rightside offcanvas-mobile-menu-section"
    >
      <div class="offcanvas-header text-end">
        <u-button flat class="offcanvas-clos btn border-0 rounded-xl" icon="fa6-solid:xmark" aria-label="close sidebar" />
          
      </div>

      <div class="offcanvas-mobile-menu-wrapper">
        <div class="mobile-menu-bottom">
          <div class="offcanvas-menu">
            <ul>
              <li>
                <nuxt-link to="/"><span>Home</span></nuxt-link>
              </li>
              <li>
                <nuxt-link to="/about"><span>About</span></nuxt-link>
              </li>
              <li>
                <nuxt-link to="/#service"
                  ><span>Services</span></nuxt-link
                >
                <!-- <ul class="mobile-sub-menu">
                  <li><a href="service-list.html">Service List</a></li>
                  <li><a href="service-details.html">Service Details</a></li>
                </ul> -->
              </li>
              <li>
                <nuxt-link to="/project"><span>Projects</span></nuxt-link>
              </li>
              <li>
                <nuxt-link to="/blog"><span>Blog</span></nuxt-link>
              </li>

              <li>
                <nuxt-link to="/contact-me"><span>Contact</span></nuxt-link>
              </li>
            </ul>
          </div>
          <!-- End Mobile Menu Nav -->
        </div>
        <!-- End Mobile Menu -->

        <!-- Start Mobile contact Info -->
        <div class="mobile-contact-info  text-center">
          <ul class="social-link flex gap-x-3">
            <li class="btn border-0 rounded-full">
              <a
                target="_blank"
                href="https://facebook.com/rankwithebube"
                rel="nofollow"
                aria-label="visit my facebook page"
                ><Icon name="fa6-brands:facebook-f" /></a>
            </li>
            <li class="btn border-0 rounded-full">
              <a
                target="_blank"
                href="https://twitter.com/EbubeIreneaus"
                rel="nofollow"
                aria-label="visit my twitter profile"
                ><Icon name="fa6-brands:x-twitter" /></a>
            </li>
            <li class="btn border-0 rounded-full">
              <a
                target="_blank"
                href="https://linkedin.com/in/EbubeIreneaus"
                aria-label="visit my linkedin account"
                rel="nofollow"
                ><Icon name="mdi:linkedin" /></a>
            </li>
          </ul>
        </div>
        <!-- End Mobile contact Info -->
      </div>
      <!-- End Offcanvas Mobile Menu Wrapper -->
    </div>


    <!-- Offcanvas Overlay -->
    <div class="offcanvas-overlay"></div>

    <div class="bg-primary pb-10">
      <slot />
    </div>

    <footer class="py-4">
      <p class="text-center text-slate-300">
        &copy; {{ new Date().getFullYear() }} &nbsp;
        <router-link to="/">RankWithEbube</router-link>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.header,
.m-header {
  background-color: transparent;
  position: absolute;
  z-index: 10;
  width: 100%;
}
.header.sticky,
.m-header.sticky {
  position: fixed !important;
  z-index: 99;
  width: 100%;
  top: 0;
  background: #252734;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  animation: fadeInDown 0.9s cubic-bezier(0.2, 1, 0.22, 1) 0s;
  border-bottom: 0;
}

.email-pics {
  width: 300px;
  height: 80px;
  object-fit: cover;
  object-position: center;
  display: inline;
  transform: scale(1.6);
}
@media (max-width: 780px) {
  .email-pics {
    margin-left: -25px;
  }
}
@media (max-width: 480px) {
  .email-pics {
    transform: scale(1.4);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
</style>
