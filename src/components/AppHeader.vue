<template>
  <header class="sticky top-0 z-50 bg-warm-white bg-opacity-90 backdrop-blur-sm border-b border-soft-sage border-opacity-60">
    <nav class="max-w-5xl mx-auto px-5 py-4">
      <div class="flex justify-between items-center">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 font-heading text-xl font-semibold text-olive-green hover:opacity-80 transition-opacity">
          <ion-icon name="leaf" style="font-size:1.3rem;"></ion-icon>
          CalmCraft
        </router-link>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300"
            :class="$route.path === link.to
              ? 'bg-soft-sage text-olive-green font-medium'
              : 'text-text-secondary hover:text-olive-green hover:bg-soft-sage'"
          >
            <ion-icon :name="link.icon" style="font-size:1rem;"></ion-icon>
            {{ link.label }}
          </router-link>
        </div>

        <!-- Mobile hamburger -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 rounded-xl hover:bg-soft-sage transition-colors text-text-secondary"
          aria-label="Toggle menu"
        >
          <ion-icon :name="showMenu ? 'close' : 'menu'" style="font-size:1.4rem;"></ion-icon>
        </button>
      </div>

      <!-- Mobile menu -->
      <transition name="slide-down">
        <div v-if="showMenu" class="md:hidden mt-3 pb-2 space-y-1 border-t border-soft-sage pt-3">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="closeMenu"
            class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all duration-200"
            :class="$route.path === link.to
              ? 'bg-soft-sage text-olive-green font-medium'
              : 'text-text-secondary hover:text-olive-green hover:bg-soft-sage'"
          >
            <ion-icon :name="link.icon" style="font-size:1.1rem;"></ion-icon>
            {{ link.label }}
          </router-link>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const showMenu = ref(false)

    const navLinks = [
      { to: '/',           label: 'Home',          icon: 'home-outline' },
      { to: '/calm-space', label: 'My Calm Space',  icon: 'heart-outline' },
      { to: '/about',      label: 'About',          icon: 'information-circle-outline' }
    ]

    const toggleMenu = () => { showMenu.value = !showMenu.value }
    const closeMenu  = () => { showMenu.value = false }

    return { showMenu, navLinks, toggleMenu, closeMenu }
  }
}
</script>

<style scoped>
.slide-down-enter-active { transition: all 0.25s ease; }
.slide-down-leave-active { transition: all 0.18s ease; }
.slide-down-enter-from   { opacity: 0; transform: translateY(-8px); }
.slide-down-leave-to     { opacity: 0; transform: translateY(-8px); }
</style>
