<template>
  <footer class="bg-warm-white border-t border-soft-sage mt-20">
    <div class="max-w-5xl mx-auto px-5 py-12">
      <div class="text-center">

        <!-- Logo -->
        <div class="flex items-center justify-center gap-2 mb-4">
          <ion-icon name="leaf" class="text-olive-green" style="font-size:1.4rem;"></ion-icon>
          <span class="font-heading text-lg text-olive-green">CalmCraft</span>
        </div>

        <h3 class="font-heading text-fluid-lg text-text-primary mb-3">Take your time</h3>
        <p class="text-text-secondary mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          You're doing enough. There's no rush. This space will be here whenever you need it.
        </p>

        <!-- Nav links with icons -->
        <div class="flex justify-center items-center gap-6 text-sm text-text-secondary mb-8">
          <router-link to="/" class="flex items-center gap-1.5 hover:text-olive-green transition-colors">
            <ion-icon name="home-outline" style="font-size:1rem;"></ion-icon>
            Home
          </router-link>
          <span class="opacity-30">·</span>
          <router-link to="/calm-space" class="flex items-center gap-1.5 hover:text-olive-green transition-colors">
            <ion-icon name="heart-outline" style="font-size:1rem;"></ion-icon>
            My Calm Space
          </router-link>
          <span class="opacity-30">·</span>
          <router-link to="/about" class="flex items-center gap-1.5 hover:text-olive-green transition-colors">
            <ion-icon name="information-circle-outline" style="font-size:1rem;"></ion-icon>
            About
          </router-link>
        </div>

        <!-- Soft divider -->
        <div class="flex items-center justify-center gap-3 text-xs text-text-secondary opacity-50">
          <ion-icon name="sparkles-outline" style="font-size:0.85rem;"></ion-icon>
          <span>Healing Through Hobbies</span>
          <ion-icon name="sparkles-outline" style="font-size:0.85rem;"></ion-icon>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
