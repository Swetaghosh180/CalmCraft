<template>
  <div class="min-h-screen" style="background: linear-gradient(160deg, #E8F1EC 0%, #FAFAF7 100%);">
    <AppHeader />
    <main class="pb-24">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

<style>
/* Soft page transition */
.page-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
